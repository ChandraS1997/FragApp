import { useRouter } from 'expo-router';
import Header from '../../components/common/Header';
import { XStack, Text } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import SideToolbar from '../../components/common/SideToolbar';

const WorkSpace = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/projectView');
  };
  return (
    <>
      <Header
        title={
          <XStack alignItems="center">
            <ArrowLeft size={20} onPress={handleBack} style={{ cursor: 'pointer' }} />
            <Text color="$primary">My Project</Text>
            <Text>/ImageName</Text>
          </XStack>
        }
      />
      <SideToolbar />
    </>
  );
};

export default WorkSpace;
