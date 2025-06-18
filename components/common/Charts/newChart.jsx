import { useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { YStack } from 'tamagui';

const NewChart = ({rawData}) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const sizeValues = rawData.map((item) => item.size);
  const passingValues = rawData.map((item) =>
    parseFloat(item.passing.replace('%', '')) * 10
  );

  const allValues = [...sizeValues, ...passingValues];
  const yMin = Math.min(...allValues);
  const yMax = Math.max(...allValues);

  const sizeData = rawData.map((item, index) => ({
    value: item.size,
    label: `${index + 1}`,
  }));

  const passingData = rawData.map((item, index) => ({
    value: parseFloat(item.passing.replace('%', '')) * 10,
    label: `${index + 1}`,
  }));

  return (
    <YStack
      f={1}
      width="100%"
      height="100%"
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
      }}
      justifyContent="center"
      alignItems="center"
    >
      {layout.width > 0 && layout.height > 0 && (
        <LineChart
          data={sizeData}
          data2={passingData}
          color1="red"
          color2="blue"
          thickness1={2}
          thickness2={2}
          yAxisThickness={1}
          yAxisTextStyle={{ color: 'gray' }}
          yAxisLabelWidth={40}
          xAxisMin
          yAxisMinValue={Math.floor(yMin * 0.9)} // padding bottom
          yAxisMaxValue={Math.ceil(yMax * 1.1)}  // padding top
          showLine
          showXAxis
          showYAxis
          spacing={28} // auto spacing
          initialSpacing={10}
          hideDataPoints
          curved={false}
          adjustToWidth
          width={layout.width - 80}
          height={layout.height - 80}
        />
      )}
    </YStack>
  );
};

export default NewChart;
