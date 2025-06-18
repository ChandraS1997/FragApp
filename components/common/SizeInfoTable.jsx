import { ScrollView, Text, XStack, YStack } from 'tamagui';

const SizeInfoTable = ({ data = [] }) => {
  return (
    <YStack
      width={258}
      height="100%"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius={8}
      overflow="hidden"
    >
      {/* Header Row */}
      <XStack backgroundColor="#E0E0E0" height={44}>
        <XStack
          width="50%"
          justifyContent="flex-start"
          alignItems="center"
          padding={10}
          borderRightWidth={1}
          borderColor="#A2A2A2"
        >
          <Text fontWeight="400" color="$textColor">
            Size
          </Text>
        </XStack>
        <XStack width="50%" justifyContent="flex-start" alignItems="center" padding={10}>
          <Text fontWeight="400" color="$textColor">
            % Passing
          </Text>
        </XStack>
      </XStack>

      {/* Data Rows */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {data.map((item, index) => {
          return (
            <XStack key={index} height={40} borderTopWidth={1} borderColor="$borderColor">
              <XStack
                width="50%"
                justifyContent="flex-start"
                alignItems="center"
                padding={10}
                borderRightWidth={1}
                borderColor="$borderColor"
                backgroundColor="$bg"
              >
                <Text color="$textSecondary">{item.size}</Text>
              </XStack>
              <XStack
                width="50%"
                justifyContent="flex-start"
                alignItems="center"
                padding={10}
                backgroundColor="$bg"
              >
                <Text color="$textSecondary">{item.passing}</Text>
              </XStack>
            </XStack>
          );
        })}
      </ScrollView>
    </YStack>
  );
};

export default SizeInfoTable;
