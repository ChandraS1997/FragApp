import {
  Dialog,
  Button,
  Input,
  Label,
  TextArea,
  YStack,
  XStack,
  Paragraph
} from 'tamagui'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function CreateProjectModal({ open, onOpenChange }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleSubmit = () => {
    console.log({ name, desc, image })
    onOpenChange(false) // Close modal
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content bordered elevate width={400} borderRadius="$4" padding="$4" backgroundColor="white">
          <Dialog.Title fontSize="$8" fontWeight="600">Create Project</Dialog.Title>
          <Dialog.Close asChild>
            <Button position="absolute" top="$2" right="$2" circular size="$2">✕</Button>
          </Dialog.Close>

          <YStack gap="$3" marginTop="$3">
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
              <Button borderStyle="dashed" borderWidth={1} borderColor="$gray6" padding="$3" onPress={pickImage}>
                <Paragraph>{image ? 'Image Selected ✓' : 'Browse image or drag & drop to upload'}</Paragraph>
              </Button>
            </YStack>
          </YStack>

          <XStack justifyContent="flex-end" marginTop="$4" gap="$2">
            <Dialog.Close asChild>
              <Button theme="gray">Cancel</Button>
            </Dialog.Close>
            <Button onPress={handleSubmit} theme="active">Submit</Button>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
