import { XStack, YStack } from 'tamagui';
import FilterProjects from './FilterProjects';
import ListGridBtn from './ListGridBtn';
import SearchBar from './Search';
import CreateProject from './CreateProject';

const ProjectActionBar = ({query,setQuery,viewMode,setViewMode}) => {
  return (
    <XStack margin="$4" justifyContent="space-between">
      <XStack gap="$4">
        <SearchBar query={query} setQuery={setQuery} />
        <FilterProjects />
        <ListGridBtn viewMode={viewMode} setViewMode={setViewMode} />
      </XStack>
      <YStack>
        <CreateProject />
      </YStack>
    </XStack>
  );
};

export default ProjectActionBar;
