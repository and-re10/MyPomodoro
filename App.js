import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, SafeAreaView, StatusBar, TouchableOpacity, Vibration } from 'react-native';
import Constants from 'expo-constants';
import {colors} from "./src/utils/colors";
import {Focus} from "./src/features/Focus";
import {Timer} from "./src/features/Timer";
import { FocusHistory } from "./src/features/FocusHistory";
import { useKeepAwake } from 'expo-keep-awake';
// pomodoro counter test
import { Countdown } from './src/components/Countdown';
import { ProgressBar } from 'react-native-paper';
import { spacing } from './src/utils/sizes';
import { RoundedButton } from './src/components/RoundedButton';
// import { Timing } from './src/features/Timing';



export default function App() {
  useKeepAwake();
  // const [currentSubject, setCurrentSubject] = useState(null);
  // const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Timer 
        // compt={compt}
        // setCompt={setCompt}
          // setfocusSubjet={setCurrentSubject}
          // focusSubject={currentSubject} 
          // onTimerEnd={(subject) => {
          //   setHistory([...history, subject])
          // }} 
          // clearSubject={() => setCurrentSubject(null)}
        />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    paddingTop: spacing.xxl,
    justifyContent: "center",
    alignItems: "center",
  },
  timingWrapper: {
    flex: 0.1,
    padding: spacing.lg,
    flexDirection: 'row'
  },
  clearSubjectWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center"
  },
  task: {
    color: colors.white,
    textAlign: "center"
  }
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//     backgroundColor: colors.darkBlue
//   },
//   buttonWrapper: {
//     flex: 0.3,
//     flexDirection: "row",
//     paddingTop: spacing.xxl,
//     justifyContent: "center",
//     alignItems: "center",
//   }
// });
