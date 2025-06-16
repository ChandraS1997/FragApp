import { shareAsync } from 'expo-sharing';
import { Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { XStack, YStack } from 'tamagui';
import CsvIcon from '../../assets/icons/csv.svg';
import ExportIcon from '../../assets/icons/export.svg';
import PdfIcon from '../../assets/icons/pdf.svg';
import PngIcon from '../../assets/icons/png.svg';
import CustomPopover from './CustomPopover';
import PDFContent from './PDF_Contents/pdfContent';
import SidebarButton from './SideBarButton';

const Export = () => {
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
        content={<ExportContent />}
      />
    </>
  );
};

export default Export;

const ExportContent = () => {

  const handleExportPDF = async () => {
    try {
      const htmlContent = PDFContent();

      const options = {
        html: htmlContent,
        fileName: 'monthly_report',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      await shareAsync(file.filePath);
    } catch (err) {
      Alert.alert('Error', 'Could not generate PDF');
      console.error(err);
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
