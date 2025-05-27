import { Separator, XStack, YStack } from 'tamagui';
import Scale from '../../components/common/Scale';
import Edit from '../../components/common/Edit';
import Logic from '../../components/common/Logic';
import Color from '../../components/common/Color';
import SidebarButton from './SideBarButton';
import Graph from '../../assets/icons/graph.svg';
import AutoDetect from '../../assets/icons/autoDetect.svg';
import CustomPopover from './CustomPopover';
import DataIcon from '../../assets/icons/data.svg';
import HeatMapIcon from '../../assets/icons/heatMap.svg';
import MuckpileIcon from '../../assets/icons/muckpile.svg';

const SideToolbar = ({ onSwitchSidebar }) => {
  return (
    <YStack
      width={85}
      backgroundColor="$bg"
      padding={20}
      justifyContent="space-between"
      alignItems="center"
    >
      <YStack gap={10}>
        <Scale />
        <Logic />
        <Edit />
        <Color />
        <CustomPopover
          trigger={<SidebarButton icon={DataIcon} label="Data" />}
          content={
            <>
              <XStack gap={16} padding={16}>
                <SidebarButton icon={HeatMapIcon} label="HeatMap" />
                <SidebarButton icon={MuckpileIcon} label="Muckpile" />
              </XStack>
            </>
          }
        />
        <Separator />
        <SidebarButton icon={AutoDetect} label="Auto Detect" />
      </YStack>
      <YStack>
        <SidebarButton
          icon={Graph}
          label="Graph"
          hoverColor="$primary"
          defaultColor="$primary"
          onPress={onSwitchSidebar}
        />
      </YStack>
    </YStack>
  );
};

export default SideToolbar;
