import { useState } from 'react';
import { YStack } from 'tamagui';
import SidebarButton from './SideBarButton';
import GraphIcon from '../../assets/icons/graph.svg';
import Graph2Icon from '../../assets/icons/graph2.svg';
import ResultModal from './ResultModal';
import Export from './Export';
import Result from './Result';

const SidebarGraph = ({ onSwitchSidebar, selectedGraph, onSelectGraph }) => {
  // const [selectedGraph, setSelectedGraph] = useState('graph1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultValue, setResultValue] = useState('');

  const handleMetricPress = label => {
    setResultValue(label);
    setIsModalOpen(true);
  };

  return (
    <>
      <YStack
        width={84}
        backgroundColor="$bg"
        borderWidth={1}
        borderColor="$borderColor"
        padding={16}
        justifyContent="center"
        alignItems="center"
      >
        <YStack f={1} justifyContent="space-between">
          {/* Top Buttons */}
          <YStack gap={8}>
            <YStack gap={10} pb={16} borderBottomWidth={1} borderBottomColor="$borderColor">
              <SidebarButton
                icon={GraphIcon}
                label="Graph1"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
                isActive={selectedGraph === 'graph1'}
                onPress={() => onSelectGraph('graph1')}
              />
              <SidebarButton
                icon={Graph2Icon}
                label="Graph2"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
                isActive={selectedGraph === 'graph2'}
                onPress={() => onSelectGraph('graph2')}
              />
            </YStack>

            {/* Graph Metric Buttons (trigger modal) */}
            <YStack gap={10} pb={10} borderBottomWidth={1} borderBottomColor="$borderColor">
              <Result handleMetricPress={handleMetricPress} />
            </YStack>

            {/* Export Buttons */}
            <YStack gap={10}>
              <Export />
            </YStack>
          </YStack>

          {/* Bottom Button */}
          <YStack pt={16} borderTopWidth={1} borderTopColor="$borderColor">
            <SidebarButton
              icon={Graph2Icon}
              label="Analysis"
              hoverColor="$primary"
              defaultColor="$primary"
              onPress={onSwitchSidebar}
            />
          </YStack>
        </YStack>
      </YStack>

      {/* Modal */}
      <ResultModal open={isModalOpen} onOpenChange={setIsModalOpen} result={resultValue} />
    </>
  );
};

export default SidebarGraph;
