export const css = `
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0px 0 0 0;
    overflow: hidden;
    position: relative;
    color: white;
    padding: 100px;
    min-height: 100vh;

    img {
      position: absolute;
      top: 0;
      z-index: 0;
    }

    .column {
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }

  .about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 150px 0 0 0;
  }

  .services {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 150px 0 0 0;
  }

  h1 {
    max-width: 800px;
    text-align: center;
  }

  p {
    max-width: 500px;
    text-align: center;
  }

`;
