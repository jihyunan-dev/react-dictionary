import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { loadWordsFB } from "./redux/module/words";
import Home from "./Home";
import Add from "./Add";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(loadWordsFB()), [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <Container>
          <Route path="/" exact component={Home} />
          <Route path="/word/add" component={Add} />
          {/* <Route path="/word/:id/modify" component={Modify} />*/}
          {/* 잘못된 url일 때 이동되도록 만들기 */}
        </Container>
      </div>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin-top: 40px;
  padding: 0 30px;

  ${({ theme }) => theme.device.tablet} {
    margin-top: 60px;
    padding: 0 50px;
  }

  ${({ theme }) => theme.device.desktop} {
    max-width: 1400px;
    margin: 60px auto 0 auto;
  }
`;

export default App;
