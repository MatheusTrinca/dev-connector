import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  if (isAuthenticated) {
    return <Component />;
  }

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
