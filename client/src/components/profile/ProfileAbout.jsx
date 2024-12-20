import React from 'react';
import PropTypes from 'prop-types';

export const ProfileAbout = ({
  profile: {
    user: { name },
    bio,
    skills,
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
      {bio && (
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
          doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
          neque modi perspiciatis similique?
        </p>
      )}
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map(skill => (
          <div className="p-1" key={skill}>
            <i className="fa fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
