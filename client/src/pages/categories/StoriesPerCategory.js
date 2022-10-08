import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PostCard } from "../../components/posts/PostCard";

export const StoriesPerCategory = () => {
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const { link } = useParams();

  const stories = posts?.filter(
    (x) => x.category.toLowerCase() === link.toLowerCase()
  );
  return (
    <Layout>
      <Helmet>
        <title>{link.toUpperCase()}</title>
      </Helmet>
      <div>
        <div className="row">
          {stories?.map((story, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <PostCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
