import { View, Text, XStack, YStack, useWindowDimensions, Card } from 'tamagui'
import { ScrollView } from 'react-native'
import { Button } from '@tamagui/button'
import { Pencil, Trash2 } from '@tamagui/lucide-icons'
 
const data = Array.from({ length: 15 }).map((_, i) => ({
  no: `${String(i + 1).padStart(2, '0')}`,
  name: i % 2 === 0 ? 'Omid Mine Site 1' : 'Omid Mine Site 2',
  updated: i % 2 === 0 ? 'Updated 16 hrs ago' : 'Updated 2 days ago',
  desc: i === 0 ? 'This is the image of adcd blast' : 'This is the image of Omid blast',
}))
 
export default function ProjectLists() {
  const { height } = useWindowDimensions()
  const scrollMaxHeight = height * 0.60 // Adjusted to 45% of screen height for better responsiveness
 
  return (
    <YStack flex={1} backgroundColor="$gray2" padding="$4">
      <Card borderRadius="$6" backgroundColor="white" elevation="$4" padding="$4">
        <XStack
          borderRadius="$4"
          overflow="hidden"
          flexDirection="column"
          borderWidth={1}
          borderColor="$borderColor"
        >
          {/* Header */}
          <XStack
            padding="$3"
            backgroundColor="$gray3"
            borderBottomWidth={1}
            borderColor="$borderColor"
          >
            <Text flex={1} fontWeight="600" fontSize="$5" color="$textSecondary" backgroundColor="$bg">No.</Text>
            <Text flex={3} fontWeight="600" fontSize="$5" color="$textSecondary" backgroundColor="$bg">Name</Text>
            <Text flex={3} fontWeight="600" fontSize="$5" color="$textSecondary" backgroundColor="$bg">Uploaded On</Text>
            <Text flex={4} fontWeight="600" fontSize="$5" color="$textSecondary" backgroundColor="$bg">Description</Text>
            <Text flex={2} fontWeight="600" fontSize="$5" color="$textSecondary" backgroundColor="$bg" textAlign="center">Actions</Text>
          </XStack>
 
          {/* Rows */}
          <ScrollView style={{ maxHeight: scrollMaxHeight }}>
            {data.map((item, index) => (
              <XStack
                key={index}
                alignItems="center"
                padding="$3"
                borderBottomWidth={1}
                borderColor="$borderColor"
                backgroundColor="white"
              >
                <Text flex={1} fontSize="$4" color="$textSecondary" backgroundColor="$bg">{item.no}</Text>
                <Text flex={3} fontSize="$4" color="$textSecondary" backgroundColor="$bg">{item.name}</Text>
                <Text flex={3} fontSize="$4" color="$textSecondary" backgroundColor="$bg">{item.updated}</Text>
                <Text flex={4} fontSize="$4" color="$textSecondary" backgroundColor="$bg">{item.desc}</Text>
                <XStack flex={2} gap="$2" justifyContent="center" paddingRight="$2">
                  <Button icon={Pencil} size="$2" />
                  <Button icon={Trash2} size="$2" theme="red" />
                </XStack>
              </XStack>
            ))}
          </ScrollView>
 
          {/* Pagination */}
          <XStack padding="$3" justifyContent="space-between" alignItems="center" backgroundColor="white">
            <Text color="$textSecondary" backgroundColor="$bg" fontSize="$4">Items per page 15 ▼</Text>
            <Text color="$textSecondary" backgroundColor="$bg" fontSize="$4">1 -15 of 150 Items</Text>
            <XStack alignItems="center" gap="$2">
              <Button size="$2" variant="outlined">≪</Button>
              <Button size="$2" variant="outlined">‹</Button>
              <Button size="$2" variant="active">1</Button>
              <Button size="$2" variant="outlined">2</Button>
              <Button size="$2" variant="outlined">3</Button>
              <Button size="$2" variant="outlined">›</Button>
              <Button size="$2" variant="outlined">≫</Button>
            </XStack>
          </XStack>
        </XStack>
      </Card>
    </YStack>
  )
}
 
 