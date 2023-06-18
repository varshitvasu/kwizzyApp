import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Timer = forwardRef((props, ref, ref1) => {
    const timerRef = useRef(null);
    const endTimeRef = useRef(null);
    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        } else {
            handleTimerEnd();
            clearInterval(timerRef.current);
        }
    }

    const clearTimer = (e) => {
        setTimer(props.time === 60 ? '00:01:00' : '00:05:00');
        clearInterval(timerRef.current);
        // const id = setInterval(() => {
        //     startTimer(e);
        // }, 500);
        // timerRef.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + props.time);
        return deadline;
    }

    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);

    
  useEffect(() => {
    startNewTimer();
    return () => {
      clearTimer();
    };
  }, []);

    const handleTimerEnd = () => {
        console.log("camer");
        if(props.finish) {
            const {finish} = props;
            finish();
        } else {
            const {submit} = props;
            submit({target: {value:'Submit'}});
            clearTimer(getDeadTime());
        }
    };


    const startNewTimer = () => {
        const endTime = getDeadTime();
        endTimeRef.current = endTime;
        startTimer(endTime);
        clearTimer();
        const id = setInterval(() => {
          startTimer(endTime);
        }, 500);
        timerRef.current = id;
      };

    useImperativeHandle(ref, () => ({
        stopTimer: () => {
            clearInterval(timerRef.current);
        },
        startTime: () => {
            startNewTimer();
        }
    }));

    return (
        <span className="align-middle" style={{ marginLeft: '10px', color:'#B57EDC' }} >
            {timer}
        </span>
    )
});

export default Timer;