import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { useParams } from 'react-router-dom';

export const CommentForm = ({ addComment }) => {
  const { id } = useParams();
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    addComment(id, { text });
    setText('');
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addComment,
};

export default connect(null, mapDispatchToProps)(CommentForm);
