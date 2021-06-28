import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { loadWordsFB } from "./redux/module/words";
import Home from "./Home";
import Add from "./Add";

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(loadWordsFB()), [dispatch]);
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
