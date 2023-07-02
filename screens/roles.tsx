import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ViewNews from './viewNews';
import RegisterNews from './registerNews';

const Role = ({ navigation }) => {

  const [isAdmin, setIsLoggedIn] = useState(true);
  const isUser = true;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your role:</Text>
      <TouchableOpacity style={styles.btnAdmin} onPress={() => navigation.navigate("RegisterNews", {isAdmin})} >Admin</TouchableOpacity>
      <TouchableOpacity style={styles.btnUser} onPress={() => navigation.navigate("ViewNews", {isUser})}>User </TouchableOpacity>
    </View>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    fontSize:18,
    padding: 3,
    margin: 5,
    color:"#000",
    alignItems: "center"
},
  btnAdmin: {
    margin: 5,
    width: 300,
    height: 40,
    backgroundColor: "#fb6f92",
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    color: "#fff",
    borderRadius: 5,
  },
  btnUser: {
    margin: 5,
    width: 300,
    height: 40,
    backgroundColor: "#ff8fab",
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    color: "#fff",
    borderRadius: 5,
  }
});