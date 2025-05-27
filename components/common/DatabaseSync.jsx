import { useState } from 'react';
import { Database } from '@tamagui/lucide-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Popover, Button, XStack, YStack, Separator, Label } from 'tamagui';
import { DualButton } from './DualButton';

const DatabaseSync = () => {
  const [selectedOption, setSelectedOption] = useState('BIMS');
  const [tempOption, setTempOption] = useState('BIMS');
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setTempOption(selectedOption);
    setOpen(false); // close popover
  };

  const handleApply = () => {
    setSelectedOption(tempOption);
    setOpen(false); // close popover
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement="bottom-end"
      stayInFrame
      allowFlip
      offset={10}
      trapFocus
      allowEscape={false}
      closeOnOutsidePress={false}
      disableAdapt
    >
      <Popover.Trigger asChild>
        <Button
          size="$6"
          width={60}
          height={60}
          chromeless
          paddingHorizontal={10}
          color="$primary"
          paddingVertical={0}
          borderRadius="$0"
          icon={Database}
          hoverStyle={{ backgroundColor: '$hoverLight' }}
          pressStyle={{ backgroundColor: '$hoverLight' }}
        />
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        elevate
        padding={16}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        animation="quick"
        backgroundColor="$bg"
        width={248}
        // maxWidth={250}
        // minWidth={200}
      >
        <Popover.Arrow size={20} backgroundColor="$bg" borderWidth={1} borderColor="$borderColor" />

        <YStack gap="$3" width={216}>
          {['BIMS', 'LEDR'].map((label, index) => {
            const isSelected = tempOption === label;
            return (
              <XStack
                key={index}
                alignItems="center"
                justifyContent="space-between"
                gap="$1"
                onPress={() => setTempOption(label)}
                cursor="pointer"
              >
                <Label size="$3" color={isSelected ? '$primary' : undefined}>
                  {label}
                </Label>
                <XStack
                  backgroundColor={isSelected ? '$primary' : '$bg'}
                  color={isSelected ? '$bg' : '$primary'}
                  padding="$2"
                  borderRadius="$2"
                  borderWidth={1}
                  borderColor={isSelected ? '$primary' : '$borderColor'}
                  alignItems="center"
                  justifyContent="center"
                >
                  <AntDesign name="sync" size={16} color={isSelected ? '#ffffff' : '6E6E6E'} />
                </XStack>
              </XStack>
            );
          })}

          <Separator />

          <XStack justifyContent="flex-end">
            <DualButton onCancel={handleCancel} onApply={handleApply} />
          </XStack>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};

export default DatabaseSync;
