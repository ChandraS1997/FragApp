import { useRouter } from 'expo-router';
import { XStack, Text } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import Header from '../../components/common/Header';

const ProjectView = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <Header
        title={
          <XStack alignItems="center" space="$2">
            <ArrowLeft size={20} color="black" onPress={handleBack} style={{ cursor: 'pointer' }} />
            <Text>My Project</Text>
          </XStack>
        }
      />
    </>
  );
};

export default ProjectView;
