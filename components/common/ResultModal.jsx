import { Dialog, YStack, Text, Button } from 'tamagui';

const ResultModal = ({ open, onOpenChange, result }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          elevate
          bordered
          padding="$4"
          width={300}
          borderRadius="$4"
          backgroundColor="$background"
        >
          <YStack space="$3" alignItems="center">
            <Text fontSize={20} fontWeight="600" color="$primary">
              Result
            </Text>
            <Text fontSize={18} color="$color">
              {result}
            </Text>
            <Button size="$3" onPress={() => onOpenChange(false)}>
              Close
            </Button>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ResultModal;
