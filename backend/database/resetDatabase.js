import * as FileSystem from 'expo-file-system';
import Realm from 'realm';

const realmPath = Realm.defaultPath;

export const deleteRealm = async () => {
  try {
    await FileSystem.deleteAsync(realmPath, { idempotent: true });
    console.log('🧹 Realm database deleted');
  } catch (error) {
    console.warn('Failed to delete Realm:', error);
  }
};
