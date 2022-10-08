import { Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/appBar/AppHeader";
// import { AppHeader2 } from "./components/appBar/AppHeader2";
import { AppFooter } from "./components/footer/AppFooter";
import { About } from "./pages/About";
import Login from "./pages/auth";
import { StoriesPerCategory } from "./pages/categories/StoriesPerCategory";
import { Contact } from "./pages/Contact";
import { Country } from "./pages/countries/Country";
import { Home } from "./pages/Home";
import { AddPost } from "./pages/posts/AddPost";
import { Posts } from "./pages/posts/Posts";
import { SinglePost } from "./pages/posts/singlePage/SinglePost";

function App() {
  return (
    <>
      <AppHeader />
      {/* <AppHeader2 /> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/country/:country" element={<Country />} />
          <Route path="/category/:link" element={<StoriesPerCategory />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/create-post/" element={<AddPost />} />
          <Route path="/create-post/:slug" element={<AddPost />} />
        </Routes>
      </div>
      <AppFooter />
    </>
  );
}

export default App;
