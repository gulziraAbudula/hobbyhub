import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../client"
import "./EditPost.css"

export const EditPost = () => {
    
    const { id } = useParams()
    const navigate = useNavigate()

    const [post, setPost] = useState({
        title: "",
        content: "",
        image_url: ""
    })

    const [loading, setLoading] = useState(true)

    useEffect (() => {
        fetchPost()
    }, [id])

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

        setPost({
            title: data.title,
            content: data.content,
            image_url: data.image_url
        })

        setLoading(false)
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    const updatePost = async () => {
        const { error } = await supabase
                    .from("Posts")
                    .update({
                        title: post.title,
                        content: post.content,
                        image_url: post.image_url
                    })
                    .eq("id", id)

        if (error) {
            console.log(error)
            return
        }

        navigate(`/post/${id}`)
    }

    return (
        <>
            <div className="edit-post">
                <h1>Edit Post</h1>
                <form onSubmit={(e) => { e.preventDefault(); updatePost() }}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={post.title}
                        onChange={(e) =>
                            setPost({
                                ...post,
                                title: e.target.value
                            })
                        }
                    />

                    <label>Content</label>
                    <textarea
                        value={post.content}
                        onChange={(e) =>
                            setPost({
                                ...post,
                                content: e.target.value
                            })
                        }
                    />

                    <label>Image URL</label>
                    <input
                        type="text"
                        value={post.image_url}
                        onChange={(e) =>
                            setPost({
                                ...post,
                                image_url: e.target.value
                            })
                        }
                    />

                    <button type="submit">
                        Update Post
                    </button>
                </form>
            </div>
        </>
    )
}