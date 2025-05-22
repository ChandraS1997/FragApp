import { Image, Label, XStack, YStack } from 'tamagui';
import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import SwitchWithLabel from './SwitchWithLabel';
import CustomMenu from './CustomMenu';
import ruler from '../../assets/icons/ruler.svg';

const Scale = () => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={<Image source={ruler} style={{ width: 24, height: 24 }} />}
            label="Scale"
          />
        }
        content={<ScalingContent />}
      />
    </>
  );
};
export default Scale;

const ScalingContent = () => {
  return (
    <>
      <YStack gap={8} padding={1} width={288}>
        <XStack justifyContent="space-between">
          <SwitchWithLabel label="Dual" size="$2" defaultChecked={false} />
          <SwitchWithLabel label="Ignore" size="$2" defaultChecked={false} />
        </XStack>
        <XStack justifyContent="space-between">
          <Label size={14} color="$textSecondary">
            Scale Length
          </Label>
          <XStack width={114}>
            <CustomMenu label="2" items={['1x', '2x', '3x']} />
          </XStack>
        </XStack>
        <XStack justifyContent="space-between">
          <Label size={14} color="$textSecondary">
            Scale Factor
          </Label>
          <XStack width={114}>
            <CustomMenu label="2" items={['1x', '2x', '3x']} />
          </XStack>
        </XStack>
      </YStack>
    </>
  );
};
