"use client";
import { IoPersonCircleSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonLoader from "./ButtonLoader";
import { GoCommentDiscussion } from "react-icons/go";




function timeAgo(date) {
  const now = new Date();
  const dateObj = new Date(date);
  const seconds = Math.floor((now - dateObj) / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  }
}





function PostCard({
  title,
  author,
  createdAt,
  likes,
  comments,
  userId,
  fetchData,
  id,
  total_comments,
  
}) {
  async function likeHandler() {
    const response = await fetch("http://127.0.0.1:8000/api/likePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post_id: id }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success("post liked successfully");
      return;
    }

    toast.error("error in liking post");
  }
  console.log(title, author, createdAt, likes, comments, userId);
  console.log(likes, userId);

  const checkIfLiked = () => likes.some((element) => element === userId);
  const [like, setLike] = useState(checkIfLiked);
  const [create_comment,setComment] = useState(false);
  const [commentData,setCommentData] = useState("");
  const [loading,setLoading] = useState(false);

  async function commentHandler() {

    if(commentData === "") {
        toast.error("fill the input box");
        return
    }

    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/api/commentPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({comment : commentData, post_id: id }),
      });
  
      const data = await response.json();
      setLoading(false)
      if (data.success) {
        toast.success("Commented successfully");
        setComment(false);
        setCommentData("")
        fetchData();
        return;
      }
  
      toast.error("error in commenting post");

     

  }






  return (
    <div className="border-2 p-5 rounded-md space-y-2">
      <div className="flex gap-3 justify-between">
        <div>
          <IoPersonCircleSharp size={40} />
          <p className="font-bold text-xl mt-2">{author}</p>
        </div>

        <p className="mt-5">{timeAgo(createdAt)}</p>
      </div>
      <div>
        <p>{title}</p>
      </div>

      <div className="flex justify-between mt-2">
        <p className="mt-1">{`${likes.length} likes`}</p>
        <p>{`${total_comments} comments`}</p>
      </div>

      <div className="flex mt-3 justify-between border-t-2 pt-3">
        {like ? (
          <div className="flex gap-1">
            <AiFillLike size={23} />
            <p>Liked</p>
          </div>
        ) : (
          <div
            onClick={() => {
              setLike(true);
              likeHandler();
              fetchData();
            }}
            className="flex gap-1 cursor-pointer "
          >
            <AiOutlineLike size={23} />
            <p>Like</p>
          </div>
        )}
        <div onClick={()=>setComment(!create_comment)} className="cursor-pointer">
            <div className="flex gap-2">
                <GoCommentDiscussion size={20}/>
                <p>Comment</p>

            </div>
        </div>


      </div>

      
      {
            comments && 
            <div className="pt-3 bg-slate-100 flex gap-2 p-3 border-2">
                <IoPersonCircleSharp  className="mt-1" size={35}/>
                <div className="flex flex-col">
                    <p className="font-bold">{comments?.author?.name}</p>
                    <p>{comments?.comment}</p>
                </div>
                {/* {JSON.stringify(comments)} */}

            </div>
        }

      
      {
            create_comment &&
            <div className="w-full bg-green pt-5 flex gap-2 justify-around">
                <input onChange={(e)=>setCommentData(e.target.value)} className="border-2 w-[70%] py-1 rounded-xl px-2" type="text"  placeholder="comment here"/>
                <button disabled={loading} onClick={()=>commentHandler()} className="bg-black text-white disabled:bg-gray-500 disabled:flex disabled:p-3  w-[20%] rounded-lg">comment {loading && <ButtonLoader/>}</button>

            </div>

        }
    </div>
  );
}

export default PostCard;
