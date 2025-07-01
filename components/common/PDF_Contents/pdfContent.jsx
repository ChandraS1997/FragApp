// components/PDFContent.js

const PDFContent = async (projectInfo, htmlImageContent) => {
  return `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Image Analysis Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
        color: #333;
      }

      .header {
        text-align: center;
        margin-bottom: 40px;
      }

      .header img {
        max-width: 200px;
        margin-bottom: 20px;
      }

      .section-title {
        font-size: 18px;
        font-weight: bold;
        margin: 30px 0 10px;
        border-bottom: 2px solid #eee;
        padding-bottom: 5px;
      }

      .project-info {
        margin-bottom: 30px;
      }

      .project-info table {
        width: 100%;
        border-collapse: collapse;
      }

      .project-info td {
        padding: 8px;
        vertical-align: top;
      }

      .project-info td.label {
        font-weight: bold;
        width: 120px;
        color: #444;
      }

      .project-img {
        margin-top: 20px;
        max-width: 100%;
        border: 1px solid #ccc;
      }

      .chart {
        margin: 30px 0;
        padding-top: 30px;
        text-align: center;
      }

      .chart img {
        max-width: 100%;
        border: 1px solid #ccc;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="https://www.mineexcellence.com/user/images/me-01.png" alt="Company Logo" />
      <h1>Image Analysis Report</h1>
    </div>

    <div class="project-info">
      <div class="section-title">Project Information</div>
      <table>
        <tr>
          <td class="label">Project ID:</td>
          <td>${projectInfo.id}</td>
        </tr>
        <tr>
          <td class="label">Name:</td>
          <td>${projectInfo.name}</td>
        </tr>
        <tr>
          <td class="label">Image Name:</td>
          <td>${projectInfo.img_name}</td>
        </tr>
      </table>
      <img class="project-img" src="${projectInfo.img_url}" alt="Project Image" />
    </div>

    <div class="section-title">Analyzed Graphs</div>
    ${htmlImageContent}
  </body>
</html>
`;
};

export default PDFContent;
