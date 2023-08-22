import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AddButton from './AddButton';
import MySearchBar from './MySearchBar';
import ToDoCard from './ToDoCard';
import FilterButton from './FilterButton';
import ToDoOverlay from './ToDoOverlay';
import { View, Text } from 'react-native'

import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@rneui/themed';

const Home = ({ navigation, route }) => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteTask = (taskId) => {
    // Remove the task from the tasks state
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

  useEffect(() => {
    const retrieveTasks = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const taskKeys = keys.filter((key) => key.startsWith('task:'));
        const tasksData = await AsyncStorage.multiGet(taskKeys);
        const taskArrays = tasksData.map(([, taskJson]) => JSON.parse(taskJson));

        // Filter tasks based on search query
        const filteredTasks = taskArrays.filter((task) => {
          const taskTitle = task.title.toLowerCase();
          return taskTitle.includes(searchQuery.toLowerCase());
        });

        // Sort tasks based on status (Done tasks at the bottom)
        filteredTasks.sort((a, b) => {
          if (a.status === b.status) {
            return 0;
          }
          // Put Done tasks at the bottom
          return a.status ? 1 : -1;
        });

        setTasks(filteredTasks);
      } catch (error) {
        console.log('Error retrieving tasks:', error);
      }
    }

    retrieveTasks();
  }, [[route.params?.refresh]]);
  return (
    <MenuProvider>
        <MySearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterButton setSelectedFilter={setSelectedFilter}/>
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 60}}>
        {tasks.length === 0 ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>There are no tasks...</Text>
            </View>
          ) : (
          tasks
            .filter((task) => {
              if(selectedFilter === 'Done') {
                return task.status === true;
              } else if (selectedFilter === 'Not done') {
                return task.status === false;
              }
              return true;
            })
            .map((task) => (
            <ToDoCard key={task.id} task={task} navigation={navigation} handleDeleteTask={handleDeleteTask}/>
            ))
          )
        }
        </ScrollView>
        <AddButton onPress={() => navigation.navigate('Add Task')} />
        {/* <AddButton onPress={() => clearAsyncStorage()} /> */}

    </MenuProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textContainer: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    text: {
      color: '#86939e',
      fontSize: 18,
      fontWeight: 'bold'
    }
  })

export default Home