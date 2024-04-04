import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Navbar({ Toggle }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigation = useNavigation();

  const toggleProfile = () => {
    console.log("profile clicked");
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={Toggle} style={styles.sidebarToggle}>
        <IconButton icon="menu" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Doctor')}>
          <Image
            source={require('./img1.jpg')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={toggleProfile}>
          <Image
            source={require('./img2.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {isOpen && (
          <Menu
            visible={isOpen}
            onDismiss={toggleProfile}
            anchor={<View style={styles.anchor} />}
          >
            <Menu.Item onPress={() => console.log('Item 1')} title="Item 1" />
            <Menu.Item onPress={() => console.log('Item 2')} title="Item 2" />
            <Menu.Item onPress={() => console.log('Item 3')} title="Item 3" />
          </Menu>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sidebarToggle: {
    marginRight: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  anchor: {
    width: 0,
    height: 0,
  },
});

export default Navbar;