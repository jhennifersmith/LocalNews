import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Pressable, Image } from "react-native";
import { FIRESTORE_DB } from "../fireBaseConfig";
import moment from 'moment';


import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
  } from "firebase/firestore";
import Login from "./login";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const RegisterNews = ({ navigation }: any) => {

    const [news, setNews] = useState("");
    const [newsDescription, setNewsDescription] = useState("");
    const currentDate = moment().format('YYYY-MM-DD');
    const [newsList, setNewsList] = useState<any[]>([]);
    // const [isLoggedIn, setIsLoggedIn] = useState();

    const addNews = async () => {
      const doc = addDoc(collection(FIRESTORE_DB, "News"), {
        title: news,
        description: newsDescription,
        currentDate : new Date().toISOString().slice(0, 10)
      });
      setNews("");   
      setNewsDescription("");
    };

    return (
      
        <View style ={styles.container}>
        <Text style={styles.label}>News title: </Text>
        <TextInput
          placeholder=""
          onChangeText={(t: string) => setNews(t)}
          value={news}
          style={styles.inputTitle}
        />
        <Text style={styles.label}>Describe the news: </Text>
        <TextInput
          placeholder=""
          onChangeText={(t: string) => setNewsDescription(t)}
          value={newsDescription}
          style={styles.inputDescription}
          multiline={true}
        />
        <TouchableOpacity
          onPress={() => addNews()}
          disabled={news === ""}
          style={styles.btnAdd}
        > Send </TouchableOpacity>
        <TouchableOpacity style={styles.btnList} onPress={() => navigation.navigate("EditNews")} > Edit news </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate("Login")} > Go to login page </TouchableOpacity>
      </View>
    );
  }
  export default RegisterNews;

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    label:{
        fontSize:18,
        padding: 3,
        margin: 5,
        color:"#000"
    },
    inputTitle:{
        margin: 5,
        height: 40,
        width: 300,
        padding: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#ffe5ec',
        marginVertical: 10,
        borderRadius: 5
    },
    inputDescription:{
        margin: 5,
        height: 200,
        width: 300,
        padding: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#ffe5ec',
        marginVertical: 10,
        borderRadius: 5
    },
    btnAdd:{
        margin: 5,
        width: 300,
        height: 40,
        backgroundColor: "#ff8fab",
        padding: 5,
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    btnList:{
        margin: 5,
        width: 300,
        height: 40,
        backgroundColor: "#000",
        padding: 5,
        textAlign: "center",
        justifyContent: "center",
        color: "#fff",
        borderRadius: 5
    }, 
    btnLogout:{
      margin: 5,
      width: 300,
      height: 40,
      backgroundColor: "#002",
      padding: 5,
      textAlign: "center",
      justifyContent: "center",
      color: "#fff",
      borderRadius: 5
  }
});