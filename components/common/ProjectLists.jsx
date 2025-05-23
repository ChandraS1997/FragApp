import { View, Text, XStack, YStack, useWindowDimensions, Card } from 'tamagui'
import { ScrollView } from 'react-native'
import { Button } from '@tamagui/button'
import { Pencil, Trash2 } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useRouter } from 'expo-router'

const data = Array.from({ length: 50 }).map((_, i) => ({
  no: `${String(i + 1).padStart(2, '0')}`,
  name: i % 2 === 0 ? 'Omid Mine Site 1' : 'Omid Mine Site 2',
  updated: i % 2 === 0 ? 'Updated 16 hrs ago' : 'Updated 2 days ago',
  desc: i === 0 ? 'This is the image of adcd blast' : 'This is the image of Omid blast',
}))

const ITEMS_PER_PAGE = 15

export default function ProjectLists({ query }) {
  const { height } = useWindowDimensions()
  const scrollMaxHeight = height * 0.60 // Adjusted to 45% of screen height for better responsiveness
  const [page, setPage] = useState(1)
  const router = useRouter();

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  )

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const handlePrev = () => setPage(p => Math.max(1, p - 1))
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1))


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
            {paginatedData.map((item, index) => (
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
                  <Button icon={Pencil} size="$2"
                    onPress={() => {
                      router.push({
                        pathname: '/projectView',
                        params: {
                          id: item.no,        // or a unique ID
                          name: item.name,
                          desc: item.desc,
                          updated: item.updated,
                        },
                      })
                    }}
                  />
                  <Button icon={Trash2} size="$2" theme="red" />
                </XStack>
              </XStack>
            ))}
          </ScrollView>

          {/* Pagination */}
          <XStack padding="$3" justifyContent="space-between" alignItems="center" backgroundColor="white">
            <Text color="$textSecondary" fontSize="$4">Items per page {ITEMS_PER_PAGE}</Text>
            <Text color="$textSecondary" fontSize="$4">
              {Math.min((page - 1) * ITEMS_PER_PAGE + 1, totalItems)} -
              {Math.min(page * ITEMS_PER_PAGE, totalItems)} of {totalItems} Items
            </Text>
            <XStack alignItems="center" gap="$2">
              <Button size="$2" variant="outlined" onPress={() => setPage(1)} disabled={page === 1}>≪</Button>
              <Button size="$2" variant="outlined" onPress={handlePrev} disabled={page === 1}>‹</Button>
              <Button size="$2" variant="active">{page}</Button>
              <Button size="$2" variant="outlined" onPress={handleNext} disabled={page === totalPages}>›</Button>
              <Button size="$2" variant="outlined" onPress={() => setPage(totalPages)} disabled={page === totalPages}>≫</Button>
            </XStack>
          </XStack>
        </XStack>
      </Card>
    </YStack>
  )
}

