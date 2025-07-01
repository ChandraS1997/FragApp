import { useEffect, useRef, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import ViewShot from "react-native-view-shot";
import { YStack } from "tamagui";

const ParametersChart = ({ rawData, setGraphUriArr }) => {
  const graphRef = useRef();
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  // Transform rawData (e.g. { D01: '3.84 mm' }) to chart-friendly format
  const sizeData = rawData.map((item) => {
    const key = Object.keys(item)[0]; // e.g., 'D01'
    const numericValue = parseFloat(item[key]); // extract 3.84 from '3.84 mm'
    return {
      value: numericValue,
      label: key.replace("D", "") + "%", // D01 → 1%
    };
  });

  const yValues = sizeData.map((d) => d.value);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  useEffect(() => {
    setTimeout(async () => {
      const uri = await graphRef.current.capture();
      if (!uri) {
        alert("Failed to capture graph. Please try again.");
        return;
      }
      setGraphUriArr((prev) => [...prev, uri]);
      console.log("Graph captured: ", uri);
    }, 1000);
  }, []);

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
        <ViewShot ref={graphRef} options={{ format: "png", quality: 0.9 }}>
          <LineChart
            data={sizeData}
            color1="rgba(0, 200, 100, 0.7)"
            thickness1={2}
            areaChart
            showGradient
            curved={true}
            isAnimated
            yAxisThickness={1}
            yAxisTextStyle={{ color: "gray" }}
            yAxisLabelWidth={60}
            yAxisMinValue={Math.floor(yMin * 0.9)}
            yAxisMaxValue={Math.ceil(yMax * 1.1)}
            spacing={80}
            initialSpacing={20}
            hideDataPoints
            adjustToWidth={false}
            width={layout.width - 80}
            height={layout.height - 80}
          />
        </ViewShot>
      )}
      {/* 
        <LineChart
            data={sizeData}
            areaChart
            curved
            showGradient
            startFillColor="rgba(0, 122, 255, 0.4)"
            endFillColor="rgba(0, 122, 255, 0.05)"
            color1="rgba(0, 122, 255, 1)"
            thickness1={2}
            yAxisThickness={1}
            yAxisTextStyle={{ color: 'gray' }}
            yAxisLabelWidth={60}
            yAxisMinValue={Math.floor(yMin * 0.9)}
            yAxisMaxValue={Math.ceil(yMax * 1.1)}
            spacing={40}
            initialSpacing={10}
            hideDataPoints
            adjustToWidth
            width={layout.width - 80}
            height={layout.height - 80}
            />

                
      */}
    </YStack>
  );
};

export default ParametersChart;
