// ConnectionBtn.jsx
import React from 'react';
import { Circle } from '@tamagui/lucide-icons';
import { Button, Paragraph, Tooltip, TooltipGroup } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

const ConnectionBtn = props => {
  return (
    <TooltipGroup>
      <Tooltip placement="bottom" {...props}>
        <Tooltip.Trigger>
          <Button
            size="$5"
            chromeless
            padding="$3"
            borderRadius="$0"
            icon={() => <MaterialIcons name="fiber-manual-record" size={12} color="green" />}
            hoverStyle={{
              backgroundColor: '$bg',
            }}
            pressStyle={{
              backgroundColor: '$bg',
            }}
          />
        </Tooltip.Trigger>
        <Tooltip.Content
          enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
          scale={1}
          x={0}
          y={0}
          opacity={1}
          py="$2"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <Tooltip.Arrow />
          <Paragraph size="$2" lineHeight="$1">
            connection
          </Paragraph>
        </Tooltip.Content>
      </Tooltip>
    </TooltipGroup>
  );
};

export default ConnectionBtn;
