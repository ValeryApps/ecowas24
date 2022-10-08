import { Link } from "react-router-dom";
export const PostCard = ({ story }) => {
  return (
    <div className="story">
      <img src={story.images[0].url} alt="" />
      <Link to={`/post/${story.slug}`}>
        <h5>{story.title}</h5>
      </Link>
      <div className="meta">country: {story.country}</div>
    </div>
  );
};
