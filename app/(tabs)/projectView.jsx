import { useRouter, useLocalSearchParams } from 'expo-router';
import { XStack, Text, YStack, Input, Button, Image, Card, SizableText, Checkbox } from 'tamagui';
import { ArrowLeft, Trash, Upload, Plus, Check as CheckIcon } from '@tamagui/lucide-icons';
import Header from '../../components/common/Header';
import { ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { launchCamera } from 'react-native-image-picker';

const ProjectView = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  const [imageUri, setImageUri] = useState(null);
  const [mergeMode, setMergeMode] = useState(false);

  const [images, setImages] = useState(
    new Array(12).fill(0).map((_, i) => ({
      id: i,
      name: `Image_${i + 1}.png`,
      timestamp: 'Uploaded 17 hrs ago',
      uri: 'https://via.placeholder.com/150',
      isAnalyzed: i % 2 === 0,
      isSelected: false,
    }))
  );

  const handleBack = () => router.push('/');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCapture = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) return;
        const uri = response.assets?.[0]?.uri;
        if (uri) setImageUri(uri);
      }
    );
  };

  const toggleMergeMode = () => {
    if (mergeMode) {
      const anySelected = images.some(img => img.isSelected);
      if (anySelected) {
        router.push({
          pathname: '/workspace',
          params: {
            id: name,
            name: 'Merged',
            mode: 'graph',
          },
        });
        return;
      }
    }

    setMergeMode(!mergeMode);
    if (!mergeMode) {
      setImages(prev => prev.map(img => ({ ...img, isSelected: false })));
      
    }
  };

  const handleCheckboxToggle = img => {
    if (!img.isAnalyzed) {
      Alert.alert('Warning', 'This image is yet to be analyzed.');
      return;
    }

    setImages(prev =>
      prev.map(item => (item.id === img.id ? { ...item, isSelected: !item.isSelected } : item))
    );
  };

  return (
    <>
      <Header
        title={
          <XStack alignItems="center" space="$2">
            <ArrowLeft size={20} color="black" onPress={handleBack} />
            <Text>{name}</Text>
          </XStack>
        }
      />
      <YStack padding="$4" space="$4">
        {/* Controls */}
        <XStack justifyContent="space-between" flexWrap="wrap" width="100%">
          <XStack flex={1} minWidth={200} maxWidth={400}>
            <Input placeholder="Search Image" width="100%" />
          </XStack>

          <XStack space="$2" marginLeft="auto">
            <Button
              theme="blue"
              variant="outlined"
              size="$3"
              borderRadius="$4"
              onPress={toggleMergeMode}
            >
              Merge Analysis
            </Button>

            <Button
              theme="blue"
              variant="outlined"
              icon={Plus}
              size="$3"
              borderRadius="$4"
              onPress={handleCapture}
            >
              Add Image
            </Button>

            <Button
              theme="blue"
              variant="outlined"
              icon={Upload}
              size="$3"
              borderRadius="$4"
              onPress={pickImage}
            >
              Upload Image
            </Button>
          </XStack>
        </XStack>

        {/* Image Grid */}
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {images.map(img => (
            <Card
              key={img.id}
              width={180}
              margin="$2"
              elevate
              bordered
              onPress={() => {
                if (!mergeMode) {
                  router.push({
                    pathname: '/workspace',
                    params: {
                      id: name,
                      name: img.name,
                    },
                  });
                }
              }}
            >
              <YStack>
                {/* Checkbox top-left */}
                {mergeMode && (
                  <Checkbox
                    checked={img.isSelected}
                    onCheckedChange={() => handleCheckboxToggle(img)}
                    disabled={!img.isAnalyzed}
                    size="$3"
                    backgroundColor={img.isSelected ? '$primary' : '$bg'}
                    borderColor="$primary"
                    borderWidth={2}
                    color="$bg"
                    style={{
                      backgroundColor: img.isSelected ? '$primary' : '$bg',
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      zIndex: 10,
                      opacity: img.isAnalyzed ? 1 : 0.4,
                    }}
                    hoverStyle={{
                      borderColor: '$primary',
                      backgroundColor: '$bg',
                    }}
                    pressStyle={{
                      backgroundColor: '$primary',
                      borderColor: '$bg',
                    }}
                  >
                    <Checkbox.Indicator>
                      <CheckIcon size={12} color={img.isSelected ? '$bg' : '$primary'} />
                    </Checkbox.Indicator>
                  </Checkbox>
                )}

                {/* Trash button */}
                <XStack justifyContent="flex-end" position="absolute" top={4} right={4} zIndex={10}>
                  <Button size="$2" circular icon={Trash} />
                </XStack>

                <Image
                  source={{ uri: img.uri }}
                  style={{ width: '100%', height: 100, borderRadius: 8 }}
                />
                <SizableText size="$2" fontWeight="700" paddingLeft="$2">
                  {img.name}
                </SizableText>
                <SizableText size="$2" color="$textSecondary" paddingLeft="$2" marginBottom="$2">
                  {img.timestamp}
                </SizableText>
              </YStack>
            </Card>
          ))}
        </ScrollView>
      </YStack>
    </>
  );
};

export default ProjectView;
