import { useRouter } from 'expo-router';
import Header from '../../components/common/Header';
import { XStack, Text, YStack, View } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import SideToolbar from '../../components/common/SideToolbar';
import ViewControls from '../../components/common/ViewControls';

const WorkSpace = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/projectView');
  };

  return (
    <YStack f={1}>
      {/* Header */}
      <Header
        title={
          <XStack alignItems="center" gap="$2">
            <ArrowLeft size={20} onPress={handleBack} style={{ cursor: 'pointer' }} />
            <Text color="$primary">My Project</Text>
            <Text>/ImageName</Text>
          </XStack>
        }
      />

      {/* Main layout: sidebar + blank area */}
      <XStack f={1}>
        {/* Sidebar */}
        <SideToolbar width={200} />

        {/* Blank content area */}
        <View
          f={1}
          position="relative"
          backgroundColor="black"
          p="$4"
          justifyContent="center"
          alignItems="center"
        >
          <Text size={80} color="white">
            Image Area
          </Text>

          {/* Floating component in bottom-right corner */}
          <View
            position="absolute"
            bottom={20}
            right={20}
            justifyContent="center"
            alignItems="center"
          >
            <ViewControls />
          </View>
        </View>
      </XStack>
    </YStack>
  );
};

export default WorkSpace;
