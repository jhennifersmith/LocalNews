// import * as React from "react";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Button } from "react-native-web";

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
//   const [userInfo, setUserInfo] = React.useState(null);
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId:
//       "158918239383-67pbeq0u2ulvjn3baveg19s7c2b2ik37.apps.googleusercontent.com",
//     iosClientId:
//       "158918239383-de4c44adk7t7rdpqkdj1evfu88ed3qoo.apps.googleusercontent.com",
//     webClientId:
//       "158918239383-fg34ihvdt93h5cdcpgdcglf1j97img1n.apps.googleusercontent.com",
//   });

//   React.useEffect(() => {
//     handleSignInWithGoogle();
//   }, [response]);

//   async function handleSignInWithGoogle() {
//     const user = await AsyncStorage.getItem("@user");
//     if (!user) {
//       if (response?.type === "success") {
//         await getUserInfo(response.authentication.accessToken);
//       }
//     } else {
//       setUserInfo(JSON.parse(user));
//     }
//   }

//   const getUserInfo = async (token) => {
//     if (!token) return;
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const user = await response.json();
//       await AsyncStorage.setItem("@user", JSON.stringify(user));
//       setUserInfo(user);
//     } catch (error) {
//       //add error handler here
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>{JSON.stringify(userInfo)}</Text>
//       <Text>Code with Jhenni</Text>
//       <Button title="Sign in with Google" onPress={() => promptAsync()} />
//       <Button title="delete local storage" onPress={() => AsyncStorage.removeItem("@user")}/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterNews from "./screens/registerNews";
import Login from "./screens/login";
import ViewNews from "./screens/viewNews";
import Roles from "./screens/roles";
import EditNews from "./screens/editNews";
import EditNew from "./screens/editNew";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Roles" component={Roles} />
        <Stack.Screen name="RegisterNews" component={RegisterNews} />
        <Stack.Screen name="ViewNews" component={ViewNews} />
        <Stack.Screen name="EditNews" component={EditNews} />
        <Stack.Screen name="EditNew" component={EditNew} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
