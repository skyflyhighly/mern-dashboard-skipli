const { FieldValue } = require("firebase-admin/firestore");

/**
 * @param {FirebaseFirestore.Firestore} db
 */
function usersService(db) {
  const usersRef = db.collection("users");
  const GITHUB_API_URL = "https://api.github.com";

  /**
   * @param {string} phoneNumber
   * @param {AccessCode} accessCode
   */
  async function addUser(phoneNumber, accessCode) {
    try {
      await usersRef.add({
        phoneNumber,
        accessCode: accessCode.toString(),
        verified: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @param {string} phoneNumber
   */
  async function getUserByPhoneNumber(phoneNumber) {
    const userSnapshots = await usersRef
      .where("phoneNumber", "==", phoneNumber)
      .get();
    if (userSnapshots.empty) {
      throw new Error("User not found");
    }
    // Get only one user, since the phone number is unique
    const userDoc = userSnapshots.docs[0];
    const user = {
      id: userDoc.id,
      ...userDoc.data(),
    };
    return user;
  }

  /**
   * @param {string} phoneNumber
   * @param {AccessCode} accessCode
   *
   * @return {boolean} result
   */
  async function verifyUser(phoneNumber, accessCode) {
    try {
      const user = await getUserByPhoneNumber(phoneNumber);
      const accessCodeIsCorrect = accessCode.compare(user.accessCode);

      // Empty the access code if the access code is correct
      if (accessCodeIsCorrect) {
        await updateDoc(doc(usersRef, user.id), {
          accessCode: "",
          verified: true,
        });
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  /**
   * @param {string} phoneNumber
   * @param {string} githubUserId
   */
  async function likeGithubUser(phoneNumber, githubUserId) {
    try {
      const userData = await getUserByPhoneNumber(phoneNumber);
      const userRef = usersRef.doc(userData.id);

      // Add Github user to the favorite list if it does not exist in the list.
      // Else remove the Github user from the list
      await userRef.update({
        favoriteGithubUsers: FieldValue.arrayUnion(githubUserId),
      });
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  /**
   * @param {string} query
   * @param {number} page
   * @param {number} perPage
   */
  async function searchGithubUsers(phoneNumber, query, page, perPage) {
    const route = `${GITHUB_API_URL}/search/users`;
    const searchParams = new URLSearchParams({
      q: query,
      page,
      per_page: perPage,
    });
    const response = await fetch(`${route}?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });
    if (response.status !== 200) {
      return response.text();
    }
    const githubUsers = await response.json();
    const user = await getUserByPhoneNumber(phoneNumber);
    const favoriteGithubUsers = user.favoriteGithubUsers
      ? user.favoriteGithubUsers
      : [];
    const detailedGithubUsersPromises = githubUsers.items.map((ghUser) => {
      return findGithubUserProfile(ghUser.id);
    });
      const detailedGithubUsers = await Promise.all(detailedGithubUsersPromises)
    const sanitizedGithubUsers = detailedGithubUsers.map((ghUser) => {
      return {
        id: ghUser.id,
        login: ghUser.login,
        avatar_url: ghUser.avatar_url,
        html_url: ghUser.html_url,
        public_repos: ghUser.public_repos,
        followers: ghUser.followers,
        liked: favoriteGithubUsers.includes(ghUser.id),
      };
    });
    return {
      total: githubUsers.total_count,
      github_users: sanitizedGithubUsers,
    };
  }

  /**
   * @param {string} id
   */
  async function findGithubUserProfile(id) {
    const route = `${GITHUB_API_URL}/user/${id}`;

    // Return: { login: “”, id: “”, avatar_url: “”,  html_url: “”, public_repos, followers }
    const response = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });
    if (response.status !== 200) {
      return response.text();
    }
    const githubUser = await response.json();
    return {
      id: githubUser.id,
      login: githubUser.login,
      avatar_url: githubUser.avatar_url,
      html_url: githubUser.html_url,
      public_repos: githubUser.public_repos,
      followers: githubUser.followers,
    };
  }

  return {
    addUser,
    getUserByPhoneNumber,
    verifyUser,
    likeGithubUser,
    searchGithubUsers,
    findGithubUserProfile,
  };
}

module.exports = usersService;
