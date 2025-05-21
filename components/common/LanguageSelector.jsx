import { useState } from 'react';
import {
  Button,
  YStack,
  XStack,
  Text,
  useTheme,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from 'tamagui';

const languageOptions = [
  { label: 'English', value: 'en', flag: '🇺🇸' },
  { label: 'Русский', value: 'ru', flag: '🇷🇺' },
  { label: '中文', value: 'zh', flag: '🇨🇳' },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState(languageOptions[0]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleSelect = lang => {
    setSelected(lang);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-end">
      <PopoverAnchor>
        <XStack space="$1" alignItems="center" backgroundColor="$bg">
          {/* Label also toggles dropdown */}
          <Text
            onPress={() => setOpen(true)}
            color="$textSecondary"
            backgroundColor="$bg"
            hoverStyle={{ color: '$primary' }}
          >
            Language:
          </Text>

          {/* Dropdown Trigger */}
          <Button
            // size="$5"
            icon={null}
            backgroundColor="$bg"
            onPress={() => setOpen(prev => !prev)}
            justifyContent="flex-start"
            borderWidth={0}
            borderRadius={0}
            pressStyle={{ backgroundColor: '$bg' }}
            hoverStyle={{ backgroundColor: '$bg' }}
            focusStyle={{ backgroundColor: '$bg' }}
          >
            <XStack alignItems="center" gap="$2">
              <Text>{selected.flag}</Text>
              <Text color="$textSecondary" hoverStyle={{ color: '$primary' }}>
                {selected.label}
              </Text>
            </XStack>
          </Button>
        </XStack>
      </PopoverAnchor>

      <PopoverContent
        placement="top"
        elevate
        padding="$2"
        backgroundColor="$bg"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <YStack space="$1">
          {languageOptions.map(lang => (
            <Button
              key={lang.value}
              size="$2"
              variant="ghost"
              backgroundColor="$bg"
              borderWidth={0}
              pressStyle={{ backgroundColor: '$bg' }}
              hoverStyle={{ backgroundColor: '$bg' }}
              focusStyle={{ backgroundColor: '$bg' }}
              justifyContent="flex-start"
              onPress={() => handleSelect(lang)}
            >
              <XStack alignItems="center" space="$2">
                <Text>{lang.flag}</Text>
                <Text
                  color={lang.value === selected.value ? '$primary' : '$textSecondary'}
                  hoverStyle={{ color: '$primary' }}
                >
                  {lang.label}
                </Text>
              </XStack>
            </Button>
          ))}
        </YStack>
      </PopoverContent>
    </Popover>
  );
}
