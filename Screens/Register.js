import React, { useState } from "react"; 
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import img1 from './img1.jpg';

const RegisterScreen = (props) => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const onPressLogin = () => {
      console.log("Login");
      props.navigation.navigate("Login");
    }

    return (
        <ImageBackground source={img1} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                />
                <TextInput
                placeholder="Email"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                />
                <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                />
                <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.registerLink}>Not a member?
                <Pressable onPress={onPressLogin}>
                    <Text style={styles.login}> Login</Text>
                </Pressable></Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    
    );
};

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      borderRadius: 20,
      width: '80%',
      height: '40%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    title: {
      fontSize: 30,
      color: '#1B1B1B',
      fontWeight: '500',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#E8E8E8',
      width: '90%',
      height: 40,
      color: '#6D6D6D',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    button: {
      backgroundColor: '#4F2197',
      width: '90%',
      padding: 10,
      borderRadius: 10,
      marginVertical: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },
    login: {
      color: '#2974D3',
      fontWeight: '500',
      marginVertical: 5,
    },
    registerLink: {
      fontSize: 15,
      color: 'black',
      marginVertical: 5,
    },
  });

export default RegisterScreen