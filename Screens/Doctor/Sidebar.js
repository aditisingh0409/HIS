import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Sidebar({ Toggle }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    Toggle();
  };

  return (
    <View style={[styles.sidebar, !isOpen && styles.closedSidebar]}>
      <View style={styles.menuIconContainer}>
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.brandNameContainer}>
        <Text style={styles.brandName}>HIS</Text>
      </View>
      <View style={styles.menuItemsContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemIcon}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemIcon}>Patient List</Text>
        </TouchableOpacity>
        {/* Add more menu items as needed */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  closedSidebar: {
    width: 50,
  },
  menuIconContainer: {
    alignSelf: 'flex-start',
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  brandNameContainer: {
    marginVertical: 10,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItemsContainer: {
    flexDirection: 'column',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemIcon: {
    fontSize: 16,
  },
});

export default Sidebar;