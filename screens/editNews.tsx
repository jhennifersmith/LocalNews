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
  onSnapshot,
} from "firebase/firestore";

type Props = {
  item: {
    id: string;
    title: string;
    description: string;
    currentDate: string;
  }
}
const EditNews = ({ navigation }: any) => {
  const [news, setNews] = useState("");
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    const NewsRef = collection(FIRESTORE_DB, "News");
    const subscriber = onSnapshot(NewsRef, {
      next: (snapshot) => {
        const newsList: any[] = [];
        snapshot.docs.forEach((doc) => {
          newsList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setNewsList(newsList);
      },
    });
    return () => subscriber();
  }, []);

  const DeleteElement = async (id: any) => {
    try {
      const colection = collection(FIRESTORE_DB, "News");
      const element = doc(colection, id);
      await deleteDoc(element);
      alert("Element deleted successfully!");
    } catch (error) {
      alert("Delete erro!" + error);
    }
  };

  const EditElement = (id: any) => {
    navigation.navigate("EditNew", { id });
  };


  return (
    <View>
      <View style={styles.container}>
        {newsList.map((news) => (
          <>
            <View style={styles.new}>
              <View style={styles.box}>
                <Text style={styles.label}></Text>
                <Text style={styles.title} key={news.id}>
                  {" "}
                  {news.title}{" "}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.label}></Text>
                <Text style={styles.description} key={news.id}>
                  {" "}
                  {news.description}{" "}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.date} key={news.id}>
                  {" "}
                  {news.currentDate}{" "}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => EditElement(news.id)}
              >
                Edit
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => DeleteElement(news.id)}
              >
                Delete
              </TouchableOpacity>
            </View>
          </>
        ))}
      </View>
    </View>
  );
};
export default EditNews;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  box: {
    backgroundColor: "#ffe5ec",
    margin: 5,
    padding: 5,
    width: 300,
    borderRadius: 5,
  },
  new: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#ffe5ec",
    borderRadius: 5,
    marginTop: 10
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 3,
    margin: 5,
    color: "#000",
  },
  title: {
    // fontSize: 16,
    // padding: 3,
    // margin: 5,
    // color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    padding: 3,
    margin: 5,
    color: "#fb6f92",
  },
  description: {
    // fontSize: 16,
    // padding: 3,
    // margin: 5,
    // color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    padding: 3,
    margin: 5,
    color: "#000",
  },
  date: {
    fontSize: 14,
    padding: 3,
    color: "#000",
  },
  btnDelete: {
    margin: 5,
    width: 300,
    height: 40,
    backgroundColor: "#ff8fab",
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    color: "#fff",
    borderRadius: 5,
  },
  btnEdit: {
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
