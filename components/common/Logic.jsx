import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import { Label, YStack } from 'tamagui';
import { Slider } from 'react-native-elements';
import SwitchWithLabel from './SwitchWithLabel';
import CustomMenu from './CustomMenu';
import LogicIcon from '../../assets/icons/logic.svg';
import { useState } from 'react';

const Logic = () => {
  return (
    <>
      <CustomPopover
        trigger={<SidebarButton icon={LogicIcon} label="Logic" />}
        content={<LogicContent />}
      />
    </>
  );
};
export default Logic;

const LogicContent = () => {
  const [value, setValue] = useState(50);
  return (
    <>
      <YStack width={288} gap={8}>
        <SwitchWithLabel label="Advance" size="$2" defaultChecked={false} />
        <YStack justifyContent="space-between">
          <Label size={14} color="$textSecondary">
            Algorithms
          </Label>
          <CustomMenu label="Image Detection by FragAnalysis 4.0" items={['1x', '2x', '3x']} />
        </YStack>
        <YStack gap={8}>
          <Label size={14} color="$textSecondary">
            Particle Size
          </Label>
          <Slider
            value={value}
            onValueChange={setValue}
            minimumValue={0}
            maximumValue={100}
            step={1}
            style={{ height: 6 }}
            minimumTrackTintColor="#267EF9"
            maximumTrackTintColor="#F5F5F5"
            thumbTintColor="#267EF9"
            thumbStyle={{ height: 20, width: 20 }}
            trackStyle={{ height: 6, borderRadius: 3 }}
          />
        </YStack>
      </YStack>
    </>
  );
};
