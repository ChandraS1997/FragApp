import { useState } from 'react';
import { useRouter } from 'expo-router';
import Header from '../../components/common/Header';
import { XStack, Text, YStack, View } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import SideToolbar from '../../components/common/SideToolbar';
import ViewControls from '../../components/common/ViewControls';
import SidebarGraph from '../../components/common/SidebarGraph';

const WorkSpace = () => {
  const router = useRouter();
  const [sidebarMode, setSidebarMode] = useState('tools'); // 'tools' or 'graph'

  const handleBack = () => {
    router.push('/projectView');
  };

  return (
    <YStack f={1}>
      <Header
        title={
          <XStack alignItems="center" gap="$2">
            <ArrowLeft size={20} onPress={handleBack} style={{ cursor: 'pointer' }} />
            <Text color="$primary">My Project</Text>
            <Text>/ImageName</Text>
          </XStack>
        }
      />

      <XStack f={1}>
        {sidebarMode === 'tools' ? (
          <SideToolbar onSwitchSidebar={() => setSidebarMode('graph')} />
        ) : (
          <SidebarGraph onSwitchSidebar={() => setSidebarMode('tools')} />
        )}

        {/* 🔁 Main content area that changes with the sidebar mode */}
        <View
          f={1}
          position="relative"
          backgroundColor={sidebarMode === 'tools' ? 'black' : '#f4f4f4'}
          p="$4"
          justifyContent="center"
          alignItems="center"
        >
          {sidebarMode === 'tools' ? (
            <Text size={80} color="white">
              Tool View
            </Text>
          ) : (
            <Text size={80} color="$color">
              Graph View
            </Text>
          )}

          {sidebarMode === 'tools' && (
            <View position="absolute" bottom={20} right={20}>
              <ViewControls />
            </View>
          )}
        </View>
      </XStack>
    </YStack>
  );
};

export default WorkSpace;
