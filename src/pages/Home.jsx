import { useEffect, useState } from "react"
import { supabase } from "../client"
import { PostCard } from "../components/PostCard"

export const Home = () => {
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

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

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <div className="home">
                <h1>HobbyHub</h1>

                <input
                    type="text"
                    placeholder="Search posts by title..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                {filteredPosts.length == 0 ? (
                    <p>No posts found.</p>
                ) : (
                    filteredPosts.map((post) => (
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