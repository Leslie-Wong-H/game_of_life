import { FunctionComponent } from 'react';
import imgURL from "../img/GitHub.png";

const GithubAvatar:FunctionComponent = () => {
  return (
    <div className="githubContainer">
      <a
        className="githubLink"
        href="https://github.com/Leslie-Wong-H/game_of_life"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="githubImg"
          // eslint-disable-next-line
          src={imgURL}
          alt="GitHub Link"
          width={64}
          height={64}
        />
      </a>
    </div>
  );
};

export default GithubAvatar;
