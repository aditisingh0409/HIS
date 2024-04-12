// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { IconButton, Button, Menu, Divider, PaperProvider } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';

// function Navbar({ Toggle }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigation = useNavigation();
  
//   const [visible, setVisible] = useState(false);
//   const openMenu = () => setVisible(true);
//   const closeMenu = () => setVisible(false);
  
//   return (
//     <View style={styles.navbar}>
//       <TouchableOpacity onPress={Toggle} style={styles.sidebarToggle}>
//         <IconButton icon="menu" size={30} color="white" />
//       </TouchableOpacity>
//       <View style={styles.logoContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('Doctor')}>
//           <Image
//             source={require('./img1.jpg')}
//             style={styles.logo}
//           />
//         </TouchableOpacity>
//       </View>

//       <PaperProvider>
//         <View style={styles.profileContainer}>
//           <Button onPress={openMenu}>
//             <Image source={require('../Images/img.jpeg')} style={styles.profileImage} />
//           </Button>
//           <Menu
//             visible={visible}
//             onDismiss={closeMenu}
//             anchor={<View style={{ position: 'absolute', top: 0, right: 0 }} />}
//           >
//             <Menu.Item onPress={() => {}} title="View Profile" />
//             <Menu.Item onPress={() => {}} title="Update Profile" />
//             <Menu.Item onPress={() => {}} title="Change Password" />
//             <Divider />
//             <Menu.Item onPress={() => {}} title="Logout" />
//           </Menu>
//         </View>
//       </PaperProvider>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   navbar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#000',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   sidebarToggle: {
//     marginRight: 10,
//   },
//   logoContainer: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'relative', // Ensure proper positioning of the menu
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
// });

// export default Navbar;


import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconButton, Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Navbar({ Toggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  
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

      <PaperProvider>
        <View style={styles.profileContainer}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}><Image source={require('../Images/img.jpeg')} style={styles.profileImage} /></Button>}>
            <Menu.Item onPress={() => {}} title="View Profile" />
            <Menu.Item onPress={() => {}} title="Update Profile" />
            <Menu.Item onPress={() => {}} title="Change Password" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Logout" />
          </Menu>
        </View>
      </PaperProvider>
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
    alignItems: 'flex-end',
  },
  logo: {
    width: 40,
    height: 40,
  },
  profileContainer: {
    flex: 1,
    alignContent: 'flex-end',
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
});

export default Navbar;