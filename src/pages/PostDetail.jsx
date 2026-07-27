import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../client"
import "./PostDetail.css"

export const PostDetail = () => {

    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const navigate = useNavigate()

    useEffect (() => {
        fetchPost()
        fetchComments()
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

    const fetchComments = async () => {
        const { data, error } = await supabase
                            .from("Comments")
                            .select("*")
                            .eq("post_id", Number(id))
                            .order("created_at", { ascending: true })
        console.log("Comments", data)
        console.log("Error", error)
        
        if (error) {
            console.log(error)
            return
        }

        setComments(data)
    }

    const addComment = async (event) => {
        event.preventDefault()

        if (newComment.trim() === "") return

        const { error } = await supabase
                        .from("Comments")
                        .insert({
                            post_id: id,
                            body: newComment
                        })
        if (error) {
            console.log(error)
            return
        }

        setNewComment("")
        await fetchComments()
    }

    if(!post) {
        return <h2>Loading...</h2>
    }

    const handleUpvote = async () => {
        const { error } = await supabase
                        .from("Posts")
                        .update({
                            upvotes: post.upvotes + 1
                        })
                        .eq("id", post.id)
        if (error) {
            console.log(error)
            return
        }

        setPost({
            ...post,
            upvotes: post.upvotes + 1
        })
    }

    return (
        <>
            <div className="post-detail">
                <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
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
                
                <button onClick={handleUpvote}>
                    👍 Upvote
                </button>

                <p>{post.content}</p>

                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt={post.title}
                        width="500"
                        onError={(e) => { e.target.style.display = "none" }}
                    />
                )}

                <h2>Comments</h2>
                <form onSubmit={addComment}>
                    <textarea
                        rows="4"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />

                    <br />

                    <button type="submit">
                        Add Comment
                    </button>
                </form>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="comment"
                        >
                            <p>{comment.body}</p>
                            <small>
                                {comment.created_at
                                    ? new Date(comment.created_at).toLocaleString()
                                : ""}
                            </small>
                        </div>
                    ))
                )
            }
            </div>
        </>
    )
}