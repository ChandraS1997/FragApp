import { useState } from 'react';
import { Platform } from 'react-native';
import { Button, YStack, XStack, Text, Popover, PopoverAnchor, PopoverContent } from 'tamagui';
import FlagWeb from 'react-world-flags'; // works only on web

const languageOptions = [
  { label: 'English', value: 'en', countryCode: 'us', emoji: '🇺🇸' },
  { label: 'Русский', value: 'ru', countryCode: 'ru', emoji: '🇷🇺' },
  { label: '中文', value: 'zh', countryCode: 'cn', emoji: '🇨🇳' },
];

// Helper component to switch flag type
const FlagIcon = ({ countryCode, emoji }) => {
  if (Platform.OS === 'web') {
    return (
      <FlagWeb
        code={countryCode}
        style={{
          width: 20,
          height: 14,
          borderRadius: 2,
          objectFit: 'cover',
        }}
      />
    );
  } else {
    return <Text style={{ fontSize: 18 }}>{emoji}</Text>;
  }
};

const LanguageSelector = () => {
  const [selected, setSelected] = useState(languageOptions[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = lang => {
    setSelected(lang);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-end">
      <PopoverAnchor>
        <XStack space="$1" alignItems="center" backgroundColor="$bg">
          <Text
            onPress={() => setOpen(true)}
            color="$textSecondary"
            backgroundColor="$bg"
            hoverStyle={{ color: '$primary' }}
          >
            Language:
          </Text>

          <Button
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
              <FlagIcon countryCode={selected.countryCode} emoji={selected.emoji} />
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
        <YStack gap="$1">
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
              <XStack alignItems="center" gap="$2">
                <FlagIcon countryCode={lang.countryCode} emoji={lang.emoji} />
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
};

export default LanguageSelector;
