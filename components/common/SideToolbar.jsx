import { Separator, YStack } from 'tamagui';
import Scale from '../../components/common/Scale';
import Edit from '../../components/common/Edit';
import Logic from '../../components/common/Logic';
import Color from '../../components/common/Color';
import SidebarButton from './SideBarButton';
import Graph from '../../assets/icons/graph.svg';
import AutoDetect from '../../assets/icons/autoDetect.svg';
import { Grid, Package } from '@tamagui/lucide-icons';

const SideToolbar = ({ onSwitchSidebar }) => {
  return (
    <YStack width={85} backgroundColor="$bg" padding={20} justifyContent="space-between">
      <YStack gap={10}>
        <Scale />
        <Logic />
        <Edit />
        <Color />
        <SidebarButton icon={Grid} label="Heatmaps" hoverColor="$primary" defaultColor="$primary" />
        <SidebarButton
          icon={Package}
          label="Muckpile"
          hoverColor="$primary"
          defaultColor="$primary"
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
