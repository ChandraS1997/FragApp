import { forwardRef } from 'react';
import { YStack, Text, Button } from 'tamagui';

const SidebarButton = forwardRef(({ icon, label, ...props }, ref) => {
  return (
    <YStack alignItems="center" gap={10}>
      <Button
        ref={ref}
        {...props}
        padding={10}
        borderRadius={4}
        borderWidth={1}
        color="$primary"
        borderColor="$borderColor"
        backgroundColor="$bg"
        hoverStyle={{ backgroundColor: '$hoverBackground' }}
        pressStyle={{ backgroundColor: '$hoverBackground' }}
      >
        {icon}
      </Button>
      <Text size={14} color="$textSecondary">
        {label}
      </Text>
    </YStack>
  );
});

export default SidebarButton;
