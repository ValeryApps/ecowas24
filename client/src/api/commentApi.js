import axios from "axios";

const commentUrl = `${process.env.REACT_APP_API_URL}/comment`;

export const comment = async (postId, token, comment, image) => {
  try {
    const { data } = await axios.post(
      commentUrl,
      { comment, image, postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getComments = async (postId, token) => {
  try {
    const { data } = await axios.get(`${commentUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
