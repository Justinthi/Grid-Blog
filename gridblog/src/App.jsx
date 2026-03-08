import React from "react";
import Header from "./components/Header.jsx";
import NewPostForm from "./components/NewPostForm.jsx";
import PostGrid from "./components/PostGrid.jsx";

function makeId() {
  // Generates unique IDs for posts.
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "p_" + Math.random().toString(16).slice(2);
}

function todayString() {
  return new Date().toLocaleDateString();
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initial posts so the page starts with content.
      // To do: Added three initial post
      posts: [
        {
          id: makeId(),
          title: "The Best Coffee Shops in the City",
          author: "Marco Rivera",
          content:
            "After visiting over a dozen coffee shops downtown, I have finally ranked my top three. The winner has to be Brewed Awakening on 5th Ave — their oat milk latte is unmatched. Second place goes to The Grind, which has the best atmosphere for studying or working remotely.",
          createdAt: todayString(),
          imageDataUrl: "",
          likes: 12,
          dislikes: 1,
        },
        {
          id: makeId(),
          title: "I Tried Cooking Every Meal for a Week",
          author: "Jane",
          content:
            "No takeout, no restaurants, no exceptions. I challenged myself to cook every single meal for seven days straight. By day three I was already tired of washing dishes. By day five I had accidentally invented a pasta sauce I will probably never be able to recreate. Would I do it again? Absolutely not.",
          createdAt: todayString(),
          imageDataUrl: "",
          likes: 5,
          dislikes: 1,
        },
        {
          id: makeId(),
          title: "Why I Stopped Watching the News",
          author: "John Smith",
          content:
            "About six months ago I decided to take a break from the daily news cycle and honestly it has been one of the better decisions I have made. I replaced my morning scroll with a short walk and a podcast instead. I feel less anxious, sleep better, and still manage to stay informed through weekly summaries.",
          createdAt: todayString(),
          imageDataUrl: "",
          likes: 3,
          dislikes: 0,
        },
      ],
      form: {
        title: "",
        author: "",
        content: "",
        imageDataUrl: "",
      },
      error: "",
    };
  }

  // Controlled inputs: when user types, update this.state.form
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      form: { ...prev.form, [name]: value },
      error: "",
    }));
  };

  // Read an uploaded image and store it as a Data URL so we can preview it.
  handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      this.setState((prev) => ({
        form: { ...prev.form, imageDataUrl: "" },
        error: "",
      }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      this.setState({ error: "Please select a valid image file (PNG/JPG/GIF/etc.)." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState((prev) => ({
        form: { ...prev.form, imageDataUrl: String(reader.result || "") },
        error: "",
      }));
    };
    reader.onerror = () => {
      this.setState({ error: "Could not read the image file. Try another image." });
    };
    reader.readAsDataURL(file);
  };

  validateForm = () => {
    const { title, author, content } = this.state.form;
    if (!title.trim()) return "Title is required.";
    if (!author.trim()) return "Author is required.";
    if (!content.trim()) return "Content is required.";
    if (content.trim().length < 30) return "Content must be at least 30 characters.";
    return "";
  };

  addPost = (e) => {
    e.preventDefault();
    const msg = this.validateForm();
    if (msg) {
      this.setState({ error: msg });
      return;
    }
    const { title, author, content, imageDataUrl } = this.state.form;
    const newPost = {
      id: makeId(),
      title: title.trim(),
      author: author.trim(),
      content: content.trim(),
      createdAt: todayString(),
      imageDataUrl: imageDataUrl || "",
      likes: 0,
      dislikes: 0,
    };
    // Add to top of list (newest first)
    this.setState((prev) => ({
      posts: [newPost, ...prev.posts],
      form: { title: "", author: "", content: "", imageDataUrl: "" },
      error: "",
    }));
    // Clear file input field (simple DOM approach for this lab)
    const input = document.getElementById("imageInput");
    if (input) input.value = "";
  };

  likePost = (id) => {
    // Increase likes for ONE matching post (immutable update)
    this.setState((prev) => ({
      posts: prev.posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
    }));
  };

  dislikePost = (id) => {
    // To-do: Increase dislikes by 1 similar to the likePost code
    this.setState((prev) => ({
      posts: prev.posts.map((p) =>
        p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
      ),
    }));
  };

  render() {
    const { posts, form, error } = this.state;
    // Totals for the header
    const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
    const totalDislikes = posts.reduce((sum, p) => sum + p.dislikes, 0);

    return (
      <div className="page">
        {/* To do: Render Header with totalPost, totalLikes, and totalDislikes */}
        <Header
          totalPosts={posts.length}
          totalLikes={totalLikes}
          totalDislikes={totalDislikes}
        />
        

        <div className="layout">
          <aside className="panel" id="about">
            <h2 className="panelTitle">About</h2>
            <p className="muted">
              GridBlog is a front-end React demo using <strong>class-based state</strong>,
              <strong> props</strong>, and <strong>CSS Grid</strong>.
            </p>
            <ul className="muted">
              <li>Add posts instantly (stored in memory)</li>
              <li>Upload an image (preview stored as Data URL)</li>
              <li>Like/Dislike updates a single post only</li>
            </ul>
            <div className="divider" />
            <h2 className="panelTitle">Add a Post</h2>
            <NewPostForm
              form={form}
              error={error}
              onChange={this.handleChange}
              onImageChange={this.handleImageChange}
              onSubmit={this.addPost}
            />
          </aside>
          <main className="panel" id="home">
            <h2 className="panelTitle">Latest Posts</h2>
            {/* To-do: Render PostGrid with post, onLike, and onDislike*/}
            <PostGrid
              posts={posts}
              onLike={this.likePost}
              onDislike={this.dislikePost}
            />
          </main>
        </div>
      </div>
    );
  }
}