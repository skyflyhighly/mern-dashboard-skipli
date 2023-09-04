import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export function GithubUserTile({
  id,
  login,
  avatarURL,
  htmlURL,
  publicRepos,
  followers,
  liked,
}) {
  const { phoneNumber } = useAuth();
  const [isLiked, setIsLiked] = useState(liked);

  const likeGithubUser = () => {
    axios
      .post("http://localhost:3000/users/like-github-user", {
        github_user_id: id,
        phone_number: phoneNumber,
      })
      .then(() => {
        setIsLiked(() => true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="border border-start-0 border-end-0 p-4 d-flex justify-content-start"
      id={id}
    >
      <div className="me-4">
        <img
          className="img-fluid object-fit-cover rounded"
          src={avatarURL}
          alt={login}
          height={300}
          width={300}
        />
      </div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between mb-4">
          <h3>
            <a href={htmlURL} target="_blank" rel="noreferrer">
              {login}
            </a>
          </h3>
          <button className="btn" onClick={likeGithubUser}>
            {isLiked ? (
              <AiFillHeart color="#ff0000" size={"30px"} />
            ) : (
              <AiOutlineHeart size={"30px"} />
            )}
          </button>
        </div>
        <div>
          <p>Public Repos: {publicRepos}</p>
          <p>Followers: {followers}</p>
        </div>
      </div>
    </div>
  );
}
