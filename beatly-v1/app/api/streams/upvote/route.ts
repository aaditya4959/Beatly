import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"


const UpvoteSchema = z.object({
    streamId : z.string()
})


export async function POST(req: NextRequest){

    const session = await getServerSession();
    // TODO: We can get rid of the db call here.

    const user = await prisma.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    })

    if(!user){
        return NextResponse.json({
            message:"Unauthenticated"
        },{
            status: 403
        })
    }

    try{
        const data = UpvoteSchema.parse(req.json());
        await prisma.upvote.create({
            data: {
                userId: user.id,
                streamId: data.streamId
            }
        })
    }catch(err){
        return NextResponse.json({
            message:"Error while downvoting"
        },{
            status: 403
        })
    }

    const data = UpvoteSchema.parse(req.json())
}