import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from '@rneui/themed';


const MyHeader = ({ title }) => {
  return (
    <Header
      containerStyle={styles.headerContainer}
      centerComponent={{ text: title, style: styles.title }}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#397af8',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyHeader;