import { Link } from "react-router-dom"
import "./PostCard.css"

export const PostCard = ({post}) => {
    return (
        <>
            <div className="post-card">
                <Link to={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                </Link>

                <p>
                    Created:{" "}
                    {post.created_at
                        ? new Date(post.created_at).toLocaleDateString()
                        : "No date available"}
                </p>

                <p>
                    👍 {post.upvotes}
                </p>
            </div>
        </>
    )
}