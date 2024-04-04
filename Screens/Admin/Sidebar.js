import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

function Sidebar({ toggle }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    toggle();
  };

  return (
    <View style={[styles.sidebar, isOpen ? styles.openSidebar : null]}>
      <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
        <Text style={styles.sidebarIcon}>☰</Text>
      </TouchableOpacity>
      <View style={styles.menu}>
        <Link to="/" style={styles.menuItem}>
          <Text style={styles.menuItemText}>Dashboard</Text>
        </Link>
        <Link to="/add-staff" style={styles.menuItem}>
          <Text style={styles.menuItemText}>Add Staff</Text>
        </Link>
        <Link to="/stafflist" style={styles.menuItem}>
          <Text style={styles.menuItemText}>Staff List</Text>
        </Link>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Modify Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#fff',
    padding: 10,
    width: '80%',
    height: '100%',
  },
  openSidebar: {
    marginLeft: 0,
  },
  toggleButton: {
    marginBottom: 10,
  },
  sidebarIcon: {
    fontSize: 24,
  },
  menu: {},
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Sidebar;