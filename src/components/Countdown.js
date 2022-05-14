import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minutes = 0.3, isPaused, onProgress, onMinutes, selectedWorkTime, selectedPauseTime, selectedBigPauseTime, selectedAction, setSelectedAction, getReset, setReset, onEnd }) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);
  const [ compt, setCompt ] = useState(1);

  const reset = () => setMillis(minutesToMillis(minutes));
  // if (compt % 2 !== 0) {
    //   setMillis(minutesToMillis(0.3))
    //   // compt++;
    //   // start += 30;
    //   console.warn("Time to work !! -> 30 min");
    // } else if (compt % 8 === 0) {
    //   setMillis(minutesToMillis(0.2))
    //   // compt++;
    //   // start += 15;
    //   console.warn("Big Pause -> 15 min");
    // } else {
    //   setMillis(minutesToMillis(0.1))
    //   // compt++;
    //   // start += 5;
    //   console.warn("Pause -> 5 min");
    // }

  const countDown = () => {
    setMillis((time) => {
      if (time === 0 || getReset) {
        // clearInterval(interval.current);
        // onCompt(2)
        // console.log(compt)
        // setCompt(compt + 1)

        onProgress(1)
        onEnd(reset);
        // interval.current = setInterval(countDown, 1000);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    })
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (millis === 0) {
      setTimeout(() => {
        setCompt( compt + 1)
        
        var newCompt = compt + 1;
        console.log(newCompt)
        if (newCompt % 2 !== 0) {
          onMinutes(selectedWorkTime)
          setMillis(minutesToMillis(selectedWorkTime))
          setSelectedAction("work")
          // compt++;
          // start += 30;
          console.warn(`Time to work !! -> ${selectedWorkTime} min`);
        } else if (newCompt % 8 === 0) {
          onMinutes(selectedBigPauseTime)
          setMillis(minutesToMillis(selectedBigPauseTime))
          setSelectedAction("big pause")
          // compt++;
          // start += 15;
          console.warn(`Big Pause -> ${selectedBigPauseTime} min`);
        } else {
          onMinutes(selectedPauseTime)
          setMillis(minutesToMillis(selectedPauseTime))
          setSelectedAction("pause")
          // compt++;
          // start += 5;
          console.warn(`Pause -> ${selectedPauseTime} min`);
        }
      }, 1000)
    }
    onProgress(millis / minutesToMillis(minutes));
  }, [millis])

  useEffect(() => {
    if (getReset) {
      setCompt(1)
      reset();
      setReset(false);
    }
  }, [getReset])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused])

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  
  return (
    <>
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
    {/* <Text>{compt}</Text> */}
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    marginTop: 20
  }
})