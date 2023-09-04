import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GithubUserTile } from "../components/GithubUserTile";
import { useAuth } from "../contexts/AuthenticationContext";
import Pagination from "../components/Pagination";
import searchGithubUsers from "../services/searchGithubUsers";

function SearchPage() {
  const searchInput = useRef(null);
  const { phoneNumber } = useAuth();
  const [githubUsers, setGithubUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const githubQuery = searchInput.current.value;
    if (githubQuery !== "") {
      searchGithubUsers(phoneNumber, githubQuery, page, perPage).then(
        (response) => {
          if (response.status === 200) {
            const data = response.data;
            setGithubUsers(() => data.github_users);
            setSearchParams({
              q: githubQuery,
              page,
              per_page: perPage,
              phone_number: phoneNumber,
            });
          }
        }
      );
    }
  }, [page, perPage, phoneNumber, setSearchParams]);

  const searchGithubUser = (e) => {
    e.preventDefault();
    const githubQuery = searchInput.current.value;
    searchGithubUsers(phoneNumber, githubQuery, 1, perPage).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setGithubUsers(() => data.github_users);
        setTotal(data.total);
        setSearchParams({
          q: githubQuery,
          page: 1,
          per_page: perPage,
          phone_number: phoneNumber,
        });
        setPage(1);
      }
    });
  };

  const navigateToPage = (toPage) => {
    setPage(() => toPage);
    scrollToTop();
  };

  const changePerPage = (e) => {
    setPerPage(() => e.target.value);
    setPage(() => 1);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <form onSubmit={searchGithubUser}>
          <input type="text" ref={searchInput} />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
        <div>
          <Link to={"profile"}>
            <CgProfile size={"30px"} />
          </Link>
        </div>
      </nav>
      <select value={perPage} onChange={changePerPage}>
        <option value="30" selected>
          30
        </option>
        <option value="50" selected>
          50
        </option>
        <option value="500" selected>
          500
        </option>
        <option value="1000" selected>
          1000
        </option>
      </select>
      {githubUsers.map((user) => {
        return (
          <GithubUserTile
            key={user.id}
            id={user.id}
            login={user.login}
            avatarURL={user.avatar_url}
            htmlURL={user.html_url}
            publicRepos={user.public_repos}
            followers={user.followers}
            liked={user.liked}
          />
        );
      })}
      <div>
        <Pagination
          total={total}
          page={page}
          perPage={perPage}
          navigateToPage={navigateToPage}
        />
      </div>
    </div>
  );
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

export default SearchPage;
