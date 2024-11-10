import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { addLike, deletePost, removeLike } from '../../actions/post';

export const PostItem = ({ post, auth, addLike, removeLike, deletePost }) => {
  const { _id, text, name, avatar, user, likes, date, comments } = post;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">{formatDate(date)}</p>
        <button
          onClick={() => addLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          onClick={() => removeLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deletePost(_id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  addLike,
  removeLike,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
