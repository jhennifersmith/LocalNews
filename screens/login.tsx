import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-web";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "158918239383-67pbeq0u2ulvjn3baveg19s7c2b2ik37.apps.googleusercontent.com",
    iosClientId:
      "158918239383-de4c44adk7t7rdpqkdj1evfu88ed3qoo.apps.googleusercontent.com",
    webClientId:
      "158918239383-fg34ihvdt93h5cdcpgdcglf1j97img1n.apps.googleusercontent.com",
    expoClientId:
      "158918239383-pvejooks1fhl7ulj7v1p4ihqn54volcf.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      setIsLoggedIn(true);
    } catch (error) {
      //add error handler here
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("@user");
    setIsLoggedIn(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.logo}>Alegre News</Text>
        <Text style={styles.credit}>Code by Jhenni</Text>
        {!isLoggedIn && (
          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => promptAsync()}
          >
            Sign in with Google
          </TouchableOpacity>
        )}
        {isLoggedIn && <Text>You're logged xD </Text>}
        {isLoggedIn && (
          <TouchableOpacity
            style={styles.btnEnter}
            onPress={() => navigation.navigate("Roles")}
          >
            Enter
          </TouchableOpacity>
        )}
        {isLoggedIn && (
          <TouchableOpacity style={styles.btnLogout} onPress={logout}>
            Logout
          </TouchableOpacity>
        )}
        <StatusBar style="auto" />
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  credit: {
    fontSize: 18,
    marginBottom: 10,
    color: "#ff8fab",
  },
  btnSignIn: {
    margin: 5,
    width: 300,
    height: 50,
    backgroundColor: "#83c5be",
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    color: "#000",
    borderRadius: 5,
    fontSize: 18,
  },
  btnEnter: {
    margin: 5,
    width: 300,
    height: 40,
    backgroundColor: "#83c5be",
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    color: "#000",
    borderRadius: 5,
  },
  btnLogout: {
    margin: 5,
    width: 300,
    height: 40,
    backgroundColor: "#ff8fab",
    padding: 5,
    textAlign: "center",
    justifyContent: "center",
    color: "#000",
    borderRadius: 5,
  },
});
