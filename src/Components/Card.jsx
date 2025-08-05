import LikeIcon from "../assets/likeIcon.svg?react";
const Card = ({ title, time, image_url, upvotes, comment_count }) => {
  // Create a formatted date to display
  const dateObject = new Date(time);
  const formattedDate = dateObject.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="card">
      <div className="info-row">
        <h3>{title}</h3>
        <p>{formattedDate}</p>
      </div>
      {image_url ? (
        <img src={image_url} alt={title} />
      ) : (
        <div className="img-placeholder" />
      )}
      <div className="info-row">
        <div>
          <div className="like-icon">
            <LikeIcon />
          </div>
          <p>{upvotes}</p>
        </div>

        <p>
          {comment_count} comment{comment_count === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
};

export default Card;
