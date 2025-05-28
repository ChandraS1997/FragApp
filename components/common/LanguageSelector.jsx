import { useState } from 'react';
import { Platform } from 'react-native';
import { Button, YStack, XStack, Text, Popover, PopoverAnchor, PopoverContent } from 'tamagui';
import ReactCountryFlag from 'react-country-flag';

const languageOptions = [
  { label: 'English', value: 'en', countryCode: 'US', emoji: '🇺🇸' },
  { label: 'Русский', value: 'ru', countryCode: 'RU', emoji: '🇷🇺' },
  { label: '中文', value: 'zh', countryCode: 'CN', emoji: '🇨🇳' },
];

// Use react-country-flag on web, emoji on native
const FlagIcon = ({ countryCode, emoji }) => {
  if (Platform.OS === 'web') {
    return (
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: '1.5em',
          height: '1em',
          borderRadius: '2px',
          objectFit: 'cover',
        }}
        aria-label={countryCode}
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
        <XStack gap={1} alignItems="center" flexGrow={1}>
          <Text
            // width={90}
            paddingVertical={8}
            paddingRight={4}
            paddingLeft={16}
            onPress={() => setOpen(true)}
            color="$bg"
            hoverStyle={{ color: '$bg' }}
          >
            Language
          </Text>

          <Button
            backgroundColor="$darkPrimary"
            onPress={() => setOpen(prev => !prev)}
            justifyContent="flex-start"
            borderWidth={0}
            borderRadius={0}
            paddingRight={0}
            pressStyle={{ backgroundColor: '$darkPrimary' }}
            hoverStyle={{ backgroundColor: '$darkPrimary' }}
            focusStyle={{ backgroundColor: '$darkPrimary' }}
          >
            <XStack paddingVertical={8} paddingRight={16} alignItems="center" gap={8} flexGrow={1}>
              <FlagIcon countryCode={selected.countryCode} emoji={selected.emoji} />
              <Text color="$bg" hoverStyle={{ color: '$bg' }} fontWeight={400} size={14}>
                {selected.label}
              </Text>
            </XStack>
          </Button>
        </XStack>
      </PopoverAnchor>

      <PopoverContent
        placement="top"
        elevate
        padding={0}
        backgroundColor="$bg"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <YStack>
          {languageOptions.map(lang => (
            <Button
              key={lang.value}
              width={132}
              height={40}
              paddingHorizontal={16}
              paddingVertical={8}
              variant="ghost"
              backgroundColor="$bg"
              borderWidth={0}
              pressStyle={{ backgroundColor: '$bg' }}
              hoverStyle={{ backgroundColor: '$bg' }}
              focusStyle={{ backgroundColor: '$bg' }}
              justifyContent="flex-start"
              onPress={() => handleSelect(lang)}
            >
              <XStack alignItems="center" gap={8}>
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
