import React from "react";
import { Link } from "react-router-dom";
import { createMarkup } from "../../../helpers/parseHTML";

export const SimilarPosts = ({ posts }) => {
  return (
    <>
      {posts?.map((post) => (
        <div className="similar" key={post.slug}>
          <a href={`/post/${post.slug}`}>
            <h3>{post?.title}</h3>
            <div
              dangerouslySetInnerHTML={createMarkup(
                `${post?.body?.substring(0, 100)}...`
              )}
            ></div>
          </a>
        </div>
      ))}
    </>
  );
};
