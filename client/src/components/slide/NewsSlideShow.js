import React from "react";
import { Link } from "react-router-dom";
import { Zoom } from "react-slideshow-image";
import "./slide.css";

export const NewsSlideShow = ({ posts }) => {
  const zoomOutProperties = {
    duration: 2000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    scale: 0.1,
    arrows: true,
  };

  return (
    <div className="slideShow">
      <div className="slides">
        <div className="slide-container">
          <Zoom {...zoomOutProperties}>
            {posts?.slice(0, 10).map((post, index) => {
              let mx_title = "";
              if (post?.title?.length > 45) {
                mx_title = `${post?.title?.substring(0, 45)}...`;
              } else {
                mx_title = post?.title;
              }
              return (
                <div className="each-slide" key={index}>
                  <img
                    src={post.images[0]?.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "335px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="div">
                    <Link to={`/post/${post?.slug}`}>
                      <h3
                        style={{
                          fontSize: "25px",
                        }}
                      >
                        {mx_title}
                      </h3>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Zoom>
        </div>
      </div>
      <div className="secondary">
        {posts?.slice(0, 3).map((post, index) => (
          <div className={`index${index + 1}`} key={post.slug}>
            <img src={post?.images[0]?.url} alt="" />
            <div className="title">
              <Link to={`/post/${post?.slug}`}>
                <h5>{post?.title}</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
