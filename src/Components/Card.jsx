import LikeButton from "./LikeButton";
const Card = ({
  title,
  time,
  image_url,
  upvotes,
  comment_count,
  setUpvotes,
  id,
}) => {
  // Create a formatted date to display
  const dateObject = new Date(time);
  const formattedDate = dateObject.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="card hide-link">
      <div className="info-row">
        <h3>{title.length > 20 ? title.slice(0, 17) + "..." : title}</h3>
        <p className="secondary">{formattedDate}</p>
      </div>
    <div className="card-image-wrapper">
      {image_url ? (
        <img src={image_url} alt={title} />
      ) : (
        <div className="img-placeholder" />
      )}
    </div>
      <div className="info-row">
        <LikeButton upvotes={upvotes} setUpvotes={setUpvotes} id={id} />

        <p className="secondary">
          {comment_count} comment{comment_count === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
};

export default Card;
