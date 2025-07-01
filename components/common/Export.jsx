import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { XStack, YStack } from "tamagui";
import CsvIcon from "../../assets/icons/csv.svg";
import ExportIcon from "../../assets/icons/export.svg";
import PdfIcon from "../../assets/icons/pdf.svg";
import PngIcon from "../../assets/icons/png.svg";
import { getTodaysDate } from "../../utils";
import CustomPopover from "./CustomPopover";
import PDFContent from "./PDF_Contents/pdfContent";
import SidebarButton from "./SideBarButton";

const Export = ({ projectInfo, graphUris }) => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={ExportIcon}
            label="Export"
            hoverColor="$primary"
            defaultColor="$primary"
          />
        }
        content={
          <ExportContent projectInfo={projectInfo} graphUris={graphUris} />
        }
      />
    </>
  );
};

export default Export;

const ExportContent = ({ projectInfo, graphUris }) => {
  const handleExportPDF = async () => {
    try {
      // Capture chart as image
      const graph_base64 = await Promise.all(
        graphUris.map(async (uri) => {
          return await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
      );

      let htmlImageContent = "";
      if (graph_base64.length === 2) {
        htmlImageContent = `
        <div class="chart">
          <img src="data:image/png;base64,${graph_base64[0]}" alt="Graph One" />
    </div>
    <div class="chart">
      <img src="data:image/png;base64,${graph_base64[1]}" alt="Graph Two" />
    </div>
      `;
      } else {
        htmlImageContent = `<div class="chart">
          <img src="data:image/png;base64,${graph_base64[0]}" alt="Graph One" />
        </div>`;
      }
      const finalHtmlContent = await PDFContent(projectInfo, htmlImageContent);
      // console.log("Html content : ", finalHtmlContent);

      const sanitizedProjectName = projectInfo.name.replace(" ", "_");
      const formattedFilename = `${sanitizedProjectName}_${
        projectInfo.img_name.split(".")[0]
      }_${getTodaysDate()}`;
      console.log("formatted file name : ", formattedFilename);

      const options = {
        html: finalHtmlContent,
        fileName: `${formattedFilename}.pdf`,
        directory: "Documents",
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log("converted file :", file);

      // Todo : Download File function not working
      // await downloadFile(
      //   `file://${file.filePath}`,
      //   `${formattedFilename}.pdf`,
      //   false
      // );

      // share file
      if (await isAvailableAsync()) {
        await shareAsync(`file://${file.filePath}`);
      }
    } catch (err) {
      console.error(err);
      console.error(err.message);
      Alert.alert("Error", "Could not generate PDF");
    }
  };

  return (
    <>
      <YStack gap={8} padding={16}>
        <XStack gap={8}>
          <SidebarButton
            icon={CsvIcon}
            label="Export CSV"
            hoverColor="$primary"
            defaultColor="$primary"
          />
          <SidebarButton
            icon={PngIcon}
            label="Export PNG"
            hoverColor="$primary"
            defaultColor="$primary"
          />
          <SidebarButton
            icon={PdfIcon}
            label="Export PDF"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={handleExportPDF}
          />
        </XStack>
      </YStack>
    </>
  );
};

// const handleExportPDF = async () => {
//     try {
//       const htmlContent = PDFContent();

//       const options = {
//         html: htmlContent,
//         fileName: "monthly_report",
//         directory: "Documents",
//       };

//       const file = await RNHTMLtoPDF.convert(options);
//       console.log("converted file :", file);

//       if (await isAvailableAsync()) {
//         await shareAsync(`file://${file.filePath}`);
//       }
//       // await shareAsync(file.filePath);
//     } catch (err) {
//       console.error(err);
//       console.error(err.message);
//       Alert.alert("Error", "Could not generate PDF");
//     }
//   };
