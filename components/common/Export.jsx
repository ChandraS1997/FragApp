import CustomPopover from './CustomPopover';
import { Upload } from '@tamagui/lucide-icons';
import CsvIcon from '../../assets/icons/csv.svg';
import PngIcon from '../../assets/icons/png.svg';
import PdfIcon from '../../assets/icons/pdf.svg';
import SidebarButton from './SideBarButton';
import { XStack, YStack } from 'tamagui';
import IconTool from './IconTool';

const Export = () => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={Upload}
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
          <IconTool svgIcon={CsvIcon} label="Export CSV" />
          <IconTool svgIcon={PngIcon} label="Export PNG" />
          <IconTool svgIcon={PdfIcon} label="Export PDF" />
        </XStack>
      </YStack>
    </>
  );
};
