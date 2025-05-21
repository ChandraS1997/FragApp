import { YStack } from 'tamagui';
import Header from '../../components/common/Header';
import ProjectActionBar from '../../components/common/ProjectActionBar';

const Home = () => {
  return (
    <YStack flex={1}>
      <Header title={'Project'} />
      <ProjectActionBar />
    </YStack>
  );
};

export default Home;
