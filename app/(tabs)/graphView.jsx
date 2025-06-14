import { ArrowLeft } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, XStack, YStack } from 'tamagui';
import Header from '../../components/common/Header';
import ParamsTable from '../../components/common/ParamsTable';
import SidebarGraph from '../../components/common/SidebarGraph';
import SizeInfoTable from '../../components/common/SizeInfoTable';

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
                        <YStack f={1} bc="$background" jc="center" ai="center" borderRadius={8}>
                            <Text fontSize={24} color="$gray10">
                                Graph
                            </Text>
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