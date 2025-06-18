import { ArrowLeft } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View, XStack, YStack } from 'tamagui';
import Header from '../../components/common/Header';
import SideToolbar from '../../components/common/SideToolbar';
import ViewControls from '../../components/common/ViewControls';

const WorkSpace = () => {
  const router = useRouter();
  const { id, name, img_name, mode, img_url } = useLocalSearchParams();
  const [scaleSettings, setScaleSettings] = useState({
    Dual: false,
    ScaleLength: '10',
    ScaleFactor: '50',
    Unit: 'mm',
    Ignore: false,
    ScaleUpperLength: '',
    ScaleLowerLength: '',
  });
  console.log("scaleSettings", scaleSettings);
  const handleBack = () => {
    router.push({
      pathname: '/projectView',
      params: {
        name: name,
        id: id,
      }
    });
  };

  return (
    <YStack f={1}>
      <Header
        title={
          <XStack alignItems="center">
            <ArrowLeft size={20} onPress={handleBack} style={{ cursor: 'pointer' }} color="$bg" />
            <Text color="$bg" paddingLeft={10}>
              {name}
            </Text>
            <Text color="$bg">/{img_name}</Text>
          </XStack>
        }
      />
      <XStack f={1}>
          <SideToolbar id={id} name={name} img_name={img_name} img_url={img_url} scaleSettings={scaleSettings} setScaleSettings={setScaleSettings} />

          <View f={1} position="relative" justifyContent="center" alignItems="center">
             <Image
              source={{ uri: img_url }}
              style={{ width: "98%", height: "95%", borderRadius: 8 }}
              onError={(e) => console.warn('Image failed to load:', e.nativeEvent.error)}
              resizeMode="cover"
            />
        </View>
          <View position="absolute" bottom={20} right={20}>
              <ViewControls />
            </View>
      </XStack>
    </YStack>
  );
};

export default WorkSpace;
