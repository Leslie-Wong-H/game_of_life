import imgURL from "../img/GitHub.png";

const GithubAvatar = () => {
  return (
    <div className="githubContainer">
      <a
        className="githubLink"
        href="https://github.com/Leslie-Wong-H/game_of_life"
        target="_blank"
        rel="noopener"
      >
        <img className="githubImg" src={imgURL} alt="GitHub Link" />
      </a>
    </div>
  );
};

export default GithubAvatar;
