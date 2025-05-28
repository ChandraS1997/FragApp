import { forwardRef, useState } from 'react';
import { Button, Text, useTheme, YStack } from 'tamagui';

const SidebarButton = forwardRef(
  (
    {
      icon: Icon,
      label,
      hoverColor = '$primary',
      defaultColor = '$color',
      isActive = false,
      onPress,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();

    const resolveColor = token => {
      if (!token) return '#888';
      const key = token.startsWith('$') ? token.slice(1) : token;
      return theme[key]?.val ?? token;
    };

    const iconColor = isActive
      ? '#fff'
      : isHovered
        ? resolveColor(hoverColor)
        : resolveColor(defaultColor);

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
