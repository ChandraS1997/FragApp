import { forwardRef, useState } from 'react';
import { Button, Text, YStack } from 'tamagui';

const SidebarButton = forwardRef(
  ({ icon: Icon, label, hoverColor, defaultColor, isActive = false, onPress, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    // Set icon color
    const iconColor = isActive
      ? '#fff'
      : isHovered
        ? hoverColor || '#267EF9'
        : defaultColor || '#888';

    // Set background color
    const backgroundColor = isActive ? '$primary' : '$bg';

    return (
      <YStack alignItems="center" gap={5} width={40}>
        <Button
          ref={ref}
          {...props}
          padding={10}
          paddingVertical={10}
          borderRadius={6}
          borderWidth={1}
          height={40}
          width={40}
          color="$primary"
          borderColor="$borderColor"
          backgroundColor={backgroundColor}
          hoverStyle={{ backgroundColor: '$hoverBackground' }}
          pressStyle={{ backgroundColor: '$hoverBackground' }}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          onPress={onPress}
        >
          {Icon && <Icon width={24} height={24} color={iconColor} />}
        </Button>

        {label && (
          <Text fontSize={12} color="$textSecondary" textAlign="center">
            {label}
          </Text>
        )}
      </YStack>
    );
  }
);

export default SidebarButton;
