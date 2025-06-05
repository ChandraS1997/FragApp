import { ObjectId } from 'bson';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import openRealm from '../../backend/database/realm';

const TaskView = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let realm;

        const loadData = async () => {
            realm = await openRealm();
            const taskList = realm.objects('Task');
            setTasks([...taskList]);

            taskList.addListener(() => setTasks([...taskList]));
        };

        loadData();

        return () => {
            if (realm && !realm.isClosed) realm.close();
        };
    }, []);

    const addTask = async () => {
        const realm = await openRealm();
        realm.write(() => {
            realm.create('Task', {
                _id: new ObjectId(),
                name: `Task ${Math.floor(Math.random() * 100)}`,
                status: 'Open',
            });
        });
    };
    const getTasks = async () => {
        const realm = await openRealm();
        const tasks = realm.objects('Task');

        console.log("Tasks:", tasks);
        realm.close();
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="Add Task" onPress={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.name} - {item.status}</Text>
                )}
            />
        </View>
    );
};

export default TaskView;