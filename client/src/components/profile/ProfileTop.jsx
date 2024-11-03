import PropTypes from 'prop-types';
import React from 'react';

export const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt={name} />
      <h1 className="large">{name}</h1>
      <p className="lead">{status}</p>
      <p>{location}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {Object.entries(social).map(([key, value]) => (
          <a key={key} href={value} target="_blank" rel="noopener noreferrer">
            <i className={`fab fa-${key} fa-2x`}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
