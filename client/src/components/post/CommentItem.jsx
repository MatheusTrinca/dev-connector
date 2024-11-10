import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

export const CommentItem = ({
  comment: { _id, text, name, avatar, user, date },
  removeComment,
  auth,
  postId,
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt={name} />
          <h4>John Doe</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">{formatDate(date)}</p>
        {auth.user._id === user && (
          <button
            onClick={() => removeComment(postId, _id)}
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  removeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
