import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPostById from "../API/posts/getPostById";
import AddComment from "../Components/AddComment";
import LikeButton from "../Components/LikeButton";
import MeatballMenu from "../Components/MeatballMenu";

const PostView = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({
    title: "",
    body: "",
    image_url: null,
    upvotes: 0,
    comments: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPostById(id)
      .then((data) => {
        console.log(data);
        setPostInfo({
          title: data.title,
          body: data.body,
          image_url: data.image_url,
          upvotes: data.upvotes,
          comments: data.comments,
        });
        console.log(postInfo);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="post main-padding">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="info-row">
            <h3>{postInfo.title}</h3>
            <MeatballMenu postId={id} />
          </div>
          {postInfo.image_url ? (
            <img src={postInfo.image_url} alt={postInfo.title} />
          ) : (
            <></>
          )}
          <p>{postInfo.body}</p>
          <div className="info-row">
            <LikeButton
              upvotes={postInfo.upvotes}
              setUpvotes={(val) => setPostInfo({ ...postInfo, upvotes: val })}
              id={id}
            />
            <p>
              {postInfo.comments?.length} comment
              {postInfo.comments?.length === 1 ? "" : "s"}
            </p>
          </div>
        <div className="line" />
          <AddComment  id={id} comments={postInfo.comments} />
        <div className="line" />
          <div className="comment-section">
            {postInfo.comments &&
              postInfo.comments.map((comment, index) => (
                <div key={index}>
                  <p>{comment}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostView;
