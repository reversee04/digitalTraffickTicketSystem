import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={styles.leftContainer}>
        <Text style={styles.loginTitle}>Login</Text>
        <Text style={styles.subTitle}>
          Don't Have an Account? <Text style={styles.linkText}>Create your Account</Text>
        </Text>
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#ccc" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
        <Text style={styles.forgotPassword}>Forget Password?</Text>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

  
      <View style={styles.rightContainer}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.descriptionText}>
          Simply Create your account by clicking the Signup Button
        </Text>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", 
    backgroundColor: "#f4f4f4",
  },
  leftContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  linkText: {
    color: "#6A5ACD",
    textDecorationLine: "underline",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  forgotPassword: {
    color: "#6A5ACD",
    textAlign: "right",
    marginBottom: 20,
  },
  signInButton: {
    height: 50,
    backgroundColor: "#6A5ACD",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    color: "#fff",
    fontWeight: "bold",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A5ACD",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  signUpButton: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  signUpText: {
    color: "#6A5ACD",
    fontWeight: "bold",
  },
});
