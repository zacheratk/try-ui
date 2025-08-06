import { useState } from "react";
import addCommentById from "../API/posts/addCommentById";

const AddComment = ({ id, comments }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    addCommentById(newComment, comments, id).finally(() => {
      setIsSubmitting(false);
      setNewComment("");
      location.reload();
    });
  };
  return (
    <div className="new-comment">
      <input
        type="text"
        name="new-comment"
        value={newComment}
        placeholder="Say Something..."
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={newComment.length === 0 && !isSubmitting}
      >
        Post Comment
      </button>
    </div>
  );
};

export default AddComment;
