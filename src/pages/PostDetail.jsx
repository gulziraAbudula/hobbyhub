import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../client"
import "./PostDetail.css"

export const PostDetail = () => {

    const { id } = useParams()
    const [post, setPost] = useState()

    useEffect (() => {
        fetchPost()
    }, [])

    const fetchPost = async () => {
        const { data, error } = await supabase
                            .from("Posts")
                            .select("*")
                            .eq("id", id)
                            .single()
        if (error) {
            console.log(error)
            return
        }

        setPost(data)
    }

    if(!post) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className="post-detail">
                <h1>{post.title}</h1>
                <p>
                    Created:
                    {" "}
                    {post.created_at
                        ? new Date(post.created_at).toLocaleDateString()
                        : "No date"}
                </p>

                <p>
                    👍 {post.upvotes}
                </p>

                <p>{post.content}</p>

                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt={post.title}
                        width="500"
                    />
                )}
            </div>
        </>
    )
}