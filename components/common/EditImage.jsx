import { Text, XStack, YStack } from 'tamagui';
import { LabeledSlider } from './EditParameters';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { DualButton } from './DualButton';
import SwitchWithLabel from './SwitchWithLabel';

const EditImage = ({ onClose }) => {
  const handleCancel = () => {
    onClose();
  };

  const handleApply = () => {
    // Logic to apply changes
    onClose();
  };
  return (
    <YStack
      width={320}
      padding={16}
      backgroundColor="$bg"
      borderRadius={8}
      shadowColor="black"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.2}
      shadowRadius={4}
      $platform-web={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <XStack
        alignItems="center"
        paddingBottom={16}
        borderBottomWidth={1}
        borderColor="$borderColor"
        gap={8}
      >
        <ArrowLeft size={20} onPress={onClose} style={{ cursor: 'pointer' }} />
        <Text color="$textColor">Edit Image</Text>
      </XStack>
      <YStack borderBottomWidth={1} borderBottomColor="$borderColor" paddingVertical={16} gap={16}>
        <XStack justifyContent="space-between" alignItems="center">
          <SwitchWithLabel label="Noise" size="$2" defaultChecked={true} />
          <SwitchWithLabel label="Grayscale" size="$2" defaultChecked={false} />
        </XStack>
        <LabeledSlider label="Brightness" defaultValue={2.3} />
        <LabeledSlider label="Contrast" defaultValue={2.3} />
      </YStack>
      <YStack paddingTop={16}>
        <DualButton onCancel={handleCancel} onApply={handleApply} />
      </YStack>
    </YStack>
  );
};

export default EditImage;
