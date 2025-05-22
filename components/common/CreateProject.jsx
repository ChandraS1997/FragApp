import { Button, YStack } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { useState } from 'react';
import CreateProjectModal from './NewProject';

const CreateProject = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <YStack flex={1}>
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
        onPress={() => setModalOpen(true)}
      >
        Create Project
      </Button>
      <CreateProjectModal open={isModalOpen} onOpenChange={setModalOpen} />
    </YStack>

  );
};

export default CreateProject;
