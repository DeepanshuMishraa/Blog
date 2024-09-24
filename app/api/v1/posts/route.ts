import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const session  = await getServerSession();

    const user = await prisma.user.findUnique({
        where:{
            email:session?.user?.email!
        }
    })
    if(!session){
        return NextResponse.json({message:"Not authenticated"},{status:400});
    }

    try{
    const {title,content} = await req.json();
    if(!title || !content){
        return NextResponse.json({message:"Title and content cannot be empty "},{status:400});
    }

    const post = await prisma.blog.create({
        data:{
            title,
            content,
            author:user?.id ?? ""
        }
    })

    return NextResponse.json({message:"Blog added",blog:post},{status:200});
    }catch(e){
        console.log(e);
        return NextResponse.json({message:"Something went wrong"},{status:500});
    }
}


export async function GET(){
    try{
          const posts = await prisma.blog.findMany({
    })

    return NextResponse.json({posts},{status:200});
    }catch(e){
        console.log(e);
        return NextResponse.json({message:"Something went wrong"},{status:500
    })};
}


export async function DELETE(req:NextRequest){
    try{
        const {id}  = await req.json();
        const post = await prisma.blog.findMany({
            where:{
                id
            }
        })

        if(!post){
            return NextResponse.json({
                message:`Blog with id ${id} not found`
            })
        }

        await prisma.blog.delete({
            where:{
                id
            }
        })

        return NextResponse.json({
            message:"Blog deleted"
        },{status:200})
    }catch(e){
        console.log(e);
        return NextResponse.json({
            message:"Something went wrong"
        },{status:500})
    }
}

export async function PUT(req:NextRequest){
    try{
        const {id,title,content} = await req.json();
        const BlogExists = await prisma.blog.findMany({
            where:{
                id
            }
        })

        if(!BlogExists){
            return NextResponse.json({
                message:`Blog with id ${id} not found`
            },{status:404})
        }

        const updatedBlog = await prisma.blog.update({
            where:{
                id
            },
            data:{
                title,
                content
            }
        })

        return NextResponse.json({
            message:"Blog updated",
            blog:updatedBlog
        },{status:200})
    }catch(e){
        console.log(e);
        return NextResponse.json({
            message:"Something went wrong"
        },{status:500})
    }
}
