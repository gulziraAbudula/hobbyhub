import { useEffect, useState } from "react"
import { supabase } from "../client"
import { PostCard } from "../components/PostCard"

export const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const { data, error } = await supabase
                            .from("Posts")
                            .select("*")
                            .order("created_at", { ascending: false })
        
        if (error) {
            console.log(error)
            return
        }
        setPosts(data)
    }

    return (
        <>
            <div className="home">
                <h1>HobbyHub</h1>
                {posts.length == 0 ? (
                    <p>No posts yet.</p>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))
                )}
            </div>
        </>
    )
}