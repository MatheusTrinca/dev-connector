import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

export const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form class="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
