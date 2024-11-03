import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

export const Profile = ({ profile, auth, getProfileById }) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (!profile) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <Link to="/profiles" className="btn btn-light">
        Back to Profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}

      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
      </div>
    </section>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, auth }) => ({
  profile: profile.profile,
  auth,
});

const mapDispatchToProps = {
  getProfileById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
