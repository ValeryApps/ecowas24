import axios from "axios";

const postUrl = `${process.env.REACT_APP_API_URL}/posts`;

export const fetch_Posts = async () => {
  try {
    const { data } = await axios.get(postUrl);
    return data;
  } catch (error) {
    return error.response.statusText;
  }
};
export const fetch_posts_by_id = async (postId) => {
  try {
    const { data } = await axios.get(`${postUrl}/${postId}`);
    return data;
  } catch (error) {
    return error.response.statusText;
  }
};

export const add_post = async (post, token) => {
  try {
    const { data } = await axios.post(`${postUrl}/create`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.statusText;
  }
};
export const update_post = async (post, token) => {
  try {
    const { data } = await axios.put(`${postUrl}/create`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.statusText;
  }
};

export const fetch_Posts_per_country = async (country) => {
  try {
    const data = await axios.get(`${postUrl}/country/${country}`);
    return data;
  } catch (error) {
    return error.response.statusText;
  }
};
