import AsyncStorage from "@react-native-async-storage/async-storage";
import { Overlay, Badge, useTheme, Button } from "@rneui/themed";
import { View, Text, StyleSheet } from 'react-native';

const DeleteToDoOverlay = ({ visible, toggleOverlay, task, onDeleteTask }) => {
  const { theme } = useTheme();

  const deleteItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Successfully deleted to do item with id: ${key}`);
      onDeleteTask(task.id);
      toggleOverlay();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Overlay isVisible={visible}>
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>Delete task?</Text>
        <View style={styles.buttonContainer}>
            <Button title="Delete" type="solid" color="error" onPress={() => deleteItem(`task:${task.id}`)} containerStyle={{ marginRight: 5 }}/>
            <Button title="Cancel" type="solid" color={theme.colors.grey3} onPress={toggleOverlay}/>
        </View>
      </View>   
    </Overlay>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  overlayContainer: {
    padding: 20
  }
})

export default DeleteToDoOverlay