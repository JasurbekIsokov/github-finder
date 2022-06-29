import { useContext } from "react";
import AlertContext from "../Context/Alert/AlertContext";

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return <div>Alert</div>;
};

export default Alert;
