// import { isAvailableAsync } from "expo-media-library"
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";

// localUri - The remote file URL.  {string}
// filename - Desired filename (with extension). {string}
// shareAfterSave  - Whether to open the sharing dialog after downloading.  {Boolean}

export async function downloadFile(localUri, filename, shareAfterSave = false) {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Storage permission is required to download files."
      );
      return;
    }
    const newUri = FileSystem.documentDirectory + filename;
    await FileSystem.copyAsync({
      from: localUri,
      to: newUri,
    });

    if (Platform.OS === "android") {
      const asset = await MediaLibrary.createAssetAsync(newUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }

    if (shareAfterSave && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(newUri);
    }

    Alert.alert("Success", `${filename} saved successfully.`);
    return uri;
  } catch (error) {
    console.error("Error saving file:", error);
    Alert.alert("Failed", "There was a problem saving the file.");
  }
}

// export async function downloadFile(
//   fileUri,
//   filename,
//   shareAfterDownload = false
// ) {
//   try {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission Denied",
//         "Storage permission is required to download files."
//       );
//       return;
//     }

//     const downloadResumable = FileSystem.createDownloadResumable(
//       fileUri,
//       FileSystem.documentDirectory + filename
//     );

//     const { uri } = await downloadResumable.downloadAsync();

//     if (Platform.OS === "android") {
//       const asset = await MediaLibrary.createAssetAsync(uri);
//       await MediaLibrary.createAlbumAsync("Download", asset, false);
//     }

//     if (shareAfterDownload && (await Sharing.isAvailableAsync())) {
//       await Sharing.shareAsync(uri);
//     }

//     Alert.alert(
//       "Download Complete",
//       `${filename} has been downloaded successfully.`
//     );
//     return uri;
//   } catch (error) {
//     console.error("Download error:", error);
//     Alert.alert(
//       "Download Failed",
//       "An error occurred while downloading the file."
//     );
//   }
// }
