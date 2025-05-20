import { Text, YStack } from 'tamagui';

const Home = () => {
  return (
    <YStack flex={1} jc="center" ai="center" space="$4" p="$6" bg="$background">
      <Text fontSize={32} fontWeight="700" ta="center">
        Welcome to the Home Screen!
      </Text>
      <Text fontSize={16} ta="center" color="$colorSecondary">
        This is your default homepage built with Tamagui.
      </Text>
    </YStack>
  );
};

export default Home;
