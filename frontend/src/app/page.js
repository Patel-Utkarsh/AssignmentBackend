"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { AiOutlineLike } from "react-icons/ai";


export default function Home() {
  const [userId,setUserId] = useState(null);
  const [feedData,setFeedData] = useState([]);

  async function fetchData() {
    const response = await fetch('http://127.0.0.1:8000/api/fetchFeed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials : 'include'
  
    });

    const data = await response.json();
    setFeedData(data.posts)
    setUserId(data.user_id);

  }

  useEffect(()=>{
    fetchData();
  },[])
  

 


  return (
    <div className=" bg-white text-black w-full mx-auto">
      <div className="w-[50%] mx-auto flex flex-col gap-5 pt-10 pb-10">
        {
          feedData?.length > 0 ?
          feedData.map((element,ind)=>(
            <div key={ind}>
            <PostCard 
            title = {element.title}
            author = {element.author.name}
            likes = {element.likes}
            total_comments= {element.totalComments}
            createdAt = {element.createdAt}
            comments = {element?.comments?.[0]}
            userId = {userId}
            id = {element._id}
            fetchData = {fetchData}
            
            />

              </div>
          ))

          : 
          <div>No Feed Data</div>
        }


      </div>

    </div>
  );
}
