import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  }
  body{
    max-width: 1920px;
    margin: auto;
    background: #F5FAFC;
  }
  body::-webkit-scrollbar {
    width: 0.45em;
    background-color: #fff;
  }
  body::-webkit-scrollbar-thumb {
    background-color: #1C88E5; 
  }
  .content_e296pg {
    max-width: 96vw !important;
    img{
      max-height: calc(100vh - 70px) !important;
    }
  }
  .react-images__view-image {
    height: 100vh !important;
  }
  .react-images__view-image--isFullscreen{
    height: auto !important;
  }
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
