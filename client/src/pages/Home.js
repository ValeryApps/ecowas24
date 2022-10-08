import { NewsSlideShow } from "../components/slide/NewsSlideShow";
import { dummyPosts } from "../data/dummyPosts";
import "./home.css";
import { RightSideMenu } from "../components/rightSide/RightSideMenu";
import { CategoryPill } from "../components/category/CategoryPill";
import { PostsCategory } from "../components/posts/PostsCategory";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
export const Home = () => {
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const postWithImage = posts?.filter((x) => x.images.length > 0);
  const sports = dummyPosts.filter((x) => x.category === "Sports");
  const politics = posts?.filter((x) => x.category === "Politics");
  const economies = dummyPosts.filter((x) => x.category === "Economy");
  const tech = dummyPosts.filter((x) => x.category === "Technology");
  const educations = dummyPosts.filter((x) => x.category === "Education");
  const healths = dummyPosts.filter((x) => x.category === "Health");

  const postTitles = posts?.map((post) => {
    console.log(post.title.length);
    if (post.title.length > 90) {
      const newTitle = post.title.substring(0, 90) + "...";
      return newTitle;
    }
    return post.title;
  });

  return (
    <div className="home" style={{ marginTop: "20px" }}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="type_writer">
        <Typewriter
          options={{
            strings: postTitles,
            autoStart: true,
            deleteSpeed: 1,
            delay: 3,
            loop: true,
            pauseFor: 3000,
          }}
        />
      </div>

      <NewsSlideShow posts={posts} />
      <div className="">
        <div className="row">
          <div className=" col-md-12 col-sm-12 col-lg-9">
            <CategoryPill category="Politics" />
            <PostsCategory posts={politics} />
            <CategoryPill category="Sports" />
            <PostsCategory posts={sports} />
            <CategoryPill category="Economy" />
            <PostsCategory posts={economies} />
            <CategoryPill category="Technology" />
            <PostsCategory posts={tech} />
            <CategoryPill category="Health" />
            <PostsCategory posts={healths} />
            <CategoryPill category="Education" />
            <PostsCategory posts={educations} />
          </div>
          <div className="col-lg-3 home_right">
            <RightSideMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
