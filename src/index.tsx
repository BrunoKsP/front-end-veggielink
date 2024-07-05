import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routess from "./routes/routes";
import { setToken } from "./services/api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routess />
      </LocalizationProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
