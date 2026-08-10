"use client"

import { useState, useEffect } from "react";

export default function CommunityWall() {

const [content, setContent] = useState("")
    const [posts, setPosts] = useState([]);

    const API_BASE =
    "mindease-api-production-65ca.up.railway.app";

    const fetchPosts = async () => {
         try{
        const res = await fetch(
            `${API_BASE}/community/get.php`
        );

        const data = await res.json();

        console.log("POSTS:", data);

        setPosts(data);
    } catch (error) {
        console.error("FETCH ERROR:", error);
    }
    };

    useEffect(() => {
        fetchPosts();
    }, []);


const savePost = async () => { 
    
    const user = 
    JSON.parse(localStorage.getItem("user"));
    
    if (!user) { 
        alert("Not logged in");
         return;
         } 
         if (!content.trim()) 
            return; 
        try {
            
     const res = await
      fetch( `${API_BASE}/community/create.php`,
        { method: "POST",
          headers: { "Content-Type":
         "application/json", },
          body: JSON.stringify({
         user_id: user.id, 
         content: content,
         }),
         } 
        );
      const data = await res.json();
       console.log("POST RESPONSE:", data); 
       if (data.status === "success") {
       setContent("");
        fetchPosts(); 
         // refresh UI
      } else
        { alert(data.status);
         } 
       } catch (error) {
                                         console.error("POST ERROR:", error);
                                         } 
                                        };

                const handleLike = async (postId) => {
                     const user = JSON.parse(localStorage.getItem("user"));
                      if (!user) return;

                       try { 
                        const res = await fetch( `${API_BASE}/community/like.php`,
                             { 
                                method: "POST", 
                                headers: { "Content-Type": "application/json", 

                                },
                                 body: JSON.stringify({ post_id: postId, user_id: user.id,

                                  }), 
                                }
                             ); 
                             const data = await res.json();
                              console.log(data);
                               fetchPosts(); 
                            } catch (error) { 
                                console.error(error); 
                            } 
                        };

            const handleDelete = async (postId) => {
                 const user = JSON.parse(localStorage.getItem("user"));
                  if (!user) return;
                   const confirmDelete = 
                   confirm("Delete this post?"); 
                   if (!confirmDelete) return;
                    try { 
                        const res = await 
                        fetch( `${API_BASE}/community/delete.php`,
                             { method: "POST", 
                        headers: { "Content-Type": 
                            "application/json", }, 
                            body: JSON.stringify({ 
                                post_id: postId,
                                 user_id: user.id, 
                            }),
                         } 
                        );
                         const data = await res.json();
                          console.log(data);
                           fetchPosts(); 
                        } catch (error) {
                             console.error(error);
                             } 
                            };



    return (
        <div className="w-full max-w-2xl mx-auto text-gray-500">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-400">
           
                Community Group
            </h1>
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mb-6">

                <textarea value={content} onChange={(e) => setContent(e.target.value)
                } placeholder="share an encouraging message..."
                className="w-full h-32 sm:h-40 p-3 border rounded-lg resize-none mb-4 placeholder:text-gray-400"/>

                <button onClick={savePost}
                disabled={!content.trim()}
                className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50">
                    post message
                </button>
            </div>

            <div className="space-y-4">
                {posts.length === 0 && (
                    <p className="text-center text-gray-400">
                        No posts yet
                    </p>
                )}
                {posts.map((post) => (
                     <div 
                        key={post.id} 
                        className=" 
                        bg-white shadow rounded-2xl p-4 border border-gray-100 " >

                             <div className="flex items-center gap-3 mb-3">
                                 {/* Avatar */}
                                  <div 
                                  className=" w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold uppercase " >
                                     {post.name?.charAt(0)}
                                      </div>
                                       {/* User Info */}
                                        <div> 
                                            <h3 className="font-semibold text-gray-800">
                                                 {post.name} 
                                                 </h3> 
                                                 <p className="text-xs text-gray-400"> 
                                                    {post.created_at} 
                                                    </p>
                                                     </div> 
                                                     </div>
                                                      {/* Post Content */} 
                                                <p className="text-gray-700 break-words leading-relaxed"> 
                                                        {post.content}
                                                         </p> 
                                                       <div className="mt-4 flex items-center gap-4"> 
                                                        {/* Like */} 
                                                        <button onClick={() => 
                                                            handleLike(post.id)} 
                                                            className=" text-sm text-pink-600 hover:scale-105 transition " > 
                                                            ❤️ {post.like_count}
                                                             </button>
                                                              {/* Delete */}
                                                               { Number(
                                                                JSON.parse(localStorage.getItem("user"))?.id )=== Number(post.user_id) && (
                                                                 <button onClick={() =>
                                                                  handleDelete(post.id)} 
                                                                  className=" text-sm text-red-500 hover:text-red-700 transition " 
                                                                  >🗑 delete
                                                                  </button> 
                                                                )}
                                                                </div>
                                                         </div>
                                                         
                    
                ))}
            </div>
        </div>


    )
}