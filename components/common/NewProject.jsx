import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import uuid from "react-native-uuid";
import {
  Button,
  Dialog,
  Input,
  Label,
  Paragraph,
  Text,
  TextArea,
  Toast,
  XStack,
  YStack,
} from "tamagui";
import { addProject } from "../../backend/functions/ProjectsFunction";
import { requestMediaLibraryPermission } from "../../backend/functions/RequestFunction";

export default function CreateProjectModal({
  open,
  onOpenChange,
  setProjects,
  projects,
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyImageToStorage = async (uri) => {
    const customDir = `${FileSystem.documentDirectory}project_images/`;
    await FileSystem.makeDirectoryAsync(customDir, { intermediates: true });
    const fileName = uri.split("/").pop();
    const dest = `${customDir}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  };

  const saveToGallery = async (uri) => {
    const hasPermission = await requestMediaLibraryPermission(); //REquest permission
    if (!hasPermission) return null;
    const asset = await MediaLibrary.createAssetAsync(uri);
    return asset.uri;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const localCopy = await copyImageToStorage(result.assets[0].uri); //copy image
      const galleryUri = await saveToGallery(localCopy); // save image to local device
      setImage(galleryUri || localCopy);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!name) {
      alert("Project name is required");
      Toast.show("Project name is required", { type: "error" });
      return;
    }
    if (!image) {
      alert("Please upload an image");
      Toast.show("Please upload an image", { type: "error" });
      return;
    }
    // console.log(image);
    // console.log(image.split("/").pop().split(".").pop()?.toLowerCase());
    const allowedExtensions = ["jpg", "jpeg", "png", "tiff"];

    // Try to get extension from file name if available, fallback to uri
    const getImageExtension = () => {
      const fileName = image.split("/").pop().split(".").pop()?.toLowerCase(); // fallback to last part of URI
      return fileName;
    };

    const imageExtension = getImageExtension();
    console.log("Extension:", imageExtension);

    if (!allowedExtensions.includes(imageExtension)) {
      alert("Only JPG, JPEG, PNG, and TIFF images are allowed");
      Toast.show("Only JPG, JPEG, PNG, and TIFF images are allowed", {
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    const newProject = {
      id: uuid.v4(),
      name,
      desc,
      img_url: image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "admin",
      updated_by: "admin",
    };

    try {
      await addProject(newProject);
      setProjects((prev) => [newProject, ...prev]);
      setName("");
      setDesc("");
      setImage(null);
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Failed to add project:", err);
    } finally {
      setIsSubmitting(false);
    }
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
                hoverStyle={{ backgroundColor: "$darkPrimary", color: "$bg" }}
                pressStyle={{
                  backgroundColor: "$darkPrimary",
                  color: "$bg",
                  opacity: 1,
                }}
                color="$bg"
                icon={() => <Text>✕</Text>}
              />
            </Dialog.Close>
          </XStack>

          <YStack gap="$3" marginTop="$3" padding={16}>
            <YStack>
              <Label>Name *</Label>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Project Name"
              />
            </YStack>

            <YStack>
              <Label>Description</Label>
              <TextArea
                value={desc}
                onChangeText={setDesc}
                placeholder="Write about project..."
              />
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
                  {image
                    ? "Image Selected ✓"
                    : "Browse image or drag & drop to upload"}
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
