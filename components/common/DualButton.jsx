import { Button, XStack } from 'tamagui';

export const DualButton = ({ onCancel, onApply }) => {
  return (
    <XStack width="100%" gap="$4">
      {/* Cancel Button */}
      <Button
        flex={1}
        backgroundColor="$bg"
        color="$textSecondary"
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
