import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

function Navbar({ toggle }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={toggle} style={styles.sidebarToggle}>
        <Text style={styles.sidebarIcon}>☰</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Link to="/">
          <Text style={styles.logo}>HIS</Text>
        </Link>
      </View>
      <View style={styles.dropdown}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Text>Profile Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding: 10,
  },
  sidebarToggle: {
    marginRight: 10,
  },
  sidebarIcon: {
    fontSize: 24,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
  },
  dropdown: {
    alignItems: 'center',
  },
  profileImageContainer: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
});

export default Navbar;