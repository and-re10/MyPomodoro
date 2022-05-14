import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform, Vibration, TouchableOpacity, Pressable, Modal } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";
import { Timing } from "./Timing";
import { Picker } from '@react-native-picker/picker';
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

// Modals
import { ModalWorkTime } from "../components/ModalWorkTime";
import { ModalPauseTime } from "../components/ModalPauseTime";
import { ModalBigPauseTime } from "../components/ModalBigPauseTime";


const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS
]

export const Timer = ({}) => {
  useKeepAwake();

  const [selectedWorkTime, setSelectedWorkTime] = useState(25);
  const [selectedPauseTime, setSelectedPauseTime] = useState(5);
  const [selectedBigPauseTime, setSelectedBigPauseTime] = useState(15);

  const [modalWorkVisible, setModalWorkVisible] = useState(false);
  const [modalPauseVisible, setModalPauseVisible] = useState(false);
  const [modalBigPauseVisible, setModalBigPauseVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState()

  const [reset, setReset] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.3);
  const [minutesArray, setMinutesArray] = useState(() => {
    let newArray = [];
    for (let i = 1; i <= 60; i++) {
      newArray.push(i)
    }
    return newArray;
  });
  
  // useEffect(() => {
  //   console.log(minutesArray)
  // }, [])

  useEffect(() => {
    if (selectedWorkTime !== 0) {
      setMinutes(selectedWorkTime)
    }
  }, [selectedWorkTime])
  


  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    // setIsStarted(false);
    // setProgress(1);
    reset();
    // onTimerEnd(focusSubject);
    // setfocusSubjet(false);
  }
  return (
    <View style={styles.container}>
      {/* Start Modals */}
      {/* Work */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalWorkVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalWorkVisible(!modalWorkVisible);
        }}
      >
        <ModalWorkTime 
          setModalWorkVisible={setModalWorkVisible}
          modalWorkVisible={modalWorkVisible}
          minutesArray={minutesArray}
          setSelectedWorkTime={setSelectedWorkTime}
          selectedWorkTime={selectedWorkTime}
        />
      </Modal>
      {/* Pause */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPauseVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalPauseVisible(!modalPauseVisible);
        }}
      >
        <ModalPauseTime 
          setModalPauseVisible={setModalPauseVisible}
          modalPauseVisible={modalPauseVisible}
          minutesArray={minutesArray}
          setSelectedPauseTime={setSelectedPauseTime}
          selectedPauseTime={selectedPauseTime}
        />
      </Modal>
      {/* Big Pause */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalBigPauseVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalBigPauseVisible(!modalBigPauseVisible);
        }}
      >
        <ModalBigPauseTime 
          setModalBigPauseVisible={setModalBigPauseVisible}
          modalBigPauseVisible={modalBigPauseVisible}
          minutesArray={minutesArray}
          setSelectedBigPauseTime={setSelectedBigPauseTime}
          selectedBigPauseTime={selectedBigPauseTime}
        />
      </Modal>
      {/* End Modals */}
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={setProgress} 
          onMinutes={setMinutes}
          selectedWorkTime={selectedWorkTime}
          selectedPauseTime={selectedPauseTime}
          selectedBigPauseTime={selectedBigPauseTime}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          getReset={reset}
          setReset={setReset}
          onEnd={onEnd} />
          <View style={{flexDirection: "row", width: "80%", justifyContent: "center"}}>
            <View style={{marginTop: spacing.xxl, padding: spacing.md, borderRadius: 10, backgroundColor: selectedAction === "work" ? colors.progressBar : "white"}}>
              <Text style={styles.title}>Work Time</Text>
              <Text style={styles.task}>{selectedWorkTime} min</Text>
            </View>
            <View style={{marginTop: spacing.xxl, padding: spacing.md, borderRadius: 10, backgroundColor: selectedAction === "pause" ? colors.progressBar : "white"}}>
              <Text style={styles.title}>Pause Time</Text>
              <Text style={styles.task}>{selectedPauseTime} min</Text>
            </View>
            <View style={{marginTop: spacing.xxl, padding: spacing.md, borderRadius: 10, backgroundColor: selectedAction === "big pause" ? colors.progressBar : "white"}}>
              <Text style={styles.title}>Big Pause Time</Text>
              <Text style={styles.task}>{selectedBigPauseTime} min</Text>
            </View>
          </View>
        
        {/* <View style={{paddingTop: spacing.xxl}}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View> */}
      </View>
      <View style={{paddingTop: spacing.xl, paddingBottom: spacing.xl}}>
        <ProgressBar 
          progress={progress}
          color={colors.progressBar}  
          style={{ height: spacing.sm, height: 12 }}
        />
      </View>
      {/* <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes}/>
      </View> */}
      
      <View style={{marginTop: 20, marginBottom: 50}}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalWorkVisible(true)}
        >
          <Text style={styles.textStyle}>Work Time</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalPauseVisible(true)}
        >
          <Text style={styles.textStyle}>Pause Time</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalBigPauseVisible(true)}
        >
          <Text style={styles.textStyle}>Big Pause Time</Text>
        </Pressable>
        {/* <Picker
          selectedValue={selectedWorkTime}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedWorkTime(itemValue)
          }>
          {minutesArray?.map((e, i) => {
            return (
              <Picker.Item key={i} label={e.toString()} value={e} />
            )
          })} */}
          {/* <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
        {/* </Picker> */}
      </View>
      <View style={styles.buttonWrapper}>
          {!isStarted ? (
            <TouchableOpacity style={{backgroundColor: colors.progressBar, height: 50, width: 150, borderRadius: 25, justifyContent: "center", alignItems: "center"}} onPress={() => {
              setIsStarted(true)
              setSelectedAction("work");
            }}>
              <Text style={{fontSize: 20}}>Start</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{backgroundColor: "#F194FF", height: 50, width: 150, borderRadius: 25, justifyContent: "center", alignItems: "center"}} onPress={() => {
              setIsStarted(false)
              // setSelectedAction();
            }}>
              <Text style={{fontSize: 20}}>Stop</Text>
            </TouchableOpacity>
          )
          }
          <TouchableOpacity style={{backgroundColor: "orange", height: 50, width: 150, borderRadius: 25, justifyContent: "center", alignItems: "center"}} onPress={() => {
              setIsStarted(false)
              // setMinutes(selectedWorkTime);
              setReset(true)
              setProgress(1)
            }}>
              <Text style={{fontSize: 20}}>Reset</Text>
            </TouchableOpacity>
        </View>
      {/* <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)}/>
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)}/>
        )
        }
      </View> */}
      {/* <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject}/>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    // flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  buttonWrapper: {
    // flex: 0.3,
    flexDirection: "row",
    paddingTop: spacing.xxl,
    justifyContent: "center",
    alignItems: "center",
  },
  timingWrapper: {
    // flex: 0.1,
    padding: spacing.lg,
    flexDirection: 'row'
  },
  clearSubjectWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  title: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  task: {
    color: "black",
    textAlign: "center"
  },
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
    marginBottom: 15
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
    marginBottom: 15,
    textAlign: "center"
  }
})