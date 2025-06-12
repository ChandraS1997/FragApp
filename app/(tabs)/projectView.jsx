import {
  ArrowLeft,
  Check as CheckIcon,
  Plus,
  Trash,
  Upload,
  X,
} from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library"; // Added MediaLibrary import
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  Image,
  Input,
  SizableText,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/common/Header";
// getRealmInstance is imported here but not directly used in pickImage, as addImages handles it
import * as FileSystem from "expo-file-system";
import mime from 'react-native-mime-types';
import getRealmInstance from "../../backend/database/realm";
import { addImages } from "../../backend/functions/ImageFunction";

const ProjectView = () => {
  const router = useRouter();
  const { id, name, desc, updated, updated_by, created_by, created_at, img_url } = useLocalSearchParams(); //required

  const [imageUri, setImageUri] = useState([]);
  const [mergeMode, setMergeMode] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [showCaptureDialog, setShowCaptureDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [images, setImages] = useState([]); // image array

  const handleBack = () => router.push("/");

  useEffect(() => {
    loadImages();
    requestPermissions();
  }, []);

  useEffect(() => {
    if (img_url) {
      try {
        const parsed = JSON.parse(img_url); // Parse stringified array
        if (Array.isArray(parsed)) {
          const formatted = parsed.map((uri, index) => ({
            id: `static-${index}`,
            uri,
            created_at: new Date(),
            name: uri.split('/').pop(),
          }));
          setImages((prev) => [...formatted, ...prev]);
        }
      } catch (err) {
        console.error("Failed to parse img_url from route params:", err);
      }
    }
  }, [img_url]);

 const loadImages = async () => {
  try {
    const realm = await getRealmInstance();
    const project = realm.objectForPrimaryKey("Project", id);

    if (!project) {
      console.warn("⚠️ Project not found for ID:", id);
      return;
    }

    let parsed = [];
    try {
      parsed = JSON.parse(project.img_url || "[]");
    } catch (err) {
      console.warn("⚠️ Failed to parse img_url from Realm:", err);
    }

    const formatted = parsed.map((uri, index) => ({
      id: `project-img-${index}-${Date.now()}`, // unique enough
      uri,
      created_at: new Date(),
      name: uri.split("/").pop(),
    }));

    setImages(formatted);
    console.log("✅ Loaded images from Realm:", formatted);
  } catch (err) {
    console.error("❌ Failed to load images:", err);
  }
};


  const requestPermissions = async () => {
    // Request Camera and Media Library permissions
    await ImagePicker.requestCameraPermissionsAsync();
    await MediaLibrary.requestPermissionsAsync();
  };

  const currentProjectId = id; // Project ID from route params
  const currentUserName = name; // User name from route params, or replace with actual user ID

  console.log(
    "currentUserName : " + currentUserName,
    " / ",
    "currentProjectId : " + id
  ); //Project Name

  const pickImage = async () => {
    // No need to call getRealmInstance here; addImages will handle it.
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
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
        const realm = await getRealmInstance();
        const project = realm.objectForPrimaryKey("Project", id);
        if (!project) {
          console.warn("❌ Project not found for ID:", id);
          return;
        }
        let images = JSON.parse(img_url);
        for(var i = 0; i < selected.length; i++) {
          images.push(selected[i]);
        }
        realm.write(() => {
          project.img_url = JSON.stringify(images);
          project.updated_at = new Date();
        });
        await loadImages();
      }
    } catch (err) {
      console.error("❌ ERROR in pickImage:", err);
    }
  };

  const handleCapture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      saveToPhotos: true, // Save captured photo to device's camera roll
    });
    if (!result.canceled) {
      const newImage = {
        id: uuidv4(),
        img_url: result.assets[0].uri, // Use uri as img_url for captured image
        project_id: currentProjectId, // Link to the current project
        created_at: new Date(),
        updated_at: new Date(),
        created_by: currentUserName,
        updated_by: currentUserName,
      };

      // Add the single captured image to Realm
      try {
        await addImages([newImage]); // addImages expects an array
        console.log("Captured image saved to Realm successfully!");
        setImages((prev) => [...prev, newImage]); // Update local state
      } catch (err) {
        console.error("❌ Failed to add captured image:", err);
      }
    }
  };

  const toggleMergeMode = () => {
    if (mergeMode) {
      const anySelected = images.some((img) => img.isSelected);
      if (anySelected) {
        router.push({
          pathname: "/workspace",
          params: { id: name, name: "Merged", mode: "graph" },
        });
        return;
      }
    }
    setMergeMode(!mergeMode);
    if (!mergeMode) {
      setImages((prev) => prev.map((img) => ({ ...img, isSelected: false })));
    }
  };

  const handleCheckboxToggle = (img) => {
    if (!img.isAnalyzed) {
      Alert.alert("Warning", "This image is yet to be analyzed.");
      return;
    }
    setImages((prev) =>
      prev.map((item) =>
        item.id === img.id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const deleteImage = async(img_id) => {
    setImages((prev) => prev.filter((img) => img.id !== img_id));
    // TODO: Add Realm deletion logic here
    const realm = await getRealmInstance();
        const project = realm.objectForPrimaryKey("Project", id);
        if (!project) {
          console.warn("❌ Project not found for ID:", id);
          return;
        }
        realm.write(() => {
          project.img_url = JSON.stringify(images);
          project.updated_at = new Date();
        });
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
                hoverStyle={{ backgroundColor: "$hoverBackground" }}
                pressStyle={{ backgroundColor: "$hoverBackground" }}
                onPress={() => toggleMergeMode(img)}
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
                    hoverStyle={{ backgroundColor: "$hoverBackground" }}
                    pressStyle={{ backgroundColor: "$hoverBackground" }}
                    onPress={() => {
                      setMergeMode(false);
                      setImages((prev) =>
                        prev.map((img) => ({ ...img, isSelected: false }))
                      );
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
                    hoverStyle={{ backgroundColor: "$primary" }}
                    pressStyle={{ backgroundColor: "$primary" }}
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
              hoverStyle={{ backgroundColor: "$hoverBackground" }}
              pressStyle={{ backgroundColor: "$hoverBackground" }}
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
              hoverStyle={{ backgroundColor: "$hoverBackground" }}
              pressStyle={{ backgroundColor: "$hoverBackground" }}
              onPress={() => setShowUploadDialog(true)}
            >
              Upload Image
            </Button>
          </XStack>
        </XStack>

        {/* Image Grid */}
        <ScrollView
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {images.map((img) => (
            <Card
              key={img.id}
              width={180}
              margin="$2"
              elevate
              bordered
              onPress={() => {
                if (!mergeMode) {
                  router.push({
                    pathname: "/workspace",
                    params: {
                      id: name,
                      img_name: img.name,
                      img_url: img.uri,
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
                      position: "absolute",
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
                      backgroundColor={img.isSelected ? "$primary" : "$bg"}
                      borderColor="$primary"
                      borderWidth={2}
                      color="$bg"
                      pointerEvents="none"
                    >
                      <Checkbox.Indicator>
                        <CheckIcon
                          size={12}
                          color={img.isSelected ? "$bg" : "$primary"}
                        />
                      </Checkbox.Indicator>
                    </Checkbox>
                  </TouchableOpacity>
                )}

                {/* Trash button */}
                <XStack
                  justifyContent="flex-end"
                  position="absolute"
                  top={4}
                  right={4}
                  zIndex={10}
                >
                  <Button
                    size="$2"
                    circular
                    icon={Trash}
                    onPress={() => deleteImage(img.id)}
                  />
                </XStack>

                <Image
                  source={{ uri: img.uri }}
                  style={{ width: "100%", height: 100, borderRadius: 8 }}
                  onError={(e) => console.warn('Image failed to load:', e.nativeEvent.error)}
                  resizeMode="cover"
                />
                <SizableText size="$2" fontWeight="700" paddingLeft="$2">
                  {img.name}
                </SizableText>
                <SizableText
                  size="$2"
                  color="$textSecondary"
                  paddingLeft="$2"
                  marginBottom="$2"
                >
                  {updated}
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
          <Dialog.Overlay key="overlay" />

          <Dialog.Content
            key="content"
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
                <Text fontSize={14}>
                  Before analysis, each image must meet these standards:
                </Text>
                <YStack gap={10} paddingLeft={16}>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Angle</Text> – Camera should be
                    perpendicular to the surface (±10° tolerance).
                  </Text>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Brightness</Text> – Avoid
                    overexposure; histogram should not be clipped at either end.
                  </Text>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Quality</Text> – No visible blur;
                    motion blur &lt; 1 pixel.
                  </Text>
                  <Text fontSize={14} color="$textSecondary">
                    • <Text fontWeight="400">Resolution</Text> – Minimum
                    1920×1080 px (2MP); recommended 12MP+ for detailed analysis.
                  </Text>
                </YStack>
              </YStack>

              {/* Buttons */}
              <YStack
                gap={6}
                padding={16}
                borderTopWidth={1}
                borderColor="$borderColor"
              >
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
                    backgroundColor: "$primary",
                    color: "$bg",
                  }}
                  pressStyle={{
                    backgroundColor: "$primary",
                    color: "$bg",
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
          <Dialog.Overlay key="overlay" />

          <Dialog.Content
            key="content"
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
                  onPress={() => {
                    pickImage();
                    setShowUploadDialog(false);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
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
                    backgroundColor: "$primary",
                    color: "$bg",
                  }}
                  pressStyle={{
                    backgroundColor: "$primary",
                    color: "$bg",
                    opacity: 1,
                  }}
                  onPress={() => {
                    // pickImage(),
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
