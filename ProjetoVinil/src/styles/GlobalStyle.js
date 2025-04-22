import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  button {
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @font-face {
    font-family: 'Gill Sans Ultra Bold';
    src: url('https://fonts.cdnfonts.com/css/gill-sans-ultra-bold') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
`;