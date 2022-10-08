import React, { useEffect, useState } from "react";
import { getReplies } from "../../api/replyApi";
// import Moment from "react-moment";

const Reply = ({ reply }) => {
  // const [reply, setReply] = useState(null);

  // useEffect(() => {
  //   const get_replies = async () => {
  //     const data = await getReplies(commentId, token);
  //     const singleReply = data.find((x) => x._id === replyId);
  //     console.log(data);
  //     // setReply(singleReply);
  //   };
  //   get_replies();
  // }, [replyId]);
  // console.log(replyId);
  return (
    <div className="comment">
      <div>
        <img src={reply?.repliedBy?.picture} alt="" className="comment_img" />
      </div>

      <div className="comment_col">
        <div className="comment_wrap">
          <span className="comment_name">
            {reply?.repliedBy?.first_name} {reply?.repliedBy?.last_name}
          </span>
          <div className="comment_text">{reply?.reply}</div>
        </div>
        {reply?.image && (
          <img src={reply?.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like</span>
          <span>
            {/* <Moment fromNow interval={30}> */}
            {reply?.repliedAt}
            {/* </Moment> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reply;
