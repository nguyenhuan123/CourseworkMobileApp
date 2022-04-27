import * as SQLite from "expo-sqlite";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import Search from "./Search";

const db = SQLite.openDatabase("dbName", 2.0);

const Detail  = ({ route, navigation }) => {
  const { result } = route.params;


  const deleteItem = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM DATABASE WHERE id = ?",
          [result.Id],
          (tx, result) => {
            Alert.alert("Deleted!!!");
            navigation.navigate("Home");
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (         
    <View style={styles.body}>
    <View
    style = {{
    justifyContent:"center",
    marginBottom: 150
    }}>
    <Text
    style = {{
    fontSize: 40,
    fontWeight: "bold",
    margin: 15,
    }} >Detail</Text>
    </View>
      <Text style = {styles.text}>ActivityName: {result.Activity}</Text>
      <Text style = {styles.text}>Location: {result.Location}</Text>
      <Text style = {styles.text}>Date: {result.Date}</Text>
      <Text style = {styles.text}>Time of Attending: {result.Timeofattending}</Text>
      <Text style = {styles.text}>Name of Reporter: {result.Reporter}</Text>
      <CustomButton title="DELETE" handlePress = {deleteItem}/>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text:{
      fontSize:25,
      justifyContent:"flex-start"
  }
});
export default Detail;