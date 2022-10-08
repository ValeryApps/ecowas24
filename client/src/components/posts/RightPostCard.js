import { Link } from "react-router-dom";
import { createMarkup } from "../../helpers/parseHTML";

export const RightPostCard = ({ post }) => {
  let mx_title = "";
  if (post?.title?.length > 30) {
    mx_title = `${post?.title?.substring(0, 30)}...`;
  } else {
    mx_title = post?.title;
  }

  return (
    <div key={post?.slug} className="right_posts">
      <div className="div_img">
        <img src={post?.images[0]?.url} alt="" />
      </div>
      <Link to={`/post/${post?.slug}`}>
        <h6 title={post?.title}>{mx_title}</h6>
        <div className="intro">
          <div
            dangerouslySetInnerHTML={createMarkup(
              `${post?.body?.substring(0, 100)}...`
            )}
          ></div>
        </div>
      </Link>
    </div>
  );
};
