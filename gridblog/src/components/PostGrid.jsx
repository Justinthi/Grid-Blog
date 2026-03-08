import PostCard from "./PostCard.jsx";

const PostGrid = function(props) {
    const cards = props.posts.map(post => <PostCard key={post.id} post={post} onLike={props.onLike} onDislike={props.onDislike} /> );
    return (
        <div className="grid" id="posts">
        {/* To-do: Render PostCard with key, post, onLike, and onDislike */}
        {cards}
        </div>
    );
};

export default PostGrid;