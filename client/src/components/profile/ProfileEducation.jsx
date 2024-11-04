import React from 'react';
import formatDate from '../../utils/formatDate';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {formatDate(from)} - {!to ? 'now' : formatDate(to)}{' '}
      </p>
      <p>
        <strong>Degree: {degree}</strong>
      </p>
      <p>
        <strong>Field of Study: {fieldofstudy}</strong>
      </p>
      <p>
        <strong>Description: {description}</strong>
      </p>
    </div>
  );
};

export default ProfileEducation;
