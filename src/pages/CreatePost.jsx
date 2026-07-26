import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../client"
import "./CreatePost.css"

export const CreatePost = () => {
    const navigate = useNavigate()

    const [post, setPost] = useState({
        title: "",
        content: "",
        image: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setPost((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const createPost = async (event) => {
        event.preventDefault();

        if (post.title.trim() === "") {
            alert("Title is required")
            return 
        }

        const { error } = await supabase 
            .from("Posts")
            .insert({
                title: post.title,
                content: post.content,
                image_url: post.image,
                upvotes: 0
            })
        
        if (error) {
            console.error(error)
            alert("Failed to create post.")
            return
        }

        navigate("/")
    }

    return (
        <>
            <div className="create-post">
                <h1>Create a New Post</h1>
                <form onSubmit= {createPost}>
                    <label>Title</label>
                    <input 
                        type="text"
                        name="title"
                        value={post.title}
                        onChange = {handleChange}
                        placeholder="Enter a title"
                        required
                    />

                    <label>Content</label>
                    <textarea 
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        placeholder="Share something..."
                        rows="6"
                    />

                    <label>Image URL</label>
                    <input 
                        type="text"
                        name="image"
                        value={post.image}
                        onChange={handleChange}
                        placeholder="https://..."
                    />

                    <button type="submit">
                        Create Post
                    </button>
                </form>
            </div>
        </>
    )
}