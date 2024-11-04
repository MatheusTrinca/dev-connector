import React from 'react';
import formatDate from '../../utils/formatDate';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {formatDate(from)} - {!to ? 'now' : formatDate(to)}{' '}
      </p>
      <p>
        <strong>Position: {title}</strong>
      </p>
      <p>
        <strong>Description: {description}</strong>
      </p>
    </div>
  );
};

export default ProfileExperience;
