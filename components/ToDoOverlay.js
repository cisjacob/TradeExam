import { Overlay, Badge, useTheme } from "@rneui/themed";
import { View, Text, StyleSheet } from 'react-native';

const ToDoOverlay = ({ visible, toggleOverlay, task }) => {
  const { theme } = useTheme();
  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>{task ? task.title : 'No title'}</Text>
        <Text style={styles.details}>Status: {task ? (task.status ? 'Done' : 'Not done') : 'No status'}</Text>
        <Text style={styles.details}>{task ? task.description : 'No description'}</Text>
        <Text style={styles.details}>{task ? task.date : 'No date'}</Text>
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
  details: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  overlayContainer: {
    padding: 20
  }
})

export default ToDoOverlay