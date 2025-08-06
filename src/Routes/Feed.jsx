import { useEffect, useState } from "react";
import Card from "../Components/Card";
import getAllPosts from "../API/posts/getAllPosts";
import { Link } from "react-router-dom";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAllPosts()
      .then((data) => {
        setPosts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Filter & sort logic
  const filteredAndSortedPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortOrder === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortOrder === "upvotes") {
        return b.upvotes - a.upvotes;
      }
      return 0;
    });

  return (
    <main className="feed main-padding">
      {/* Search and Sort Controls */}
      <div className="feed-controls" style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      {/* Post Feed */}
      <div className="card-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map((post) => {
            const setUpvotes = (newUpvotes) => {
              setPosts((prevPosts) =>
                prevPosts.map((p) =>
                  p.id === post.id ? { ...p, upvotes: newUpvotes } : p
                )
              );
            };

            return (
              <Link to={`/post/${post.id}`} key={post.id}>
                <Card
                  id={post.id}
                  title={post.title}
                  time={post.created_at}
                  image_url={post.image_url}
                  upvotes={post.upvotes}
                  comment_count={post.comments ? post.comments.length : 0}
                  setUpvotes={setUpvotes}
                />
              </Link>
            );
          })
        ) : (
          <p>No posts match your search or sorting preference.</p>
        )}
      </div>
    </main>
  );
};

export default Feed;

