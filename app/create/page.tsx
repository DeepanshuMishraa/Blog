'use client'

import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";

const CreateBlog =  ()=>{

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");


    const handleSubmit = async()=>{
        try{
             await axios.post("/api/v1/posts",{title,content});
             toast({
                title:"Blog Added succesfully",
                description:"Your blog has been added successfully",
                variant:"default"
             });
        }catch(e){
            console.log(e);
            toast({
                title:"Error",
                description:"Something went wrong",
                variant:"destructive"
            });
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
                    <CardDescription>You can create you blogs from here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" />
                    <Textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Content" />
                        <Input type="text" placeholder="Image goes here"/>
                    <Button onClick={handleSubmit}>Post</Button>
                </CardContent>
            </Card>
        </div>
    )
}


export default CreateBlog;
