// app/index.jsx
import { TamaguiProvider, YStack, Text, Button } from 'tamagui'
import config from '../tamagui.config'

export default function Home() {
  return (
    <TamaguiProvider config={config}>
      <YStack f={1} jc="center" ai="center" gap="$4">
        <Text fontSize="$6">Hello from Mineexcellence</Text>

        <Button
          size="$4"
          theme="active"
          backgroundColor="$blue10"
          color="white"
          borderRadius="$6"
          onPress={() => alert('Tamagui Button pressed!')}
        >
          Press Me
        </Button>
      </YStack>
    </TamaguiProvider>
  )
}
