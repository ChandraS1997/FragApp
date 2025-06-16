// components/PDFContent.js

const PDFContent = () => {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #007BFF; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Monthly Report</h1>
        <p>This is your exported report.</p>
        <table>
          <tr>
            <th>Date</th>
            <th>Task</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>2025-06-15</td>
            <td>Task A</td>
            <td>Completed</td>
          </tr>
          <tr>
            <td>2025-06-16</td>
            <td>Task B</td>
            <td>Pending</td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

export default PDFContent;
