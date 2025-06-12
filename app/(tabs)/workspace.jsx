import { ArrowLeft } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View, XStack, YStack } from 'tamagui';
import DataTable from '../../components/common/DataTable';
import Header from '../../components/common/Header';
import ParamsTable from '../../components/common/ParamsTable';
import SidebarGraph from '../../components/common/SidebarGraph';
import SideToolbar from '../../components/common/SideToolbar';
import SizeInfoTable from '../../components/common/SizeInfoTable';
import ViewControls from '../../components/common/ViewControls';

const data = [
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
  {
    size: 1000.0,
    passing: '100.0%',
  },
];

const WorkSpace = () => {
  const router = useRouter();
  const { id, img_name, mode, img_url } = useLocalSearchParams();
  const [sidebarMode, setSidebarMode] = useState('tools'); // 'tools' or 'graph'
  const [selectedGraph, setSelectedGraph] = useState('graph1');
  const handleBack = () => {
    router.push({
      pathname: '/projectView',
      params: {
        name: id,
      }
    });
  };

  useEffect(() => {
    if (mode === 'graph') {
      setSidebarMode('graph');
    }
  }, [mode]);

  return (
    <YStack f={1}>
      <Header
        title={
          <XStack alignItems="center">
            <ArrowLeft size={20} onPress={handleBack} style={{ cursor: 'pointer' }} color="$bg" />
            <Text color="$bg" paddingLeft={10}>
              {id}
            </Text>
            <Text color="$bg">/{img_name}</Text>
          </XStack>
        }
      />

      <XStack f={1}>
        {sidebarMode === 'tools' ? (
          <SideToolbar onSwitchSidebar={() => setSidebarMode('graph')} />
        ) : (
          <SidebarGraph
            selectedGraph={selectedGraph}
            onSelectGraph={setSelectedGraph}
            onSwitchSidebar={() => setSidebarMode('tools')}
          />
        )}

        <View f={1} position="relative" justifyContent="center" alignItems="center">
          {sidebarMode === 'tools' ? (
            <Image
              source={{ uri: img_url }}
              style={{ width: "98%", height: "95%", borderRadius: 8 }}
              onError={(e) => console.warn('Image failed to load:', e.nativeEvent.error)}
              resizeMode="cover"
            />
          ) : (
            <XStack f={1} width="100%" height="100%">
              {/* Graph placeholder */}
              <YStack f={1} bc="$background" jc="center" ai="center" borderRadius={8}>
                <Text fontSize={24} color="$gray10">
                  Graph
                </Text>
                <View position="absolute" top={0} right={0} zIndex={10}>
                  {selectedGraph === 'graph1' ? (
                    <>
                      <ParamsTable />
                    </>
                  ) : (
                    <>
                      <YStack
                        width={260}
                        borderRadius={8}
                        gap={16}
                        padding={16}
                        backgroundColor="$background"
                        borderWidth={1}
                        borderColor="$borderColor"
                      >
                        <DataTable
                          title="Blast Parameters"
                          data={[
                            { Height: '15.00 mm' },
                            { Burden: '8452 kg' },
                            { 'Rock Factor': 10.23 },
                            { accuracy: 45.0 },
                            { Strength: '15.00' },
                            { Density: 710.25 },
                          ]}
                        />
                      </YStack>
                    </>
                  )}
                </View>
              </YStack>

              {/* Info table */}
              <YStack
                padding={16}
                backgroundColor="$background"
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius={8}
                overflow="hidden"
              >
                <SizeInfoTable data={data} />
              </YStack>
            </XStack>
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
