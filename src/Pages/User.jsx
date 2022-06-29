import { useEffect, useContext } from "react";
import GithubContext from "../Context/Github/GithubContext";
import { useParams } from "react-router-dom";

const User = () => {
  const { getUser, user } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.login);
  }, []);

  return <div>{params.login}</div>;
};

export default User;
