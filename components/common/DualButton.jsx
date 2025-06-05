import { Button, XStack } from 'tamagui';

export const DualButton = ({ onCancel, onApply }) => {
  return (
    <XStack width="100%" gap={8}>
      {/* Cancel Button */}
      <Button
        flex={1}
        backgroundColor="$bg"
        color="$textSecondary"
        borderRadius={8}
        borderWidth={0}
        hoverStyle={{
          backgroundColor: '$hoverBackground',
          color: '$primary',
        }}
        pressStyle={{
          backgroundColor: '$hoverBackground',
          color: '$primary',
          opacity: 1,
        }}
        onPress={onCancel}
      >
        Cancel
      </Button>

      {/* Apply Button */}
      <Button
        flex={1}
        backgroundColor="$primary"
        borderRadius={8}
        color="$bg"
        borderWidth={0}
        hoverStyle={{
          backgroundColor: '$primary',
        }}
        pressStyle={{
          backgroundColor: '$primary',
        }}
        onPress={onApply}
      >
        Apply
      </Button>
    </XStack>
  );
};
