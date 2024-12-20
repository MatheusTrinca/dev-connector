import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username, repos, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  if (!repos) {
    return <Spinner />;
  }

  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2>

      {repos.map(repo => (
        <div class="repo bg-white p-1 my-1" key={repo._id}>
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li class="badge badge-primary">
                Stars: {repo.stargazers_count}
              </li>
              <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
              <li class="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  repos: profile.repos,
});

const mapDispatchToProps = {
  getGithubRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
