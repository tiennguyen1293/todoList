import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body,
  html {
    height: 100%;
    width: 100%;
  }

  html {
    font-family: ${props => props.theme.fontFamily};
    font-size: 62.5%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    color: ${props => props.theme.secondary};
    font-size: ${props => props.theme.fontSize};
    background: ${props => props.theme.primary};
  }

  input,
  button {
    &:focus,
    &:active {
      outline: 0;
    }
  }
`;
