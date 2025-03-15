import { NextRequest, NextResponse } from "next/server"
import {z} from "zod"
import prisma from "@/app/lib/db";
import { url } from "inspector";


const YT_REGEX = new RegExp("^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)$");




const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string().url().refine((url) => {
        return url.includes("youtube") || url.includes("spotify");
    },{
        message:"URL must be from Youtube or Spotify."
    })
})


export async function POST(req: NextRequest){

    // rate limiting should be added here so that the single user dont flood the streams.

    try{
        const data = CreateStreamSchema.parse(await req.json());

        const isYoutube = YT_REGEX.test(data.url);

        if(!isYoutube){
            NextResponse.json({
                message:"URL must be from Youtube or Spotify."
            },{
                status:401
            })
        }
        // other wise
        const extractedId = data.url.split("?v=")[1];
        
        // db call
        await prisma.stream.create({
            data:{
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube"  // Beacuse for now we only support youtube.
            }
        })
    }catch(err){
        NextResponse.json({
            message:`Error in creating stream ${err}`
        },{
            status:411
        })
    }
    


}


export async function GET(req: NextRequest){

    const creatorId = req.nextUrl.searchParams.get("creatorId");

    const streams = await prisma.stream.findMany({
        where:{
            userId: creatorId ?? ""
        }
    })


    return NextResponse.json({
        streams
    })
}