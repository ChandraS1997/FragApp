import { XStack } from 'tamagui';
import SidebarButton from './SideBarButton';

import ZoomOutIcon from '../../assets/icons/zoomOut.svg';
import ZoomInIcon from '../../assets/icons/zoomIn.svg';
import ScanIcon from '../../assets/icons/scan.svg';
import CameraIcon from '../../assets/icons/camera.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import CustomPopover from './CustomPopover';
import EditImage from './EditImage';

const ViewControls = () => {
  return (
    <XStack gap={8} padding={8} background="transparent">
      <XStack gap={8} paddingRight={8} borderRightWidth={1} borderRightColor="$borderColor">
        <SidebarButton icon={ZoomOutIcon} />
        <SidebarButton icon={ZoomInIcon} />
        <SidebarButton icon={ScanIcon} />
      </XStack>
      <XStack gap={8}>
        <SidebarButton icon={CameraIcon} />
        <CustomPopover
          trigger={<SidebarButton icon={FilterIcon} />}
          content={({ onClose }) => <EditImage onClose={onClose} />}
        />
      </XStack>
    </XStack>
  );
};

export default ViewControls;
