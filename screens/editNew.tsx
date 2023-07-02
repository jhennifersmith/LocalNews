import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FIRESTORE_DB } from "../fireBaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const EditNew = ({ navigation, route }: any) => {
  const { id } = route.params;
  const [news, setNews] = useState<any>({});

  const fetchNews = async () => {
    const colecao = doc(FIRESTORE_DB, "News", id);
    const colecaoSnapshot = await getDoc(colecao);
    if (colecaoSnapshot.exists()) {
      setNews({
        id: colecaoSnapshot.id,
        ...colecaoSnapshot.data(),
      });
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEditText = (key: string, t: string) => {
    setNews({
      ...news,
      [key]: t,
    });
  };

  const handleUpdateNews = async () => {
    const colecao = doc(FIRESTORE_DB, "News", id);
    await updateDoc(colecao, news);
    alert("Dados alterado com sucesso!");
    navigation.navigate("EditNews");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.inputTitle}
          value={news.title}
          onChangeText={(t) => handleEditText("title", t)}
        />
        <Text style={styles.label}>Describe the news: </Text>
        <TextInput
          style={styles.inputDescription}
          value={news.description}
          onChangeText={(t) => handleEditText("description", t)}
          multiline={true}
        />
        <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdateNews}>
          {" "}
          Update
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
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
  label: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 3,
    margin: 5,
    color: "#000",
  },
  title: {
    fontSize: 16,
    padding: 3,
    margin: 5,
    color: "#000",
  },
  description: {
    fontSize: 16,
    padding: 3,
    margin: 5,
    color: "#000",
  },
  date: {
    fontSize: 16,
    padding: 3,
    margin: 5,
    color: "#000",
  },
  btnUpdate: {
    margin: 5,
    width: 300,
    height: 40,
    backgroundColor: "#000",
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    color: "#fff",
    borderRadius: 5,
  },
});
