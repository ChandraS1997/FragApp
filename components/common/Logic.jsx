import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import { Image, Label, YStack } from 'tamagui';
import SwitchWithLabel from './SwitchWithLabel';
import CustomMenu from './CustomMenu';
import logic from '../../assets/icons/logic.svg';

const Logic = () => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={<Image source={logic} style={{ width: 24, height: 24 }} />}
            label="Logic"
          />
        }
        content={<LogicContent />}
      />
    </>
  );
};
export default Logic;

const LogicContent = () => {
  return (
    <>
      <YStack width={288} justifyContent="space-between">
        <SwitchWithLabel label="Advance" size="$2" defaultChecked={false} />
        <YStack justifyContent="space-between">
          <Label size={14} color="$textSecondary">
            Algorithms
          </Label>
          <CustomMenu label="Image Detection by FragAnalysis 4.0" items={['1x', '2x', '3x']} />
        </YStack>
      </YStack>
    </>
  );
};
