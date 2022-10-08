import { Layout } from "../../../components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { createMarkup } from "../../../helpers/parseHTML";
import "../post.css";
import "./singlePage.css";
import { SimilarPosts } from "./SimilarPost";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import CreateComment from "../../../components/comments/CreateComment";
import Comment from "../../../components/comments/Comment";
import { useSelector } from "react-redux";

export const SinglePost = () => {
  const [post, setPost] = useState();
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { slug } = useParams();
  const [isComment, setIsComment] = useState(false);
  const similarStories = posts?.filter(
    (x) => x.category === post?.category && x._id !== post?._id
  );
  const story = posts?.find((x) => x.slug === slug);

  useEffect(() => {
    setPost(story);
  }, [story]);

  return (
    <Layout>
      <Helmet>
        <title>{post?.title}</title>
      </Helmet>
      <div className="single_story">
        <div className="read_also">
          <span>Similar Stories</span>
          <SimilarPosts posts={similarStories} />
        </div>
        <div className="read_story">
          <div className="story_title">
            <h2>{post?.title}</h2>
          </div>
          <div className="body">
            <img src={post?.images[0].url} alt="" />
            <div className="story_meta">
              <span>
                Country: {post?.country} Category: {post?.category}
              </span>
            </div>
            <div className="story_text">
              <div dangerouslySetInnerHTML={createMarkup(post?.body)}></div>
            </div>
          </div>
          <div className="comment_container">
            {post?.comments &&
              post?.comments?.map((comment) => (
                <Comment key={comment} commentId={comment} postId={post._id} />
              ))}
            {!isComment && (
              <button
                className="btn_add_comment"
                onClick={() => setIsComment((prev) => !prev)}
              >
                Add your comment
              </button>
            )}
            {user && isComment && (
              <CreateComment postId={post?._id} postBy={user._id} />
            )}
            {!user && isComment && (
              <>
                <span className="not_logged_in">
                  You have to login before you comment
                </span>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
