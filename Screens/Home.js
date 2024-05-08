import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={"./img1.jpg"}
          style={styles.logo}
          resizeMode='contain'
        />

        <Image
          source={"./img1.jpg"}
          style={styles.image}
          resizeMode='contain'
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Health is new{' '}
            <Text style={styles.highlight}>Rizz</Text>
          </Text>

          <Image
            source={"./img1.jpg"}
            style={styles.imagePath}
            resizeMode='contain'
          />
        </View>

        <Text style={styles.description}>
          Let's make DOCTOR's life easy.
        </Text>

        <Button
          title="Go to Login"
          onPress={() => navigation.replace('Login')}
          containerStyles={styles.button}
        />
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bcc3fb',
  },
  logo: {
    width: 130,
    height: 84,
  },
  image: {
    maxWidth: 320,
    width: '100%',
    height: 280,
  },
  textContainer: {
    position: 'relative',
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  highlight: {
    color: '#FF9C01',
  },
  imagePath: {
    width: 136,
    height: 18,
    position: 'absolute',
    bottom: -2,
    right: -8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFF',
    marginTop: 5,
  },
  button: {
    width: '100%',
    marginTop: 7,
    backgroundColor: '#FF9C01',
    borderRadius: 10,
    minHeight: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;