import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import { Label, YStack } from 'tamagui';
import SliderNative from '@react-native-community/slider';
import SwitchWithLabel from './SwitchWithLabel';
import CustomMenu from './CustomMenu';
import LogicIcon from '../../assets/icons/logic.svg';
import { useState } from 'react';
import { Platform } from 'react-native';
import { WebSlider } from './EditParameters';

const Logic = () => {
  return (
    <>
      <CustomPopover
        trigger={<SidebarButton icon={LogicIcon} label="Logic" defaultColor="$primary" />}
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
      <YStack width={288} gap={8} padding={16}>
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
          {Platform.OS === 'web' ? (
            <WebSlider value={value} onValueChange={setValue} />
          ) : (
            <SliderNative
              value={value}
              onValueChange={setValue}
              minimumValue={0}
              maximumValue={5}
              step={0.1}
              style={{ width: '100%', height: 24 }}
              minimumTrackTintColor="#007bff"
              maximumTrackTintColor="#E5E5E5"
              thumbTintColor="#007bff"
            />
          )}
        </YStack>
      </YStack>
    </>
  );
};
