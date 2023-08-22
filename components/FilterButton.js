import { Button, Icon, useTheme } from '@rneui/themed'
import { View, StyleSheet, Text } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';

const FilterButton = ({ setSelectedFilter }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Menu>
      {/* <MenuTrigger text='Select action' /> */}
        <MenuTrigger>
          <Icon
            raised
            reverse
            name='filter'
            type='material-community'
            color={theme.colors.primary}
          />
        </MenuTrigger>
        <MenuOptions customStyles={popupStyle}>
          <MenuOption text='All' onSelect={() => setSelectedFilter('All')} />
          <MenuOption text='Done' onSelect={() => setSelectedFilter('Done')} />
          <MenuOption text='Not done' onSelect={() => setSelectedFilter('Not done')} />
        </MenuOptions>
      </Menu>
      
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginRight: 10,
  },
  button: {
    width: 50,
  }
});

const popupStyle = {
  optionText: { color: 'black', fontSize: 20 },
  optionsContainer: { width: 100 },
}

export default FilterButton