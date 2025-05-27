import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import { Check } from '@tamagui/lucide-icons';
import { XStack, YStack } from 'tamagui';
import { AlertTriangle, Scale3d, ZapOff, MoveRight } from '@tamagui/lucide-icons';

const Result = ({ handleMetricPress }) => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={Check}
            label="Result"
            hoverColor="$primary"
            defaultColor="$primary"
          />
        }
        content={<ResultContent handleMetricPress={handleMetricPress} />}
      />
    </>
  );
};
export default Result;

const ResultContent = ({ handleMetricPress }) => {
  return (
    <>
      <YStack gap={8} width={60} padding={16}>
        <YStack gap={8}>
          <SidebarButton
            icon={MoveRight}
            label="Throw"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('13 m')}
          />
          <SidebarButton
            icon={ZapOff}
            label="Back Break"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('2 m')}
          />
          <SidebarButton
            icon={Scale3d}
            label="Powder Factor"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('1.6 m³/ton')}
          />
          <SidebarButton
            icon={AlertTriangle}
            label="Fly Rock"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('30 m')}
          />
        </YStack>
      </YStack>
    </>
  );
};
