import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

export const Posts = ({ posts, loading, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {/* Post Form */}

      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ post }) => ({
  posts: post.posts,
  loading: post.loading,
});

const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
