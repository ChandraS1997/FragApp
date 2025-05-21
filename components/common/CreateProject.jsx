import { Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';

const CreateProject = () => {
  return (
    <Button
      icon={<Plus />}
      backgroundColor="$primary"
      color="$bg"
      borderWidth={0}
      size="$5"
      borderRadius="$4"
      hoverStyle={{
        backgroundColor: '$primary',
        color: '$bg',
      }}
      pressStyle={{
        backgroundColor: '$primary',
        color: '$bg',
        opacity: 1,
      }}
    >
      Create Project
    </Button>
  );
};

export default CreateProject;
