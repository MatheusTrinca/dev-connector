import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';
import api from '../utils/api';
import { setAlert } from './alert';

export const getPosts = () => async dispatch => {
  try {
    const res = await api.get('/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = postId => async dispatch => {
  try {
    const res = await api.put(`/posts/${postId}/like`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = postId => async dispatch => {
  try {
    const res = await api.put(`/posts/${postId}/unlike`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await api.delete(`/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
