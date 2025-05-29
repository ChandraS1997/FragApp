import { Dialog, Button, Input, Label, TextArea, YStack, XStack, Paragraph } from 'tamagui';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function CreateProjectModal({ open, onOpenChange }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log({ name, desc, image });
    onOpenChange(false); // Close modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal padding={0}>
      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content
          bordered
          elevate
          width={400}
          borderRadius="$4"
          backgroundColor="white"
          padding={0}
        >
          <XStack
            justifyContent="space-between"
            alignItems="center"
            backgroundColor="$darkPrimary"
            padding={16}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
          >
            <Dialog.Title fontSize="$8" fontWeight="600" color="$bg">
              Create Project
            </Dialog.Title>

            <Dialog.Close asChild>
              <Button
                circular
                size="$2"
                backgroundColor="transparent"
                hoverStyle={{ backgroundColor: '$darkPrimary', color: '$bg' }}
                pressStyle={{ backgroundColor: '$darkPrimary', color: '$bg', opacity: 1 }}
                color="$bg"
                icon={() => <>✕</>}
              />
            </Dialog.Close>
          </XStack>

          <YStack gap="$3" marginTop="$3" padding={16}>
            <YStack>
              <Label>Name *</Label>
              <Input value={name} onChangeText={setName} placeholder="Project Name" />
            </YStack>

            <YStack>
              <Label>Description</Label>
              <TextArea value={desc} onChangeText={setDesc} placeholder="Write about project..." />
            </YStack>

            <YStack>
              <Label>Upload Image</Label>
              <Button
                borderStyle="dashed"
                borderWidth={1}
                borderColor="$gray6"
                padding="$3"
                onPress={pickImage}
              >
                <Paragraph>
                  {image ? 'Image Selected ✓' : 'Browse image or drag & drop to upload'}
                </Paragraph>
              </Button>
            </YStack>
          </YStack>

          <XStack
            justifyContent="flex-end"
            marginTop="$4"
            gap="$2"
            padding={16}
            backgroundColor="$lightPrimary"
          >
            <Dialog.Close asChild>
              <Button theme="gray">Cancel</Button>
            </Dialog.Close>
            <Button onPress={handleSubmit} theme="active">
              Submit
            </Button>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
