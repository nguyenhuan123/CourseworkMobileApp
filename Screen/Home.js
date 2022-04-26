import { View, Text, Alert, TextInput, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../Components/CustomButton'
import * as SQlite from "expo-sqlite"

const database = SQlite.openDatabase("dbName", 1.0)

const Home = ({navigation}) => {
    const [activity, setActivity] = useState("")
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [timeofattending, setTimeofattending] = useState("");
    const [reporter, setReporter] = useState("");

    useEffect(() =>{
        createTable();
    }, []);

    const submit = () => {
        if (activity.length === 0 || location.length === 0 || date.length === 0 
            || timeofattending.length === 0|| reporter.length === 0) {
            Alert.alert("Warning !!! Please enter inputs !!!");
          } else {
            try {
              database.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO DATABASE (Activity, Location, Date, Timeofattending, Reporter) VALUES (?,?,?,?,?);",
                  [activity, location, date, timeofattending, reporter],
                  (tx, results) => {
                    console.log(results.rowsAffected);
                  }
                );
              });
              Alert.alert("Input Entered")
              navigation.navigate("Result");
            } catch (error) {
              console.log(error);
            }
          }
    };

    const showResult = () =>{
        navigation.navigate("Result");
    };
    const createTable = () => {
        database.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, Activity TEXT, Location TEXT, Date TEXT, Timeofattending TEXT, Reporter TEXT);"
          );
        });
      };
      return (
        <View style={styles.body}>
          <Text style={styles.text}>Home</Text>
          <TextInput
            style={styles.input}
            placeholder="Activity Name"
            onChangeText={(value) => setActivity(value)}
            value={activity}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={(value) => setLocation(value)}
            value={location}
          />
           <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={(value) => setDate(value)}
            value={date}
          />
           <TextInput
            style={styles.input}
            placeholder="Time of attending"
            onChangeText={(value) => setTimeofattending(value)}
            value={timeofattending}
          />
           <TextInput
            style={styles.input}
            placeholder="Name of Reporter"
            onChangeText={(value) => setReporter(value)}
            value={reporter}
          />
          <View style = {{flexDirection:"row"}}>
          <CustomButton title="Show All" handlePress ={showResult} />
          <CustomButton title="Search" />
          <CustomButton title="Submit" handlePress={submit}/>
          </View>
        </View>
        )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    text: {
      fontSize: 40,
      fontWeight: "bold",
      margin: 15,
    },
    input: {
      borderWidth: 1,
      height: 50,
      width: 300,
      borderRadius: 5,
      textAlign: "center",
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
  });

  export default Home;