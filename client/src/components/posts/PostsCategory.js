import React from "react";
import { MainPostCard } from "./MainPostCard";
import { RightPostCard } from "./RightPostCard";
import "./post.css";

export const PostsCategory = ({ posts }) => {
  return (
    <div className="">
      <div className="row">
        <div className="col-md-6 col-sm-12 __left">
          <MainPostCard posts={posts} index={0} />
        </div>
        <div className="col-md-6 col-sm-12 __right">
          {posts?.slice(1, 4).map((pts) => (
            <RightPostCard post={pts} key={pts.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};
