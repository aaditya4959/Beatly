
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";



export async function GET ( req: NextRequest){
    const session = await getServerSession();

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })


    if(!user){
        return NextResponse.json({
            message:"unauthenticated"
        },{
            status:403
        })
    }
    // if the user exists then we will try to fetch all the streams related to him

    const streams = await prisma.stream.findMany({
        where:{
            userId: user.id
        },
        include: {
            _count:{
                select:{
                    upvotes:true
                }
            },
            upvotes:{
                where:{
                    userId: user.id
                }
                
            }
        }
    })


    return NextResponse.json({
        streams : streams.map(({_count, ...rest}) =>({
            ...rest,
            upvotes: _count.upvotes
        }))
    })
}