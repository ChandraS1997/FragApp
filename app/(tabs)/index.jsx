import { YStack } from 'tamagui';
import Header from '../../components/common/Header';
import ProjectActionBar from '../../components/common/ProjectActionBar';
import ProjectLists from '../../components/common/ProjectLists';
import { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState('');

  return (
    <YStack flex={1}>
      <Header title={'Project'} />
      <ProjectActionBar query={query} setQuery={setQuery} />
      <ProjectLists query={query} />
    </YStack>
  );
};

export default Home;
