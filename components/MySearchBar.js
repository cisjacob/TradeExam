import React, { useState } from 'react'
import { Button, SearchBar, Icon, useTheme } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

const MySearchBar = ({ searchQuery, setSearchQuery }) => {
    const { theme } = useTheme();
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearchQuery(search);
    };
    
    return (
        <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={searchQuery}
            containerStyle={{ backgroundColor: theme.colors.background }}
            inputContainerStyle={{ backgroundColor: theme.colors.background }}
            lightTheme={true}
        />
    )
}

export default MySearchBar