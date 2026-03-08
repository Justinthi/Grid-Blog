const Header = function(props) {
    // To-do: Create the Header component
    return (
        <header className="header">
        <div>
            <h1>Grid Blog</h1>
            <p>An all in one blog for developers using React.</p>
        </div>
        <div className="headerStats">
            <span>Posts: <strong>{props.totalPosts}</strong></span>
            <span>Likes: <strong>{props.totalLikes}</strong></span>
            <span>Dislikes: <strong>{props.totalDislikes}</strong></span>
        </div>
        </header>
    );
};

export default Header;