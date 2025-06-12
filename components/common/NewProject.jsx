import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import mime from 'react-native-mime-types';
import uuid from "react-native-uuid";

import { router } from "expo-router";
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
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const copyImageToStorage = async (uri) => {
    const customDir = `${FileSystem.documentDirectory}project_images/`;
    await FileSystem.makeDirectoryAsync(customDir, { intermediates: true });

    let extension = uri.split(".").pop();

    if (!extension || uri.startsWith("ph://")) {
      // Save to MediaLibrary and get real URI
      const asset = await MediaLibrary.createAssetAsync(uri);
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
      const realUri = assetInfo.localUri;

      const mimeType = mime.lookup(realUri || uri);
      extension = mime.extension(mimeType) || "jpg";

      const fileName = `img_${Date.now()}.${extension}`;
      const dest = `${customDir}${fileName}`;
      await FileSystem.copyAsync({ from: realUri, to: dest });
      return dest;
    }

    // If URI has extension already (Android usually)
    const fileName = `img_${Date.now()}.${extension}`;
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
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const selected = await Promise.all(
          result.assets.map(async (asset) => {
            const originalUri = asset.uri;

            // Create asset to resolve 'ph://' URI
            const createdAsset = await MediaLibrary.createAssetAsync(originalUri);
            const assetInfo = await MediaLibrary.getAssetInfoAsync(createdAsset);
            const realUri = assetInfo.localUri;

            // Get MIME type and extension
            const mimeType = mime.lookup(realUri || originalUri);
            const ext = mime.extension(mimeType) || 'jpg';

            const fileName = `img_${Date.now()}.${ext}`;
            const dest = `${FileSystem.documentDirectory}project_images/${fileName}`;

            await FileSystem.copyAsync({ from: realUri, to: dest });

            return dest;
          })
        );

        setImages((prev) => {
          const newSet = new Set([...prev, ...selected]);
          return Array.from(newSet);
        });
      }
    } catch (err) {
      console.error('Image picking failed:', err);
    }
  };


  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!name) {
      alert("Project name is required");
      Toast.show("Project name is required", { type: "error" });
      return;
    }
    if (!images) {
      alert("Please upload an image");
      Toast.show("Please upload an image", { type: "error" });
      return;
    }
    // console.log(image);
    // console.log(image.split("/").pop().split(".").pop()?.toLowerCase());
    const allowedExtensions = ["jpg", "jpeg", "png", "tiff"];

    const validateImages = () => {
      for (const img of images) {
        const ext = img.split(".").pop()?.toLowerCase();
        console.log("Image extension:", ext);
        if (!ext || !allowedExtensions.includes(ext)) return false;
      }
      return true;
    };

    if (!images.length) {
      alert("Please upload at least one image");
      Toast.show("Please upload at least one image", { type: "error" });
      return;
    }
    if (!validateImages()) {
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
      img_url: JSON.stringify(images),
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
      setImages([]);
      onOpenChange(false);
      router.push({
        pathname: '/projectView',
        params: {
          id: newProject.id, // or a unique ID
          name: newProject.name,
          desc: newProject.desc,
          updated: newProject.updated,
          img_url: newProject.img_url,
        }
      })

    } catch (err) {
      console.error("❌ Failed to add project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal padding={0}>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" />
        <Dialog.Content
          key="content"
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
                  {images.length > 0
                    ? `${images.length} image(s) selected ✓`
                    : "Browse images or drag & drop to upload"}
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
