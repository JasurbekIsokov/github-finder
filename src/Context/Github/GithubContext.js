import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com";

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const responce = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await responce.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Get single user
  const getUser = async (login) => {
    setLoading();

    const responce = await fetch(`${GITHUB_URL}/users/${login}`);
    if (responce.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await responce.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Get single user Repos
  const getRepos = async (login) => {
    setLoading();

    const responce = await fetch(`${GITHUB_URL}/users/${login}/repos`);
    if (responce.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await responce.json();
      dispatch({
        type: "GET_USER_REPOS",
        payload: data,
      });
    }
  };

  // Clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  // Set lading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
