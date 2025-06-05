import CustomPopover from './CustomPopover';
import ExportIcon from '../../assets/icons/export.svg';
import CsvIcon from '../../assets/icons/csv.svg';
import PngIcon from '../../assets/icons/png.svg';
import PdfIcon from '../../assets/icons/pdf.svg';
import SidebarButton from './SideBarButton';
import { XStack, YStack } from 'tamagui';

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
          />
        </XStack>
      </YStack>
    </>
  );
};
