import supabase from "../API/client.js";
import LikeIcon from "../assets/likeIcon.svg?react";
const LikeButton = ({ upvotes, setUpvotes, id }) => {
  const handleClick = async () => {
    const updatedUpvotes = upvotes + 1;
    await supabase
      .from("posts")
      .update({ upvotes: updatedUpvotes })
      .eq("id", id);
    setUpvotes(upvotes + 1);
  };
  return (
    <div className="like-info" onClick={handleClick}>
      <div className="like-icon">
        <LikeIcon />
      </div>
      <p>{upvotes}</p>
    </div>
  );
};

export default LikeButton;
