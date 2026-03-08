function excerpt(text, max = 140) {
    // Shorten long content so cards stay compact
    if (!text) return "";
    if (text.length <= max) return text;
    return text.slice(0, max).trimEnd() + "…";
}

const PostCard = function(props) {
    const id = props.post.id;
    const title = props.post.title;
    const author = props.post.author;
    const createdAt = props.post.createdAt;
    const content = props.post.content;
    const imageDataUrl = props.post.imageDataUrl;
    const likes = props.post.likes;
    const dislikes = props.post.dislikes;

    return (
        <article className="card">
        {imageDataUrl ? <img src={imageDataUrl} alt={title} /> : null}
        <div>
            <h3 className="cardTitle">{title}</h3>
            <div className="meta">
                <span>By {author}</span>
                <span>•</span>
                <span>{createdAt}</span>
            </div>
        </div>
        <p className="cardBody">{excerpt(content)}</p>
        <div className="actions">
            {/* To-do: added a like/dislike action buttons */}
            <button type="button" onClick={() => props.onLike(id)}>
                Like <span className="count">{likes}</span>
            </button>

            <button type="button" onClick={() => props.onDislike(id)}>
                Dislike <span className="count">{dislikes}</span>
            </button>
        </div>
        </article>
    );
};

export default PostCard;