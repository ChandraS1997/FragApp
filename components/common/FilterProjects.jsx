import { useState } from 'react';
import { Popover, Button, XStack, YStack, Separator, Label, Paragraph } from 'tamagui';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Filter } from '@tamagui/lucide-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DualButton } from './DualButton';

const FilterProjects = () => {
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [draftStartDate, setDraftStartDate] = useState(startDate);
  const [draftEndDate, setDraftEndDate] = useState(endDate);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onOpenChange = isOpen => {
    setOpen(isOpen);
    if (isOpen) {
      setDraftStartDate(startDate);
      setDraftEndDate(endDate);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleApply = () => {
    // Commit draft dates
    setStartDate(draftStartDate);
    setEndDate(draftEndDate);
    setOpen(false);
  };

  const formatDate = date =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      placement="bottom-start"
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
          icon={<Filter style={{ color: 'inherit' }} />}
          borderRadius="$2"
          paddingHorizontal="$4"
          paddingVertical="$0"
          size="$5"
          backgroundColor={open ? '$primary' : '$bg'}
          color={open ? '$bg' : '$textSecondary'}
          onPress={() => setOpen(true)}
          hoverStyle={{
            backgroundColor: open ? '$primary' : '$hoverBackground',
            color: '$primary',
            border: '$0',
          }}
          pressStyle={{
            backgroundColor: '$hoverBackground',
            border: '$0',
          }}
        />
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        elevate
        padding="$3"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        animation="quick"
        backgroundColor="$bg"
        maxWidth={250}
        minWidth={200}
      >
        <YStack gap="$4">
          {/* Start Date */}
          <XStack alignItems="center" justifyContent="space-between">
            <Label size="$3">Start Date</Label>
            {Platform.OS === 'web' ? (
              <input
                type="date"
                value={draftStartDate.toISOString().split('T')[0]}
                onChange={e => setDraftStartDate(new Date(e.target.value))}
                style={{
                  marginLeft: 8,
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  minWidth: 120,
                  right: 0,
                  outline: 'none',
                  boxShadow: 'none',
                }}
              />
            ) : (
              <XStack
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$2"
                paddingHorizontal="$2"
                paddingVertical="$1"
                alignItems="center"
                minWidth={120}
                onPress={() => setShowStartPicker(true)}
              >
                <Paragraph size="$3">{formatDate(draftStartDate)}</Paragraph>
                <Feather name="calendar" size={16} color="#267EF9" style={{ marginLeft: 8 }} />
              </XStack>
            )}
          </XStack>

          {/* End Date */}
          <XStack alignItems="center" justifyContent="space-between">
            <Label size="$3">End Date</Label>
            {Platform.OS === 'web' ? (
              <input
                type="date"
                value={draftEndDate.toISOString().split('T')[0]}
                onChange={e => setDraftEndDate(new Date(e.target.value))}
                style={{
                  marginLeft: 8,
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  minWidth: 120,
                  right: 0,
                  outline: 'none',
                  boxShadow: 'none',
                }}
              />
            ) : (
              <XStack
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$2"
                paddingHorizontal="$2"
                paddingVertical="$1"
                alignItems="center"
                minWidth={120}
                onPress={() => setShowEndPicker(true)}
              >
                <Paragraph size="$3">{formatDate(draftEndDate)}</Paragraph>
                <Feather name="calendar" size={16} color="#267EF9" style={{ marginLeft: 8 }} />
              </XStack>
            )}
          </XStack>

          <Separator />

          <XStack justifyContent="flex-end">
            <DualButton onCancel={handleCancel} onApply={handleApply} />
          </XStack>
        </YStack>

        {/* Native Pickers (mobile only) */}
        {Platform.OS !== 'web' && showStartPicker && (
          <DateTimePicker
            value={draftStartDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setDraftStartDate(selectedDate);
            }}
          />
        )}
        {Platform.OS !== 'web' && showEndPicker && (
          <DateTimePicker
            value={draftEndDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setDraftEndDate(selectedDate);
            }}
          />
        )}
      </Popover.Content>
    </Popover>
  );
};

export default FilterProjects;
