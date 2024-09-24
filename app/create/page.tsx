'use client'

import Appbar from "@/components/Appbar";
import axios from "axios";
import { useState } from "react";

const CreateBlog =  ()=>{

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");


    const handleSubmit = async()=>{
        const res = await axios.post("/api/v1/posts",{title,content});
        console.log(res.data);
    }

    return (
        <div>
            <Appbar/>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <textarea placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            <button onClick={handleSubmit}>Create</button>
        </div>
    )
}


export default CreateBlog;
