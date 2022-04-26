import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ResultItem = ({result, navigation }) => {
  return (
    <View style= {styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.Id}>Id: {result.Id}</Text>
        <Text style={styles.text}>Activity Name: {result.Activity} </Text>
        <Text style={styles.text}>Location: {result.Location}</Text>
        <Text style={styles.text}>Date: {result.Date}</Text>
        <Text style={styles.text}>Time of attending: {result.Timeofattending}</Text>
        <Text style={styles.text}>Name of reporter: {result.Reporter}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: "2%",
        backgroundColor: "#eee",
        borderRadius: 5,
        marginBottom: "5%",
      },
      text: {
        fontSize: 20,
        fontWeight: "bold",
      },
      textTitle: {
        fontSize: 40,
          fontWeight: "bold",
          margin: 15,
      },
      Id:{
        fontSize: 40,
        fontWeight: "bold",
        margin: 15,
        color:"green"
      }
})

export default ResultItem;