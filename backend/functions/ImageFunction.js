import getRealmInstance from "../database/realm";

export const addImages = async (image) => {
  const realm = await getRealmInstance();
  realm.write(() => {
    realm.create("Images", image);
    console.log(image);
  });
};



// import getRealmInstance from "../database/realm";

// export const addImages = async (imagesArray) => { // Renamed parameter to imagesArray for clarity
//   const realm = await getRealmInstance();

//   try {
//     realm.write(() => {
//       imagesArray.forEach((image) => { // Iterate over the array
//         realm.create("Images", image);
//         console.log("Image saved to Realm:", image.id); // Log each image's ID for verification
//       });
//     });
//     console.log("Images saved to Realm successfully!"); // This will now appear after all images are processed
//   } catch (error) {
//     console.error("❌ Failed to add images to Realm:", error); // More specific error message
//     throw error; // Re-throw to propagate the error if needed
//   }
// };
