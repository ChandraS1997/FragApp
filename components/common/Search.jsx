import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Input, XStack } from 'tamagui';
import { Pressable } from 'react-native';

const SearchBar = ({ query, setQuery }) => {
  return (
    <XStack
      alignItems="center"
      backgroundColor="$bg"
      width={301}
      borderRadius="$2"
      padding="$2"
      paddingHorizontal="$4"
      paddingVertical="$1"
      borderWidth={1}
      borderColor="$borderColor"
      gap="$2"
    >
      <Feather name="search" size={18} color="#999" />

      <Input
        placeholder="Search"
        value={query}
        onChangeText={setQuery}
        borderWidth={0}
        paddingHorizontal={0}
        backgroundColor="transparent"
        focusStyle={{
          outlineWidth: 0,
          borderColor: 'transparent',
          shadowColor: 'transparent',
        }}
        minWidth={300}
        focusTheme={false}
        justifyContent="flex-start"
      />

      {/* Clear button */}
      {query.length > 0 && (
        <Pressable onPress={() => setQuery('')}>
          <Feather name="x" size={18} color="#999" />
        </Pressable>
      )}
    </XStack>
  );
};

export default SearchBar;
