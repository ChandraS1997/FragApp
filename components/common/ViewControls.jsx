import { XStack } from 'tamagui';
import SidebarButton from './SideBarButton';

import ZoomOutIcon from '../../assets/icons/zoomOut.svg';
import ZoomInIcon from '../../assets/icons/zoomIn.svg';
import ScanIcon from '../../assets/icons/scan.svg';
import CameraIcon from '../../assets/icons/camera.svg';

const ViewControls = () => {
  return (
    <XStack gap={8} padding={8} background="transparent">
      <XStack gap={8} paddingRight={8} borderRightWidth={1} borderRightColor="$borderColor">
        <SidebarButton icon={ZoomOutIcon} />
        <SidebarButton icon={ZoomInIcon} />
        <SidebarButton icon={ScanIcon} />
      </XStack>
      <XStack>
        <SidebarButton icon={CameraIcon} />
      </XStack>
    </XStack>
  );
};

export default ViewControls;
