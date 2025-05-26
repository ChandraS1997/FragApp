import SidebarButton from './SideBarButton';
import { YStack } from 'tamagui';
import GraphIcon from '../../assets/icons/graph.svg';
import Graph2Icon from '../../assets/icons/graph2.svg';
import CsvIcon from '../../assets/icons/csv.svg';
import PngIcon from '../../assets/icons/png.svg';
import PdfIcon from '../../assets/icons/pdf.svg';

import { useState } from 'react';

const SidebarGraph = ({ onSwitchSidebar }) => {
  const [selectedGraph, setSelectedGraph] = useState('graph1');

  return (
    <YStack
      justifyContent="space-between"
      padding={16}
      backgroundColor="$bg"
      borderWidth={1}
      borderColor="$borderColor"
      width={84}
    >
      <YStack gap={24}>
        <YStack gap={10} paddingBottom={16} borderBottomWidth={1} borderBottomColor="$borderColor">
          <SidebarButton
            icon={GraphIcon}
            label="Graph1"
            hoverColor="$primary"
            defaultColor="$primary"
            isActive={selectedGraph === 'graph1'}
            onPress={() => setSelectedGraph('graph1')}
          />
          <SidebarButton
            icon={Graph2Icon}
            label="Graph2"
            hoverColor="$primary"
            defaultColor="$primary"
            isActive={selectedGraph === 'graph2'}
            onPress={() => setSelectedGraph('graph2')}
          />
        </YStack>
        <YStack gap={16}>
          <SidebarButton icon={CsvIcon} label="Export CSV" />
          <SidebarButton icon={PngIcon} label="Export PNG" />
          <SidebarButton icon={PdfIcon} label="Export PDF" />
        </YStack>
      </YStack>
      <YStack paddingTop={16} borderTopWidth={1} borderTopColor="$borderColor">
        <SidebarButton
          icon={Graph2Icon}
          label="Analysis"
          hoverColor="$primary"
          defaultColor="$primary"
          onPress={onSwitchSidebar}
        />
      </YStack>
    </YStack>
  );
};

export default SidebarGraph;
