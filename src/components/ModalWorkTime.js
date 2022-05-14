import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

export const ModalWorkTime = ({setModalWorkVisible, modalWorkVisible, minutesArray, setSelectedWorkTime, selectedWorkTime}) => {
    

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Select your time to work</Text>
            <View style={{height: 300, width: 250, justifyContent: "center"}}>
                <Picker
                selectedValue={selectedWorkTime}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedWorkTime(itemValue)
                }>
                {minutesArray?.map((e, i) => {
                    return (
                    <Picker.Item key={i} label={e.toString()} value={e} />
                    )
                })}
                </Picker>
            </View>
            
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalWorkVisible(!modalWorkVisible)}
            >
                <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        width: "80%",
        height: "80%",
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginTop: 30,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
      }
})