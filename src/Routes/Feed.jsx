import { useEffect, useState } from "react";
import Card from "../Components/Card";
import getAllPosts from "../API/posts/getAllPosts";
const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Grab posts from database
  useEffect(() => {
    setIsLoading(true);
    getAllPosts()
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            time={post.created_at}
            image_url={post.image_url}
            upvotes={post.upvotes}
            comment_count={post.comments ? post.comments.length : 0}
          />
        ))
      ) : (
        <p>Looks like their are no posts! You could be the first!</p>
      )}
    </main>
  );
};

export default Feed;
