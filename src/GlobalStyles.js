import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};

  @font-face {
    font-family: 'ChosunGu';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'ChosunGu', 'Noto Sans SC', sans-serif;
  }

  a {
    text-decoration: none;
    color: black;
  }

  button {
    font-family: 'ChosunGu', 'Noto Sans SC', sans-serif;
    cursor: pointer;
  }

  input,
  textarea,
  button {
    border: none;
    background-color: transparent;
    outline: none;
  }
`;

export default GlobalStyles;
