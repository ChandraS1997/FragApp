import { Text, YStack } from 'tamagui';

const NotFoundScreen = () => {
  return (
    <YStack f={1} jc="center" ai="center" space="$4" bg="$background" px="$6">
      <Text fontWeight="800" fontSize={36} color="$color" ta="center">
        404
      </Text>
      <Text fontSize={18} color="$color" ta="center" mb="$4">
        Oops! The page you’re looking for doesn’t exist.
      </Text>
    </YStack>
  );
};
export default NotFoundScreen;
