import { Image, Separator, YStack } from 'tamagui';
import Scale from '../../components/common/Scale';
import Edit from '../../components/common/Edit';
import Logic from '../../components/common/Logic';
import Color from '../../components/common/Color';
import SidebarButton from './SideBarButton';
import graph from '../../assets/icons/graph.svg';
import autoDetect from '../../assets/icons/autoDetect.svg';

const SideToolbar = () => {
  return (
    <>
      <YStack
        width={85}
        height="93%"
        backgroundColor="$bg"
        padding={20}
        justifyContent="space-between"
      >
        <YStack gap={26}>
          <Scale />
          <Logic />
          <Edit />
          <Color />
          <Separator />

          <SidebarButton
            icon={<Image source={autoDetect} style={{ width: 24, height: 24 }} />}
            label="Auto Detect"
          />
        </YStack>
        <YStack>
          <SidebarButton
            icon={<Image source={graph} style={{ width: 24, height: 24 }} />}
            label="Graph"
          />
        </YStack>
      </YStack>
    </>
  );
};

export default SideToolbar;
