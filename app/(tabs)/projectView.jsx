import { useRouter, useLocalSearchParams } from 'expo-router';
import { XStack, Text, YStack, Input, Button, Image, Card, SizableText } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import Header from '../../components/common/Header';
import { Trash, Upload, Plus } from '@tamagui/lucide-icons'
import { View, ScrollView } from 'react-native'

const ProjectView = () => {
  const router = useRouter();
  const { id, name, desc, updated } = useLocalSearchParams();

  const handleBack = () => {
    router.push('/');
  };

  const images = new Array(20).fill(0).map((_, i) => ({
    id: i,
    name: 'Mt_Wlebk_S01_0001.png',
    timestamp: 'Uploaded 17 hrs ago',
    uri: 'https://via.placeholder.com/150', // Replace with real image URLs
  }))

  return (
    <>
      <Header
        title={
          <XStack alignItems="center" space="$2">
            <ArrowLeft size={20} color="black" onPress={handleBack} style={{ cursor: 'pointer' }} />
            <Text>{name}</Text>
          </XStack>
        }
      />
      <YStack padding="$4" space="$4">
        {/* Top bar with search and buttons */}
        <XStack justifyContent="space-between" alignItems="center" flexWrap="wrap" width="100%">
          {/* Left: Search Bar */}
          <XStack flex={1} minWidth={200} maxWidth={400}>
            <Input placeholder="Search Image" width="100%" />
          </XStack>

          {/* Right: Buttons */}
          <XStack space="$2" marginLeft="auto">
            <Button
              theme="blue"
              variant="outlined"
              borderWidth={1}
              borderColor="$blue10"
              icon={Plus}
              size="$3"
              borderRadius="$4"
              paddingHorizontal="$4"
            >Add Image</Button>
            <Button
              theme="blue"
              variant="outlined"
              borderWidth={1}
              borderColor="$blue10"
              icon={Upload}
              size="$3"
              borderRadius="$4"
              paddingHorizontal="$4">Upload Image</Button>
          </XStack>
        </XStack>

        {/* Image Grid */}
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} style={{ maxHeight: '80%' }}>
          {images.map((img) => (
            <Card key={img.id} width={180} margin="$2" elevate bordered>
              <YStack>
                <XStack justifyContent="flex-end" position="absolute" top={4} right={4} zIndex={10}>
                  <Button size="$2" circular icon={Trash} />
                </XStack>
                <Image
                  source={{ uri: img.uri }}
                  style={{ width: '100%', height: 100, borderRadius: 8 }}
                />
                <SizableText size="$2" fontWeight="700" paddingLeft='$2'>{img.name}</SizableText>
                <SizableText size="$2" color="$textSecondary" paddingLeft='$2' marginBottom='$2'>{img.timestamp}</SizableText>
              </YStack>
            </Card>
          ))}
        </ScrollView>
      </YStack>
    </>
  );
};

export default ProjectView;
