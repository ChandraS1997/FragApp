import { router } from 'expo-router';
import { ScrollView, Separator, XStack, YStack } from 'tamagui';
import AutoDetect from '../../assets/icons/autoDetect.svg';
import DataIcon from '../../assets/icons/data.svg';
import Graph from '../../assets/icons/graph.svg';
import HeatMapIcon from '../../assets/icons/heatMap.svg';
import MuckpileIcon from '../../assets/icons/muckpile.svg';
import Color from '../../components/common/Color';
import Edit from '../../components/common/Edit';
import Logic from '../../components/common/Logic';
import Scale from '../../components/common/Scale';
import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';

const SideToolbar = ({id, name, img_name, img_url, scaleSettings, setScaleSettings}) => {
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
          <Scale scaleSettings={scaleSettings} setScaleSettings={setScaleSettings} />
            <Separator />
          <Logic />
            <Separator />
          <Edit />
            <Separator />
          <Color />
            <Separator />
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
          <Separator />
          <SidebarButton
          icon={Graph}
          label="Graph"
          hoverColor="$primary"
          defaultColor="$primary"
          onPress={() => {
            router.push({
              pathname: '/graphView',
              params: {
                name: name,
                id: id,
                img_name: img_name,
                img_url: img_url
              }
            })
          }}
        />
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default SideToolbar;
