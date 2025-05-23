import { useState } from 'react';
import { ToggleGroup } from 'tamagui';
import { Feather } from '@expo/vector-icons';

const ListGridBtn = ({viewMode, setViewMode}) => {
   // always starts with a value

  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      padding="$0"
      borderRadius="$2"
      onValueChange={val => {
        if (val) {
          setViewMode(val);
        }
      }}
    >
      <ToggleGroup.Item
        value="list"
        aria-label="List View"
        hoverTheme={false}
        pressTheme={false}
        paddingHorizontal="$4"
        backgroundColor="$bg"
      >
        <Feather name="list" size={20} color={viewMode === 'list' ? '#007aff' : '#999'} />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value="grid"
        aria-label="Grid View"
        hoverTheme={false}
        pressTheme={false}
        paddingHorizontal="$4"
        backgroundColor="$bg"
      >
        <Feather name="grid" size={20} color={viewMode === 'grid' ? '#007aff' : '#999'} />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

export default ListGridBtn;
