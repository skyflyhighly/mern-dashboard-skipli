import axios from "axios";
import { useEffect, useState } from "react";
import { GithubUserTile } from "../components/GithubUserTile";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phone_number");
    axios
      .get(`http://localhost:3000/users/${phoneNumber}/profile`)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      });
  }, []);

  return (
    <div className="container">
      <h1>Profile Page</h1>
      <p>Phone Number: {localStorage.getItem("phone_number")}</p>
      <h3>Favorite Github Users:</h3>
      {user &&
        user.favoriteGithubUsers.map((ghUser) => (
          <GithubUserTile
            key={ghUser.id}
            id={ghUser.id}
            login={ghUser.login}
            avatarURL={ghUser.avatar_url}
            htmlURL={ghUser.html_url}
            publicRepos={ghUser.public_repos}
            followers={ghUser.followers}
            liked={true}
          />
        ))}
    </div>
  );
}

export default ProfilePage;
