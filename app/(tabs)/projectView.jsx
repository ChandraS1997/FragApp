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
  const [showCaptureDialog, setShowCaptureDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

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
            <ArrowLeft size={20} color="$bg" onPress={handleBack} />
            <Text color="$bg">{name}</Text>
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
              onPress={() => setShowCaptureDialog(true)}
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
              onPress={() => setShowUploadDialog(true)}
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
      <Dialog open={showCaptureDialog} onOpenChange={setShowCaptureDialog}>
        <Dialog.Portal>
          <Dialog.Overlay />

          <Dialog.Content
            bordered
            elevate
            width={394}
            maxHeight="90vh"
            borderRadius={12}
            backgroundColor="white"
            padding={0}
          >
            <YStack space="$3">
              {/* Title */}
              <YStack
                backgroundColor="$darkPrimary"
                borderTopLeftRadius={12}
                borderTopRightRadius={12}
                padding={16}
              >
                <Text color="white" fontSize={16} fontWeight="700">
                  Important
                </Text>
              </YStack>

              {/* Content */}
              <YStack paddingHorizontal={16} paddingTop={8} gap={10}>
                <Text fontWeight="700" fontSize={15}>
                  Image Check Criteria
                </Text>
                <Text fontSize={14}>Before analysis, each image must meet these standards:</Text>
                <YStack gap={10} paddingLeft={16}>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Angle</Text> – Camera should be perpendicular to the
                    surface (±10° tolerance).
                  </Text>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Brightness</Text> – Avoid overexposure; histogram
                    should not be clipped at either end.
                  </Text>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Quality</Text> – No visible blur; motion blur &lt; 1
                    pixel.
                  </Text>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Resolution</Text> – Minimum 1920×1080 px (2MP);
                    recommended 12MP+ for detailed analysis.
                  </Text>
                </YStack>
              </YStack>

              {/* Buttons */}
              <YStack gap={6} padding={16} borderTopWidth={1} borderColor="$borderColor">
                <Button
                  onPress={() => {
                    setShowCaptureDialog(false);
                    handleCapture(); // Call camera function
                  }}
                  backgroundColor="$primary"
                  color="$bg"
                  icon={Plus}
                  theme="blue"
                  // flex={1}
                  hoverStyle={{
                    backgroundColor: '$primary',
                    color: '$bg',
                  }}
                  pressStyle={{
                    backgroundColor: '$primary',
                    color: '$bg',
                    opacity: 1,
                  }}
                >
                  Capture Images
                </Button>

                <Button
                  onPress={() => setShowCaptureDialog(false)}
                  variant="outlined"
                  theme="blue"
                  color="$textSecondary"
                  // flex={1}
                >
                  Cancel
                </Button>
              </YStack>
            </YStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <Dialog.Portal>
          <Dialog.Overlay />

          <Dialog.Content
            bordered
            elevate
            width={418}
            borderRadius={12}
            backgroundColor="white"
            padding={0}
          >
            <YStack gap="$3">
              {/* Header */}
              <XStack
                backgroundColor="#1B4DB1"
                borderTopLeftRadius={12}
                borderTopRightRadius={12}
                padding={16}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text color="white" fontSize={16} fontWeight="700">
                  Upload Images
                </Text>
                <TouchableOpacity onPress={() => setShowUploadDialog(false)}>
                  <X size={18} color="white" />
                </TouchableOpacity>
              </XStack>

              {/* Upload Box */}
              <YStack padding={16} gap={8}>
                <YStack>
                  <Text color="$textSecondary">Upload</Text>
                </YStack>

                <YStack
                  borderStyle="dashed"
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius={8}
                  padding={16}
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => pickImage()}
                  onDragOver={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={e => {
                    e.preventDefault();
                    e.stopPropagation();

                    const files = e.dataTransfer.files;
                    if (files && files.length > 0) {
                      // Send dropped file to your handler
                      pickImage(files[0]); // Pass file manually if pickImage supports it
                    }
                  }}
                  cursor="pointer"
                >
                  <Upload size={40} color="#9E9E9E" />
                  <Text fontSize={13} color="#666" mt={8}>
                    Browse image or drag & drop to upload
                  </Text>
                </YStack>
              </YStack>

              {/* Action Buttons */}
              <XStack
                justifyContent="flex-end"
                gap="$2"
                borderBottomLeftRadius={12}
                borderBottomRightRadius={12}
                padding={16}
                backgroundColor="$lightPrimary"
                borderTopWidth={1}
                borderColor="$borderColor"
              >
                <Button
                  variant="outlined"
                  theme="blue"
                  color="$textSecondary"
                  onPress={() => setShowUploadDialog(false)}
                >
                  Cancel
                </Button>

                <Button
                  theme="blue"
                  backgroundColor="$primary"
                  color="$bg"
                  hoverStyle={{
                    backgroundColor: '$primary',
                    color: '$bg',
                  }}
                  pressStyle={{
                    backgroundColor: '$primary',
                    color: '$bg',
                    opacity: 1,
                  }}
                  onPress={() => {
                    // pickImage();
                    setShowUploadDialog(false);
                  }}
                >
                  Upload
                </Button>
              </XStack>
            </YStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
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
