import Realm from 'realm';
import { ImageSchema, ProjectSchema } from '../models/Project';
import { TaskSchema } from '../models/Task';

const getRealmInstance = async () => {
    const realm = await Realm.open({
        path: 'myrealm',
        schema: [TaskSchema, ProjectSchema,ImageSchema],
         schemaVersion: 2,
        // schema :[TaskSchema, categorySchem] --> registor like this for multiple schema
    });

    return realm;
};

export default getRealmInstance;



// const realmConfig = {
//   schema: [ProjectSchema, ImageSchema],
//   schemaVersion: 2, // <--- IMPORTANT: Incremented schema version
//   migration: (oldRealm, newRealm) => {
//     // Only apply migration if the old schema version is less than the current one
//     if (oldRealm.schemaVersion < 2) {
//       const oldObjects = oldRealm.objects('Images');
//       const newObjects = newRealm.objects('Images');

//       // Loop through all objects and set the new property
//       for (let i = 0; i < oldObjects.length; i++) {
//         // If 'project_id' was added, you might want to initialize it to a default
//         // or ensure it's handled in your app logic when creating new images.
//         // For existing objects, it will be null or undefined if not explicitly set.
//         // newObjects[i].project_id = ''; // Example: set a default value if needed
//       }
//     }
//   },
// };