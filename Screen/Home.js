import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../Components/CustomButton'
import * as SQlite from "expo-sqlite"
import Search from './Search'
import DatePicker from 'react-native-datepicker'

const database = SQlite.openDatabase("dbName", 2.0)

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
        if (activity.length === 0) {
            Alert.alert("Please enter activity name.");
          }
          else if (date.length === 0){
            Alert.alert("Please enter date.")
          } 
          else if (reporter.length === 0){
            Alert.alert("Please enter reporter's name.")
          }
          else {
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

    const showResult = () => {
        navigation.navigate("Result");
    };

    const search = () => {
      navigation.navigate("Search");
    };
    
    const ConfirmDialog =() => {
      navigation.navigate("ConfirmDialog")
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
            placeholder="Activity Name (Required)"
            onChangeText={(value) => setActivity(value)}
            value={activity}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={(value) => setLocation(value)}
            value={location}
          />
           <DatePicker
          style={styles.datePicker}
          date={date}
          mode="date"
          placeholder="Date(Required)"
          format="DD-MM-YYYY"
          minDate="01-01-2015"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              marginLeft: 36,
              fontSize: 20,
            },
            dateIcon: {
              position: 'relative',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
          <TextInput
            style={styles.input}
            placeholder="Time of Attending"
            onChangeText={(value) => setTimeofattending(value)}
            value = {timeofattending}
          />
          <TextInput
            style={styles.input}
            placeholder="Name of Reporter (Required)"
            onChangeText={(value) => setReporter(value)}
            value={reporter}
          />
          <View style = {{flexDirection:"row"}}>
          <CustomButton title="Show All" handlePress ={showResult} />
          <CustomButton title="Search" handlePress = {search} />
          <CustomButton title="Submit" handlePress={submit}/>
          </View>
          <TouchableOpacity
          onPress={ConfirmDialog}
          style={styles.touch}>
            <Text
            style = {{
              alignItems:"center",
              justifyContent:"center",
              paddingHorizontal:20,
              fontSize:20,
              textTransform:"uppercase",
              color:"black"}}> Confirmation Diaglog</Text>
          </TouchableOpacity>

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
      textAlign: "left",
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
    datePicker: {
      alignItems: "center",
      justifyContent:"center",
      height:60,
      width: 370,
      fontSize:20,
    },
    touch:
    {
      paddingLeft: 2,
      width: 370,
      height: 50,
      borderWidth: 3,
      backgroundColor: "yellow",
      fontSize: 250,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      marginTop:20,
      marginHorizontal:5,
    }

  });

export default Home