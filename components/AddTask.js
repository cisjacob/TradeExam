import { useState } from 'react';
import { Button, Icon, useTheme, Input } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { theme } = useTheme();

    const handleAddTask = async () => {
        const task = {
            id: new Date().getTime().toString(),
            title,
            description,
            status: false,
            date: new Date().toString()
        }

        try {
            if (title !== '') {
                await AsyncStorage.setItem(`task:${task.id}`, JSON.stringify(task));
                console.log('Task added successfully!');
                navigation.navigate('Home', { refresh: true });
            } else {
                setErrorMsg('Title cannot be blank.')
            }
        } catch (error) {
            console.log('Error adding task:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Title'
                inputContainerStyle={styles.inputContainer}
                value={title}
                onChangeText={(text) => setTitle(text)}
                errorStyle={{ color: 'red' }}
                errorMessage={errorMsg}
            />
            <Input
                placeholder='Description (Optional)'
                multiline={true}
                numberOfLines={10}
                inputStyle={{ textAlignVertical: 'top'}}
                inputContainerStyle={styles.inputContainer}
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Button 
                title='Save'
                radius={'lg'}
                onPress={handleAddTask}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    }
})

export default AddTask