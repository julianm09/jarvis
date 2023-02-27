import { saveAs } from "file-saver";
import { css } from "./styles.js";

export const exportHtml = async (sections) => {
  const html = `
  <html>
    <head>
      <title>My HTML Page</title>
      <link rel="stylesheet/less" type="text/css" href="styles.less" />
      <script src="less.js" type="text/javascript"></script>
      <style>
      ${css}
      </style>
    </head>
    <body>
      ${sections.map((x) => x.html).join(" ")}
    </body>
  </html>
`;

  if (sections) {
    // Create a new Blob object containing the content
    const blob = new Blob([html], { type: "text/javascript" });

    // Use the FileSaver.js library to save the file
    saveAs(blob, "index.html");
  }
};
