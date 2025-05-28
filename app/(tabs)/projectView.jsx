import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  XStack,
  Text,
  YStack,
  Input,
  Button,
  Image,
  Card,
  SizableText,
  Checkbox,
  Dialog,
} from 'tamagui';
import { ArrowLeft, Trash, Upload, Plus, Check as CheckIcon } from '@tamagui/lucide-icons';
import Header from '../../components/common/Header';
import { ScrollView, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { launchCamera } from 'react-native-image-picker';
import { X, Check as CrossIcon } from '@tamagui/lucide-icons';
import { TouchableWithoutFeedback } from 'react-native';

const ProjectView = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  const [imageUri, setImageUri] = useState(null);
  const [mergeMode, setMergeMode] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

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
            {!mergeMode ? (
              <Button
                theme="blue"
                variant="outlined"
                icon={CheckIcon}
                size="$3"
                height={40}
                color="$primary"
                borderRadius={8}
                borderWidth={1}
                borderColor="$primary"
                backgroundColor="$bg"
                hoverStyle={{ backgroundColor: '$hoverBackground' }}
                pressStyle={{ backgroundColor: '$hoverBackground' }}
                onPress={toggleMergeMode}
              >
                Merge Analysis
              </Button>
            ) : (
              <>
                <XStack gap={16} alignItems="center">
                  <Button
                    variant="outlined"
                    icon={() => <X size={18} color="#267EF9" />}
                    size="$3"
                    height={40}
                    borderRadius={8}
                    borderWidth={1}
                    color="primary"
                    borderColor="$primary"
                    backgroundColor="$bg"
                    hoverStyle={{ backgroundColor: '$hoverBackground' }}
                    pressStyle={{ backgroundColor: '$hoverBackground' }}
                    onPress={() => {
                      setMergeMode(false);
                      setImages(prev => prev.map(img => ({ ...img, isSelected: false })));
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    theme="blue"
                    icon={CheckIcon}
                    size="$3"
                    height={40}
                    color="$bg"
                    borderRadius={8}
                    borderWidth={1}
                    borderColor="$primary"
                    backgroundColor="$primary"
                    hoverStyle={{ backgroundColor: '$primary' }}
                    pressStyle={{ backgroundColor: '$primary' }}
                    onPress={toggleMergeMode}
                  >
                    Apply Merge
                  </Button>
                </XStack>
              </>
            )}

            <Button
              theme="blue"
              // variant="outlined"
              icon={Plus}
              size="$3"
              height={40}
              color="$primary"
              borderRadius={8}
              borderWidth={1}
              borderColor="$primary"
              backgroundColor="$bg"
              hoverStyle={{ backgroundColor: '$hoverBackground' }}
              pressStyle={{ backgroundColor: '$hoverBackground' }}
              onPress={handleCapture}
            >
              Add Image
            </Button>

            <Button
              theme="blue"
              variant="outlined"
              icon={Upload}
              size="$3"
              height={40}
              color="$primary"
              borderRadius={8}
              borderWidth={1}
              borderColor="$primary"
              backgroundColor="$bg"
              hoverStyle={{ backgroundColor: '$hoverBackground' }}
              pressStyle={{ backgroundColor: '$hoverBackground' }}
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
                {mergeMode && (
                  <TouchableOpacity
                    onPress={() => {
                      if (!img.isAnalyzed) {
                        setToastVisible(true);
                        setTimeout(() => setToastVisible(false), 2000);
                      } else {
                        handleCheckboxToggle(img);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      zIndex: 10,
                      opacity: img.isAnalyzed ? 1 : 0.4,
                    }}
                    activeOpacity={0.8}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Checkbox
                      checked={img.isSelected}
                      size="$3"
                      backgroundColor={img.isSelected ? '$primary' : '$bg'}
                      borderColor="$primary"
                      borderWidth={2}
                      color="$bg"
                      pointerEvents="none"
                    >
                      <Checkbox.Indicator>
                        <CheckIcon size={12} color={img.isSelected ? '$bg' : '$primary'} />
                      </Checkbox.Indicator>
                    </Checkbox>
                  </TouchableOpacity>
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
      <ToastMessage
        visible={toastVisible}
        message="This image is not yet analyzed. You cannot merge it."
      />
    </>
  );
};

export default ProjectView;

const ToastMessage = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <YStack
      position="absolute"
      bottom={40}
      alignSelf="center"
      paddingHorizontal={16}
      paddingVertical={10}
      backgroundColor="$danger"
      borderRadius={8}
      borderWidth={1}
      borderColor="$borderColor"
      shadowColor="black"
      shadowOpacity={0.1}
      shadowRadius={6}
      zIndex={999}
    >
      <Text color="$bg" fontSize={14}>
        {message}
      </Text>
    </YStack>
  );
};
