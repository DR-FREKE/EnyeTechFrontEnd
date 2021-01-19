import React from "react";
// import logo from './logo.svg';
import "./App.css";
import AppRoute from "./Routes/app.route";
import { Provider } from "./Context/AppContext";

function App() {
  return (
    <>
      <Provider>
        <AppRoute />
      </Provider>
    </>
  );
}

export default App;
