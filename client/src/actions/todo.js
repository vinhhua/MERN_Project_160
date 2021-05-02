import axios from 'axios';
const url = 'http://localhost:5000/posts';

const axiosGet = () => axios.get(url);
const axiosCreate = (newPost) => axios.post(url, newPost);
const axiosPatch = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
const axiosDelete = (id) => axios.delete(`${url}/${id}`);

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axiosGet();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await axiosCreate(post);

    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await axiosPatch(id, post);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axiosDelete(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};