import { forwardRef, useState } from 'react';
import { YStack, Text, Button } from 'tamagui';

const SidebarButton = forwardRef(({ icon: Icon, label, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

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
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        {/* Render icon component with color prop */}
        {Icon && <Icon width={24} height={24} color={isHovered ? '#267EF9' : '#888'} />}
      </Button>

      {label && (
        <Text size={14} color="$textSecondary">
          {label}
        </Text>
      )}
    </YStack>
  );
});

export default SidebarButton;
