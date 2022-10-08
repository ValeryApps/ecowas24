import { Link } from "react-router-dom";

export const MainPostCard = ({ posts, index }) => {
  let mx_title = "";
  if (posts[index]?.title?.length > 60) {
    mx_title = `${posts[index]?.title?.substring(0, 40)}...`;
  } else {
    mx_title = posts[index]?.title;
  }
  return (
    <div className="main_post">
      <div className="main_div_img">
        <img src={posts[index]?.images[0]?.url} alt="" className="img-fluid" />
      </div>
      <Link to={`/post/${posts[index]?.slug}`}>
        <h5 title={posts[index]?.title}>{mx_title}</h5>
      </Link>
    </div>
  );
};
