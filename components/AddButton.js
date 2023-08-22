import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, useTheme } from '@rneui/themed';

const AddButton = ({ onPress }) => {
    const { theme } = useTheme();
    return (
        <Icon
            containerStyle={styles.button}
            reverse
            raised
            name='add'
            type='material'
            color={theme.colors.primary}
            onPress={onPress}
        />
    )
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 30,
        bottom: 30,
    }
})

export default AddButton;