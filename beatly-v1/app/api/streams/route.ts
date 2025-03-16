import { NextRequest, NextResponse } from "next/server"
import {z} from "zod"
import prisma from "@/app/lib/db";
import { url } from "inspector";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import Stream from "stream";
//@ts-ignore
import youtubeURL from "youtube-url";







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

        const isYoutube = youtubeURL.valid(data.url);

        if(!isYoutube){
            return NextResponse.json({
                message:"URL must be from Youtube or Spotify."
            },{
                status:401
            })
        }
        // other wise
        const extractedId = youtubeURL.extractId(data.url);

        // getting the video details 
        const ytResponse = await youtubesearchapi.GetVideoDetails(extractedId);
        console.log(ytResponse.title);
        console.log(ytResponse.thumbnail.thumbnails);
        console.log(JSON.stringify(ytResponse.thumbnail.thumbnails));

        // Extracting the thumbnails
        const thumbnails = ytResponse.thumbnail.thumbnails;
        thumbnails.sort((a: {width:number},b: {width:number}) => a.width < b.width ? -1 : 1);  // this is sorted in place.

        
        // db call
        const stream = await prisma.stream.create({
            data:{
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",  // Beacuse for now we only support youtube.
                title: ytResponse.title ?? "No Title Found",
                smallImg: thumbnails.length > 1 ? thumbnails[thumbnails.length - 2 ].url : thumbnails[thumbnails.length - 1 ].url ?? "",
                bigImg: thumbnails[thumbnails.length - 1 ].url ?? "",

            }
        })
        return NextResponse.json({
            message:"Stream created successfully",
            id: stream.id
        },{
            status:201
        })
    }catch(err){
        return NextResponse.json({
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


