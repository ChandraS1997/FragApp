import Realm from 'realm';
import { TaskSchema } from '../models/Task';

const openRealm = async () => {
    const realm = await Realm.open({
        path: 'myrealm',
        schema: [TaskSchema],
        // schema :[TaskSchema, categorySchem] --> registor like this for multiple schema
    });

    return realm;
};

export default openRealm;