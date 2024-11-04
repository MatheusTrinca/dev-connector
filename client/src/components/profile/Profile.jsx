import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

export const Profile = ({ profile, auth, getProfileById }) => {
  console.log('PROFILE', profile);
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

        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {profile.experience?.length > 0 ? (
            <Fragment>
              {profile.experience.map(experience => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))}
            </Fragment>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>

        <div class="profile-edy bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {profile.education?.length > 0 ? (
            <Fragment>
              {profile.education.map(education => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </Fragment>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>

        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
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
