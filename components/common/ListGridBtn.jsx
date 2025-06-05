import { useState } from 'react';
import { ToggleGroup } from 'tamagui';
import { Feather } from '@expo/vector-icons';

const ListGridBtn = ({ viewMode, setViewMode }) => {
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
        focusStyle={viewMode === 'grid' ? {} : { backgroundColor: '$darkPrimary' }}
        hoverStyle={viewMode === 'grid' ? {} : { backgroundColor: '$darkPrimary' }}
        pressStyle={viewMode === 'grid' ? {} : { backgroundColor: '$darkPrimary' }}
        paddingHorizontal="$4"
        backgroundColor={viewMode === 'list' ? '$darkPrimary' : '$bg'}
      >
        <Feather name="list" size={20} color={viewMode === 'list' ? '#ffffff' : '#999'} />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value="grid"
        aria-label="Grid View"
        hoverStyle={viewMode === 'list' ? {} : { backgroundColor: '$darkPrimary' }}
        focusStyle={viewMode === 'list' ? {} : { backgroundColor: '$darkPrimary' }}
        pressStyle={viewMode === 'list' ? {} : { backgroundColor: '$darkPrimary' }}
        paddingHorizontal="$4"
        backgroundColor={viewMode === 'grid' ? '$darkPrimary' : '$bg'}
      >
        <Feather name="grid" size={20} color={viewMode === 'grid' ? '#ffffff' : '#999'} />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

export default ListGridBtn;
