import { useState } from "react";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import DraftEditor from "../../components/editor/DraftEditor";
import ImagePreview from "../../components/inputs/ImagePreview";
import "./post.css";
import "../../components/postpopup/postpopup.css";
import { categories } from "../../data/categories";
import { countries } from "../../data/countries";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/reducers/post";
import { add_post } from "../../api/postApi";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../helpers/uploadImages";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export const AddPost = () => {
  const { slug } = useParams();
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const post = posts.find((x) => x.slug === slug);
  console.log(post);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [author, setAuthor] = useState("");
  const [externUrl, setExternUrl] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);
  console.log(country);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { token } = user;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const resetForm = () => {
    setBody("");
    setTitle("");
    setType("");
    setAuthor("");
    setCategory("");
    setCountry("");
    setImages([]);
    setExternUrl("");
    setEditorState("");
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setBody(currentContentAsHTML);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (images && images.length) {
        const postImages = images.map((image) => dataURItoBlob(image));
        const path = `${user.username}/posts`;
        let formData = new FormData();
        formData.append("path", path);
        postImages.forEach((img) => {
          formData.append("file", img);
        });

        const response = await uploadImages(formData, path, user.token);
        const data = await add_post(
          {
            title,
            body,
            type,
            images: response,
            author,
            externUrl,
            category,
            country,
          },
          token
        );
        dispatch(createPost(data));
        setLoading(false);
        resetForm();
      } else {
        const data = await add_post(
          {
            title,
            body,
            type,
            images: null,
            author,
            externUrl,
            category,
          },
          token
        );
        dispatch(createPost(data));
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <Helmet>
        <title>Create New Post</title>
      </Helmet>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a new Post{" "}
      </h1>
      {/* <Formik
        enableReinitialize
        initialValues={initialPostValue}
        validationSchema={validationSchema}
        onSubmit={handlePostSubmit}
      > */}
      {/* {(formik) => ( */}
      <form>
        <div style={{ display: "flex" }}>
          <div className="post_input_wrap ">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
            />
          </div>
          <div className="post_input_wrap ">
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">What type?</option>
              <option value="video">video</option>
              <option value="text">text</option>
              <option value="images">images</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="post_input_wrap ">
            <input
              value={externUrl}
              onChange={(e) => setExternUrl(e.target.value)}
              placeholder="Extern Url"
            />
          </div>
          <div className="post_input_wrap ">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="post_input_wrap ">
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a category</option>
              {categories.map(({ text, link }) => (
                <option key={text} value={link}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div className="post_input_wrap ">
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Choose a Country</option>
              {countries.map(({ name, value }) => (
                <option key={name} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="editor">
          <DraftEditor
            editorState={editorState}
            handleEditorChange={handleEditorChange}
          />
        </div>
        <div className="preview">
          <ImagePreview
            images={images}
            setImages={setImages}
            //   setShowPrev={setShowPrev}
            //   setError={setError}
          />
        </div>
        <div className="post_input_wrap">
          <button type="submit" onClick={handlePostSubmit}>
            {loading ? "Submitting post" : "Submit"}
            {loading && <PulseLoader color="white" />}
          </button>
        </div>
      </form>
      {/* )}
      </Formik> */}
    </div>
  );
};
