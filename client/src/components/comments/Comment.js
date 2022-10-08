import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getComments } from "../../api/commentApi";
import { getReplies } from "../../api/replyApi";

import { createMarkup } from "../../helpers/parseHTML";
import CreateReply from "../reply/CreateReply";
import Reply from "../reply/Reply";

export default function Comment({ postId, commentId }) {
  const [isCreateReply, setIsCreateReply] = useState(false);
  const [comment, setComment] = useState(null);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [replies, setReplies] = useState();

  useEffect(() => {
    const get_Comments = async () => {
      const data = await getComments(postId, user.token);
      const singleComment = data.find((x) => x._id === commentId);
      setComment(singleComment);
    };
    get_Comments();
  }, [user, postId, commentId]);

  useEffect(() => {
    const get_replies = async () => {
      const data = await getReplies(commentId, user.token);
      setReplies(data);
    };
    get_replies();
  }, [commentId, user]);

  return (
    <div className="comment">
      <div>
        <img src={comment?.commentBy?.picture} alt="" className="comment_img" />
      </div>

      <div className="comment_col">
        <div className="comment_wrap">
          <span className="comment_name">
            {comment?.commentBy?.first_name} {comment?.commentBy?.last_name}
          </span>
          <div className="comment_text">
            <div dangerouslySetInnerHTML={createMarkup(comment?.comment)}></div>
          </div>
        </div>
        {comment?.image && (
          <img src={comment?.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like</span>
          <span
            onClick={() => setIsCreateReply((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            Reply
          </span>
          {isCreateReply && (
            <CreateReply
              commentId={comment?._id}
              replies={replies}
              setReplies={setReplies}
            />
          )}
          <span>
            {/* <Moment fromNow interval={30}> */}
            {comment?.commentAt}
            {/* </Moment> */}
          </span>
        </div>
        {replies &&
          replies?.map((reply, index) => <Reply reply={reply} key={index} />)}
      </div>
    </div>
  );
}
