import { Separator, XStack, YStack, ScrollView } from 'tamagui';
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
      alignItems="center"
      justifyContent="space-between"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        contentContainerStyle={{
          alignItems: 'center',
          width: '100%',
        }}
      >
        <YStack gap={10} width="100%" alignItems="center">
          <Scale />
          <Logic />
          <Edit />
          <Color />
          <CustomPopover
            trigger={<SidebarButton icon={DataIcon} label="Data" />}
            content={
              <XStack gap={16} padding={16}>
                <SidebarButton icon={HeatMapIcon} label="HeatMap" />
                <SidebarButton icon={MuckpileIcon} label="Muckpile" />
              </XStack>
            }
          />
          <Separator />
          <SidebarButton icon={AutoDetect} label="Auto Detect" />
        </YStack>
      </ScrollView>

      <YStack width="100%" alignItems="center" marginTop={16}>
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
