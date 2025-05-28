import { ArrowLeft, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Button, Label, Text, XStack, YStack } from 'tamagui';
import SwitchWithLabel from './SwitchWithLabel';
import AskIcon from '../../assets/icons/ask.svg';
import { useState } from 'react';
import SliderNative from '@react-native-community/slider';
import { TextInput, ScrollView, Platform, Dimensions } from 'react-native';
import { DualButton } from './DualButton';

const EditParameters = ({ onClose }) => {
  const screenHeight = Dimensions.get('window').height;
  const maxHeight = screenHeight * 0.5; // Use 50% of the screen height
  const handleCancel = () => {
    onClose();
  };

  const handleApply = () => {
    // Logic to apply changes can be added here
    onClose();
  };

  return (
    <>
      <YStack
        width={320}
        padding={16}
        backgroundColor="$bg"
        borderRadius={8}
        shadowColor="black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.2}
        shadowRadius={4}
        $platform-web={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <XStack
          alignItems="center"
          paddingBottom={16}
          borderBottomWidth={1}
          borderColor="$borderColor"
          gap={8}
        >
          <ArrowLeft size={20} onPress={onClose} style={{ cursor: 'pointer' }} />
          <Text color="$textColor">Edit parameters</Text>
        </XStack>

        <ScrollView style={{ maxHeight }} showsVerticalScrollIndicator={false}>
          <YStack
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
            paddingVertical={16}
            gap={16}
          >
            <YStack gap={16} width={148}>
              <Text color="$textSecondary">Blast parameters</Text>
              <XStack gap={16} alignItems="center">
                <SwitchWithLabel label="Share" size="$1" defaultChecked={false} />
                <AskIcon />
              </XStack>
              <SwitchWithLabel label="Metric" size="$1" defaultChecked={true} />
            </YStack>

            <LabeledSlider label="Bench height (m)" defaultValue={2.3} />
            <LabeledSlider label="Burden (m)" defaultValue={2.3} />
            <LabeledSlider label="Spacing (m)" defaultValue={2.3} />
            <LabeledSlider label="Diameter (m)" defaultValue={2.3} />

            <XStack justifyContent="space-between" alignItems="center">
              <XStack alignItems="center" gap={8}>
                <Label>
                  <Text fontWeight="400" fontSize={14} color="$textSecondary">
                    Rock factor
                  </Text>
                </Label>
                <AskIcon />
              </XStack>
              <SwitchWithLabel label="Auto" size="$1" defaultChecked={true} />
            </XStack>
          </YStack>
        </ScrollView>

        <YStack paddingTop={16}>
          <DualButton onCancel={handleCancel} onApply={handleApply} />
        </YStack>
      </YStack>
    </>
  );
};

export default EditParameters;

export const WebSlider = ({ value, onValueChange }) => {
  const percentage = ((value - 0) / (5 - 0)) * 100;

  return (
    <input
      type="range"
      min={0}
      max={5}
      step={0.1}
      value={value}
      onChange={e => onValueChange(parseFloat(e.target.value))}
      style={{
        width: '100%',
        height: 6,
        borderRadius: 6,
        appearance: 'none',
        background: `linear-gradient(to right, #007bff 0%, #007bff ${percentage}%, #E5E5E5 ${percentage}%, #E5E5E5 100%)`,
        outline: 'none',
        WebkitAppearance: 'none',
        cursor: 'pointer',
      }}
    />
  );
};

export const LabeledSlider = ({ label, defaultValue = 2 }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <XStack gap={32} alignItems="flex-end" width="100%">
      <YStack flex={1} gap={8}>
        <XStack alignItems="center" gap={8}>
          <Label>
            <Text fontWeight="400" fontSize={14} color="$textSecondary">
              {label}
            </Text>
          </Label>
          <AskIcon />
        </XStack>

        {Platform.OS === 'web' ? (
          <WebSlider value={value} onValueChange={setValue} />
        ) : (
          <SliderNative
            value={value}
            onValueChange={val => setValue(parseFloat(val.toFixed(2)))}
            minimumValue={0}
            maximumValue={5}
            step={0.1}
            style={{ width: '100%', height: 24 }}
            minimumTrackTintColor="#007bff"
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor="#007bff"
          />
        )}
      </YStack>

      <YStack justifyContent="flex-end">
        <StepperInput value={value} onChange={setValue} step={0.1} min={0} max={5} />
      </YStack>
    </XStack>
  );
};

const StepperInput = ({ value, onChange, step = 1, min = 0, max = 100 }) => {
  const handleChange = delta => {
    const newValue = parseFloat((value + delta).toFixed(2));
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleInputChange = text => {
    const num = parseFloat(text);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <XStack
      alignItems="center"
      width={98}
      height={32}
      backgroundColor="$background"
      justifyContent="space-between"
      borderWidth={1}
      borderRadius={4}
      borderColor="$borderColor"
      overflow="hidden"
    >
      <TextInput
        value={value.toString()}
        onChangeText={handleInputChange}
        editable={false}
        style={{
          width: 60,
          fontSize: 16,
          textAlign: 'center',
          paddingVertical: 0,
          paddingHorizontal: 6,
          focusOutlineColor: 'transparent',
          outline: 'none',
        }}
      />

      <YStack width={28} gap={2}>
        <Button
          size={16}
          chromeless
          backgroundColor="$bg"
          onPress={() => handleChange(step)}
          icon={<ChevronUp size={14} />}
        />
        <Button
          size={16}
          chromeless
          backgroundColor="$bg"
          onPress={() => handleChange(-step)}
          icon={<ChevronDown size={14} />}
        />
      </YStack>
    </XStack>
  );
};
