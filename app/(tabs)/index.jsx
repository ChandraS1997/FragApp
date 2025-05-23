import { YStack } from 'tamagui';
import Header from '../../components/common/Header';
import ProjectActionBar from '../../components/common/ProjectActionBar';
import ProjectLists from '../../components/common/ProjectLists';
import ProjectImageView from '../../components/common/ProjectImageView';
import { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('list');

  return (
    <YStack flex={1}>
      <Header title={'Project'} />
      <ProjectActionBar query={query} setQuery={setQuery} viewMode={viewMode} setViewMode={setViewMode} />
      {viewMode === 'list' && <ProjectLists query={query} />}
      {viewMode === 'grid' && <ProjectImageView query={query} />} 
    </YStack>
  );
};

export default Home;
