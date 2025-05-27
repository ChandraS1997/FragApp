import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import { Label, XStack, YStack } from 'tamagui';
import ColorIcon from '../../assets/icons/color.svg';

const Color = () => {
  return (
    <>
      <CustomPopover
        trigger={<SidebarButton icon={ColorIcon} label="Color" />}
        content={<ColorContent />}
      />
    </>
  );
};
export default Color;

const ColorContent = () => {
  return (
    <>
      <YStack gap={16} padding={16}>
        <XStack width={205} height={32} justifyContent="space-between">
          <Label color="$textSecondary" size={14}>
            Color ID 1
          </Label>
          <XStack width={100} height={32} borderRadius={4} backgroundColor="$textColor"></XStack>
        </XStack>
        <XStack width={205} height={32} justifyContent="space-between">
          <Label color="$textSecondary" size={14}>
            Color ID 2
          </Label>
          <XStack width={100} height={32} borderRadius={4} backgroundColor="$primary"></XStack>
        </XStack>
      </YStack>
    </>
  );
};
