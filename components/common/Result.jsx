import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import { XStack, YStack } from 'tamagui';
import ReportIcon from '../../assets/icons/reports.svg';

const Result = ({ handleMetricPress }) => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={ReportIcon}
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
      <YStack gap={8} padding={16}>
        <XStack gap={8}>
          <SidebarButton
            icon={ReportIcon}
            label="Throw"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('13 m')}
          />
          <SidebarButton
            icon={ReportIcon}
            label="Back Break"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('2 m')}
          />
          <SidebarButton
            icon={ReportIcon}
            label="Powder Factor"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('1.6 m³/ton')}
          />
          <SidebarButton
            icon={ReportIcon}
            label="Fly Rock"
            hoverColor="$primary"
            defaultColor="$primary"
            onPress={() => handleMetricPress('30 m')}
          />
        </XStack>
      </YStack>
    </>
  );
};
