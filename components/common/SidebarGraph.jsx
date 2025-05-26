import { useState } from 'react';
import { YStack } from 'tamagui';
import SidebarButton from './SideBarButton';
import GraphIcon from '../../assets/icons/graph.svg';
import Graph2Icon from '../../assets/icons/graph2.svg';
import CsvIcon from '../../assets/icons/csv.svg';
import PngIcon from '../../assets/icons/png.svg';
import PdfIcon from '../../assets/icons/pdf.svg';
import ResultModal from './ResultModal';

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
              <SidebarButton
                icon={Graph2Icon}
                label="Throw"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
                onPress={() => handleMetricPress('13 m')}
              />
              <SidebarButton
                icon={Graph2Icon}
                label="Back Break"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
                onPress={() => handleMetricPress('2 m')}
              />
              <SidebarButton
                icon={Graph2Icon}
                label="Powder Factor"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
                onPress={() => handleMetricPress('1.6 m³/ton')}
              />
              <SidebarButton
                icon={Graph2Icon}
                label="Fly Rock"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
                onPress={() => handleMetricPress('30 m')}
              />
            </YStack>

            {/* Export Buttons */}
            <YStack gap={10}>
              <SidebarButton icon={CsvIcon} label="Export CSV" size={12} />
              <SidebarButton icon={PngIcon} label="Export PNG" size={12} />
              <SidebarButton icon={PdfIcon} label="Export PDF" size={12} />
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
