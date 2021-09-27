import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

// components
import Home from "./Home";
import FormPage from "./FormPage";
import Header from "./Header";

// style
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";

// redux
import { loadWordsFB } from "./redux/module/words";

function App() {
  const dispatch = useDispatch();

  // App.js가 새로 렌더될 때마다(진입, 새로고침) loadWordsFB 함수를 dispatch 합니다.
  useEffect(() => {
    dispatch(loadWordsFB());
  }, [dispatch]);
  return (
    // ThemeProvider를 활용하면 theme을 사용할 수 있습니다:)
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/word/add" component={FormPage} />
            <Route path="/word/:id/edit" component={FormPage} />
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin-top: 40px;
  padding: 0 30px;

  // theme.js에서 지정한 문자열을 이용 - @media screen and (min-width: 768px) {} 와 같은 뜻이 됩니다.
  // 짧게 쓰고 유지보수성을 높이기 위해 theme으로 등록했습니다.
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
