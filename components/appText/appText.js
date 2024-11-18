import React from "react";
import { Text, StyleSheet } from "react-native";

function AppText({ children, styleProp }) {
  return <Text style={[styles.textDec, styleProp]}>{children}</Text>;
}

export default AppText;

const styles = StyleSheet.create({
  textDec: {
    color: '#000',
    fontSize: 20,
  },
});
