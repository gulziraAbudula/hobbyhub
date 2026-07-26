import { Link } from "react-router-dom"
import "./Navbar.css"

export const Navbar = () => {
    return (
        <>
            <nav>
                <h2>HobbyHub</h2>
                <Link to="/">Home</Link>
                <Link to="/create">Create Post</Link>
            </nav>
        </>
    )
}