import { useState } from 'react';
import { ScrollView, YStack } from 'tamagui';
import GraphIcon from '../../assets/icons/graph.svg';
import Graph2Icon from '../../assets/icons/graph2.svg';
import Export from './Export';
import Result from './Result';
import ResultModal from './ResultModal';
import SidebarButton from './SideBarButton';

const SidebarGraph = () => {
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
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        {/* Scrollable Section */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <YStack width="100%" gap={8}>
            {/* Top Graph Buttons */}
            <YStack
              width="100%"
              gap={10}
              paddingBottom={16}
              borderBottomWidth={1}
              borderBottomColor="$borderColor"
            >
              <SidebarButton
                icon={GraphIcon}
                label="Graph1"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
              />
              <SidebarButton
                icon={Graph2Icon}
                label="Graph2"
                size={12}
                hoverColor="$primary"
                defaultColor="$primary"
              />
            </YStack>

            {/* Result (Metric) Buttons */}
            <YStack
              width="100%"
              gap={10}
              paddingBottom={10}
              borderBottomWidth={1}
              borderBottomColor="$borderColor"
            >
              <Result handleMetricPress={handleMetricPress} />
            </YStack>

            {/* Export Buttons */}
            <YStack width="100%" gap={10}>
              <Export />
            </YStack>
          </YStack>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <YStack
          width="100%"
          paddingTop={16}
          borderTopWidth={1}
          borderTopColor="$borderColor"
          alignItems="center"
        >
          <SidebarButton
            icon={Graph2Icon}
            label="Analysis"
            hoverColor="$primary"
            defaultColor="$primary"
          />
        </YStack>
      </YStack>

      {/* Modal */}
      <ResultModal open={isModalOpen} onOpenChange={setIsModalOpen} result={resultValue} />
    </>
  );
};

export default SidebarGraph;
