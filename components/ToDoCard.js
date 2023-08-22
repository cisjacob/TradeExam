import { useState } from 'react';
import { Button, Card, Badge, Icon, useTheme, CheckBox } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';

import ToDoOverlay from './ToDoOverlay';
import DeleteToDoOverlay from './DeleteToDoOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDoCard = ({ navigation, task, handleDeleteTask }) => {
  const { theme } = useTheme();

  const [visibleView, setVisibleView] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const toggleOverlayView = () => {
    setVisibleView(!visibleView);
  };

  const toggleOverlayDelete = () => {
    setVisibleDelete(!visibleDelete);
  };

  const updateToDoStatus = async (id, status) => {
    try {
      await AsyncStorage.setItem(`task:${id}`, JSON.stringify({...task, status: !status}));
      console.log(`Successfully updated status of task id: ${id}`);
    } catch (error) {
      console.log(`Error in changing status of task id: ${id} `, error)
    }
  }

  return (
    <>
        <Card>
          <View style={styles.container}>
            <Text style={styles.title}>{task ? task.title : 'No title'}</Text>
            <View style={styles.innerContainer}>
              <CheckBox 
                containerStyle={{ margin: 0, padding: 0 }}
                checked={task ? task.status : 'No status'}
                onPress={() => task ? updateToDoStatus(task.id, task.status) : console.log('No task')}
              />
              <Menu>
                <MenuTrigger>
                  <Icon
                    name='more-vert'
                    type='material'
                    color={theme.colors.primary}
                  />
                </MenuTrigger>
                <MenuOptions customStyles={popupStyle}>
                  <MenuOption text='View' onSelect={() => toggleOverlayView()}/>
                  <MenuOption text='Edit' onSelect={() => navigation.navigate('Edit Task', { task })}/>
                  <MenuOption text='Delete' onSelect={() => toggleOverlayDelete()}/>
                </MenuOptions>
              </Menu>

            </View>
          </View>
            <Text style={styles.description}>{task ? task.description : 'No description'}</Text>
        </Card>

        {/* To Do Overlay */}
        <ToDoOverlay visible={visibleView} toggleOverlay={toggleOverlayView} task={task}/>

        {/* Delete Overlay */}
        <DeleteToDoOverlay visible={visibleDelete} toggleOverlay={toggleOverlayDelete} task={task} onDeleteTask={handleDeleteTask} />
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row'
  },
  title: {
    fontWeight: 'bold',
    color: '#000'
  },
  description: {
    fontSize: 12,
    color: '#808080',
  }
});

const popupStyle = {
  optionText: { color: 'black', fontSize: 20 },
  optionsContainer: { width: 120 },
}

export default ToDoCard