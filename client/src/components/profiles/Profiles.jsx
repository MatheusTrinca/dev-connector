import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

export const Profiles = ({ profiles, loading, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" /> Browse and connect with
        developers
      </p>

      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </section>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  profiles: profile.profiles,
  loading: profile.loading,
});

const mapDispatchToProps = {
  getAllProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
