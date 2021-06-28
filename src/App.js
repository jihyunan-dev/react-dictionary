import React from "react";
import Home from "./Home";
import Add from "./Add";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/word/add" component={Add} />
      {/* <Route path="/word/:id/modify" component={Modify} />*/}
      {/* 잘못된 url일 때 이동되도록 만들기 */}
    </div>
  );
}

export default App;
