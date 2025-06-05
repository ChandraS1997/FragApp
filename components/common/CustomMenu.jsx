import { useState } from 'react';
import { Popover, Button } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';

const CustomMenu = ({ label = 'Menu', items = [], onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          iconAfter={ChevronDown}
          onPress={() => setOpen(!open)}
          borderWidth={1}
          borderRadius={4}
          padding={8}
          borderColor="$borderColor"
          backgroundColor="$background"
          width="100%"
          height={36}
          hoverStyle={{ backgroundColor: '$hoverBackground' }}
          pressStyle={{ backgroundColor: '$hoverBackground' }}
        >
          {label}
        </Button>
      </Popover.Trigger>

      <Popover.Content
        elevate
        borderRadius="$4"
        padding="$2"
        gap="$2"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$bg"
        maxWidth={200}
      >
        {items.map((item, index) => (
          <Button
            key={index}
            size="$2"
            width={114}
            onPress={() => {
              item?.onPress?.();
              onSelect?.(item);
              setOpen(false);
            }}
          >
            {item}
          </Button>
        ))}
      </Popover.Content>
    </Popover>
  );
};

export default CustomMenu;
