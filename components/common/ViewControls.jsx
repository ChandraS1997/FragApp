import { XStack, TooltipGroup, Tooltip, Paragraph } from 'tamagui';
import { Platform } from 'react-native';

import SidebarButton from './SideBarButton';

import ZoomOutIcon from '../../assets/icons/zoomOut.svg';
import ZoomInIcon from '../../assets/icons/zoomIn.svg';
import ScanIcon from '../../assets/icons/scan.svg';
import CameraIcon from '../../assets/icons/camera.svg';
import LogicIcon from '../../assets/icons/logic.svg';

import CustomPopover from './CustomPopover';
import EditImage from './EditImage';

const ViewControls = () => {
  const isWeb = Platform.OS === 'web';

  if (!isWeb) {
    return (
      <XStack gap={8} padding={8} background="transparent">
        <XStack paddingRight={8} borderRightWidth={1} borderRightColor="$borderColor">
          <CustomPopover
            trigger={<SidebarButton icon={LogicIcon} defaultColor="$primary" />}
            content={({ onClose }) => <EditImage onClose={onClose} />}
          />
        </XStack>

        <XStack gap={8} paddingRight={8} borderRightWidth={1} borderRightColor="$borderColor">
          <SidebarButton icon={ZoomOutIcon} defaultColor="$primary" />
          <SidebarButton icon={ZoomInIcon} defaultColor="$primary" />
          <SidebarButton icon={ScanIcon} defaultColor="$primary" />
        </XStack>

        <XStack gap={8}>
          <SidebarButton icon={CameraIcon} defaultColor="$primary" />
        </XStack>
      </XStack>
    );
  }

  return (
    <TooltipGroup delay={0}>
      <XStack gap={8} padding={8} background="transparent">
        <Tooltip placement="bottom" delay={0}>
          <Tooltip.Trigger asChild>
            <XStack paddingRight={8} borderRightWidth={1} borderRightColor="$borderColor">
              <CustomPopover
                trigger={<SidebarButton icon={LogicIcon} />}
                content={({ onClose }) => <EditImage onClose={onClose} />}
              />
            </XStack>
          </Tooltip.Trigger>
          <Tooltip.Content
            enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            scale={1}
            x={0}
            y={0}
            opacity={1}
            py="$2"
            backgroundColor="$bg"
            delay={0}
          >
            <Tooltip.Arrow size={10} backgroundColor="$bg" />
            <Paragraph size="$2" color="$textColor">
              Enhance Image
            </Paragraph>
          </Tooltip.Content>
        </Tooltip>

        <XStack gap={8} paddingRight={8} borderRightWidth={1} borderRightColor="$borderColor">
          <SidebarButtonWithTooltip icon={ZoomOutIcon} label="Zoom Out" />
          <SidebarButtonWithTooltip icon={ZoomInIcon} label="Zoom In" />
          <SidebarButtonWithTooltip icon={ScanIcon} label="Reset Zoom" />
        </XStack>

        <XStack gap={8}>
          <SidebarButtonWithTooltip icon={CameraIcon} label="Snapshot" />
        </XStack>
      </XStack>
    </TooltipGroup>
  );
};

export default ViewControls;

const SidebarButtonWithTooltip = ({ icon, label, ...props }) => {
  return (
    <Tooltip placement="bottom" delay={0}>
      <Tooltip.Trigger asChild>
        <SidebarButton icon={icon} {...props} />
      </Tooltip.Trigger>
      <Tooltip.Content
        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
        scale={1}
        x={0}
        y={0}
        opacity={1}
        py="$2"
        backgroundColor="$bg"
        delay={0}
      >
        <Tooltip.Arrow size={10} backgroundColor="$bg" />
        <Paragraph size="$2" color="$textColor">
          {label}
        </Paragraph>
      </Tooltip.Content>
    </Tooltip>
  );
};
