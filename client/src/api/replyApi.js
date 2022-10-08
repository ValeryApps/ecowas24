import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/reply`;

export const reply = async (commentId, token, reply, image) => {
  try {
    const { data } = await axios.post(
      url,
      { reply, image, commentId },
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
export const getReplies = async (commentId, token) => {
  try {
    const { data } = await axios.get(`${url}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
