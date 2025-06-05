import React, { useState } from 'react';
import { YStack, XStack, Text, Button, Popover, PopoverTrigger, PopoverContent } from 'tamagui';

const DataTable = ({ title, data = [], icon: Icon, PopoverComponent }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <YStack width={228} gap={12} padding={16} borderRadius={8} backgroundColor="$bg">
      <XStack gap={6} alignItems="center" justifyContent="space-between">
        <Text fontSize={16} fontWeight="500" color="$textColor">
          {title}
        </Text>

        {Icon && (
          <Popover open={open} onOpenChange={setOpen} placement="">
            <PopoverTrigger asChild>
              <Button
                padding={6}
                paddingVertical={6}
                borderRadius={6}
                borderWidth={1}
                height={24}
                width={24}
                borderColor="$borderColor"
                hoverStyle={{ backgroundColor: '$hoverBackground' }}
                pressStyle={{ backgroundColor: '$hoverBackground' }}
                onHoverIn={() => setIsHovered(true)}
                onHoverOut={() => setIsHovered(false)}
              >
                {Icon && <Icon width={24} height={24} color={isHovered ? '#267EF9' : '#6E6E6E'} />}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              elevated
              padding={0}
              enterStyle={{ opacity: 0, y: -10 }}
              exitStyle={{ opacity: 0, y: -10 }}
              animation="quick"
              zIndex={100}
            >
              {PopoverComponent ? (
                <PopoverComponent onClose={() => setOpen(false)} />
              ) : (
                <Text>Popover content</Text>
              )}
            </PopoverContent>
          </Popover>
        )}
      </XStack>

      <YStack borderRadius={8} overflow="hidden" gap={8}>
        {data.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];

          return (
            <XStack key={index} justifyContent="space-between">
              <Text color="$textSecondary" fontWeight="400" width="45%" size={14}>
                {key}
              </Text>
              <Text color="$textSecondary" width="5%" textAlign="center" size={14}>
                :
              </Text>
              <Text color="$textColor" width="45%" textAlign="left" size={14}>
                {value}
              </Text>
            </XStack>
          );
        })}
      </YStack>
    </YStack>
  );
};

export default DataTable;
