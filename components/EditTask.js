import React, { useState } from 'react';
import { Button, Icon, useTheme, Input } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTask = ({ navigation, route }) => {
    const { theme } = useTheme();

    const task = route.params?.task;

    const updateToDo = async (id, title, description, status) => {
        try {
            if(title !== "") {
                await AsyncStorage.setItem(`task:${id}`, JSON.stringify({...task, title: title, description: description, status: status}));
                console.log(`Successfully updated task id: ${id}`);
                navigation.navigate('Home', { refresh: true });
            } else {
                setErrorMsg('Title cannot be blank.')
            }
        } catch (error) {
            console.log(`Error in updating task id: ${id} `, error)
        }
    }

    const [errorMsg, setErrorMsg] = useState('');
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : null);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([
        {label: 'Not done', value: false},
        {label: 'Done', value: true}
    ]);
    return (
        <View style={styles.container}>
            <Input
                containerStyle={{ width: '100%' }}
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

            <DropDownPicker
                style={styles.dropdownContainer}
                open={openDropdown}
                value={status}
                items={dropdownItems}
                setOpen={setOpenDropdown}
                setValue={setStatus}
                setItems={setDropdownItems}
            />
            <Button 
                title='Update'
                radius={'lg'}
                onPress={() => updateToDo(task.id, title, description, status)}
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
        padding: 5,
    },
    dropdownContainer: {
        marginBottom: 30,
        borderColor: '#86939e'
    }
})

export default EditTask