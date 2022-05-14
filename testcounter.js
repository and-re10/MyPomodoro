// var date = new Date();
// var hour = date.getHours();
// var second = date.getSeconds();
// console.log(hour + ":" + second);
// var startHour = 0;
// var finishHour = 300;
// var work = {
//     cond: true,
//     compt: 0,
//     time: 30
// };
// var pause = {
//     cond: false,
//     compt: 0,
//     time: 5
// };
// var bigPause = {
//     cond: false,
//     compt: 0,
//     time: 15
// };

// var pauseUpdate = (compt, pauseTime, startH, pauseType) => {
//     let newCompt = compt + 1;
//     startH += pauseTime;
//     if (pauseType) {
//         console.log("Pause -> 5 min");
//     } else {
//         console.log("Big Pause -> 15 min");
//     };
    
//     console.log(startH);
//     return {
//         cond: false,
//         compt: newCompt,
//         time: 15
//     };
// };

// while (startHour < finishHour) {
//     if (work.cond){
//         work.cond = false;
//         work.compt += 1;
//         startHour += work.time;
//         if (work.compt % 4 === 0) {
//             bigPause.cond = true;
//         } else {
//             pause.cond = true;
//         };
//         console.log("Time to work !! -> 30 min");
//         console.log(startHour);
//     } else if (pause.cond) {
//         pause = pauseUpdate(pause.compt, pause.time, startHour, true)
//         // pause.cond = false;
//         // pause.compt += 1;
//         // startHour += pause.time;
//         work.cond = true;
//         // console.log("Pause -> 5 min");
//         // console.log(startHour);
//     } else if (bigPause.cond) {
//         bigPause = pauseUpdate(bigPause.compt, bigPause.time, startHour, false)
//         // bigPause.cond = false;
//         // bigPause.compt += 1;
//         // startHour += bigPause.time;
//         work.cond = true;
//         // console.log("Big Pause -> 15 min");
//         // console.log(startHour);
//     };
// };

// console.log(work);
// console.log(pause);
// console.log(bigPause);

// Small version (Best)
// var start = 0;
// var end = 450;
// var compt = 1;

// while (start < end) {
//     if (compt % 2 !== 0) {
//         compt++;
//         start += 30;
//         console.log("Time to work !! -> 30 min");
//     } else if (compt % 8 === 0) {
//         compt++;
//         start += 15;
//         console.log("Big Pause -> 15 min");
//     } else {
//         compt++;
//         start += 5;
//         console.log("Pause -> 5 min");
//     }
// }
// console.log(8 % 8 === 0);
// console.log(compt);
// console.log(start);
// End

import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';

{/* <Countdown 
    minutes={minutes}
    isPaused={!isStarted} 
    onProgress={setProgress} 
    onEnd={onEnd} /> */}

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
    const interval = useRef(null);
    const [ millis, setMillis ] = useState(null);
    const reset = () => setMillis(minutesToMillis(minutes));

    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                clearInterval(interval.current);
                onEnd(reset);
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
        onProgress(millis / minutesToMillis(minutes));
    }, [millis]);

    useEffect(() => {
        if (isPaused) {
            if (interval.current) clearInterval(interval.current);
            return;
        }
        interval.current = setInterval(Countdown, 1000);

        return () => clearInterval(interval.current);
    }, [isPaused]);

    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    return (
        <Text style={{
            fontSize: fontSizes.xxxl, 
            fontWeight: "bold", 
            color: colors.white, 
            padding: spacing.lg, 
            backgroundColor: 'rgba(94, 132, 226, 0.3'
        }}>
            { formatTime(minute) }:{ formatTime(seconds) }
        </Text>
    )


}