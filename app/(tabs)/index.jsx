import { YStack } from 'tamagui';
import Header from '../../components/common/Header';
import ProjectActionBar from '../../components/common/ProjectActionBar';
import ProjectLists from '../../components/common/ProjectLists';

const Home = () => {
  return (
    <YStack flex={1}>
      <Header title={'Project'} />
      <ProjectActionBar />
      <ProjectLists />
    </YStack>
  );
};

export default Home;
