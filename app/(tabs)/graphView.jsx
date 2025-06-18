import { ArrowLeft } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, XStack, YStack } from 'tamagui';
import NewChart from '../../components/common/Charts/newChart';
import Header from '../../components/common/Header';
import ParamsTable from '../../components/common/ParamsTable';
import SidebarGraph from '../../components/common/SidebarGraph';
import SizeInfoTable from '../../components/common/SizeInfoTable';
const data = [
  { size: 950.0, passing: '90.0%' },
  { size: 870.0, passing: '85.0%' },
  { size: 810.0, passing: '80.0%' },
  { size: 760.0, passing: '75.0%' },
  { size: 700.0, passing: '70.0%' },
  { size: 640.0, passing: '65.0%' },
  { size: 580.0, passing: '60.0%' },
  { size: 510.0, passing: '55.0%' },
  { size: 440.0, passing: '50.0%' },
  { size: 370.0, passing: '45.0%' },
  { size: 300.0, passing: '40.0%' },
  { size: 230.0, passing: '35.0%' },
  { size: 170.0, passing: '30.0%' },
  { size: 120.0, passing: '25.0%' },
  { size: 80.0, passing: '20.0%' },
  { size: 50.0, passing: '15.0%' },
  { size: 30.0, passing: '10.0%' },
  { size: 20.0, passing: '5.0%' },
];

const graphView = () => {
    const { id, name, img_name, img_url } = useLocalSearchParams();
    const router = useRouter();
    const handleBack = () => {
        router.push({
            pathname: '/workspace',
            params: {
                name: name,
                id: id,
                img_name: img_name,
                img_url: img_url
            }
        });
    };
    return (
 
        <YStack f={1}>
            <Header
                title={
                    <XStack alignItems="center">
                        <ArrowLeft size={20} onPress={handleBack} style={{ cursor: 'pointer' }} color="$bg" />
                        <Text color="$bg">{img_name}</Text>
                    </XStack>
                }
            />
            <XStack f={1}>
                <SidebarGraph />
                <View f={1} position="relative" justifyContent="center" alignItems="center">
                    <XStack f={1} width="100%" height="100%">
                        <YStack f={1} bc="$background" jc="center" ai="center" borderRadius={8}
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                console.log('Chart container size:', width, height);
                            }}>
                            {/*<Text fontSize={24} color="$gray10">
                                Graph
                            </Text>*/}
                            <NewChart rawData={data} />
                            <View position="absolute" top={0} right={0} zIndex={10}>
                                <ParamsTable />
                            </View>
                        </YStack>
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
                </View>
            </XStack>
        </YStack>
 
    )
 
}
 
export default graphView;