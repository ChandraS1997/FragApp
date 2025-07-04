import { Button, Paragraph, Tooltip, TooltipGroup } from 'tamagui';
import { useState } from 'react';
import { Platform, View } from 'react-native';

const IconTool = ({ svgIcon: SvgIcon, label }) => {
  const [isHovered, setHovered] = useState(false);
  const [isPressed, setPressed] = useState(false);

  const iconColor = isPressed || isHovered ? '#267EF9' : '#888';

  if (Platform.OS === 'web') {
    return (
      <TooltipGroup delay={0}>
        <Tooltip placement="bottom" offset={0} delay={0}>
          <Tooltip.Trigger>
            <Button
              width={44}
              height={44}
              chromeless
              padding={4}
              borderRadius={8}
              borderWidth={1}
              borderColor="$borderColor"
              backgroundColor="$background"
              onHoverIn={() => setHovered(true)}
              onHoverOut={() => setHovered(false)}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              hoverStyle={{ backgroundColor: '$hoverBackground' }}
              pressStyle={{ backgroundColor: '$hoverBackground' }}
            >
              <SvgIcon width={20} height={20} color={iconColor} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content
            enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
            scale={1}
            x={0}
            y={0}
            opacity={1}
            py="$2"
            backgroundColor="$bg"
            delay={0}
          >
            <Tooltip.Arrow size={10} backgroundColor="$bg" />
            <Paragraph size="$2" lineHeight="$1" color="$textColor">
              {label}
            </Paragraph>
          </Tooltip.Content>
        </Tooltip>
      </TooltipGroup>
    );
  } else {
    return (
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#fff',
          padding: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
      >
        <SvgIcon width={20} height={20} color={iconColor} />
      </View>
    );
  }
};

export default IconTool;
