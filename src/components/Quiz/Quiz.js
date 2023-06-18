import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import Questions from "../../Questions";
import { useLocation } from "react-router-dom";
import './Quiz.css'
import Timer from "../Timer/Timer";

function Quiz() {

    const location = useLocation();
    const props = location.state;

    const [details, setDetails] = useState();
    const [questions, setQuestions] = useState([Questions]);
    const [submit, setSubmit] = useState(false);
    const i = useRef(0);
    const score = useRef(0);
    const timerRef = useRef(null);
    const [Finish, setFinish] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [answer_status, setAnswerStatus] = useState('');
    const [showExplanation, setExplanation] = useState(false);
    const [slide, setSlide] = useState(false);
    const [quit, setQuit] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        setDetails(props);
        if (details) {
            setQuestions(Questions[details?.category][details?.level]);
        }
    })


    const handleSubmit = (event) => {
        if (event.target.value === 'Next') {
            i.current = i.current + 1;
            setSubmit(false);
            setSelectedOptions([])
            setAnswerStatus('')
            if (questions.length - 1 == i.current) {
                setFinish(true);
            }
            setExplanation(false);
            if(timerRef.current) {
                timerRef.current.startTime();
            }
        } else if(complete && event.target.value === 'Finish') {
            handleFinish();
        }else if (event.target.value === 'Submit' || event.target.value === 'Finish') {
            setSubmit(true);
            let options = questions[i.current].correct_answer;
            if(!options) {
                options = questions[0].correct_answer;
            }
            console.log(options, "options");
            setCorrectAnswers(options);
            let count = 0;
            for (let j = 0; j < selectedOptions.length; j++) {
                if (options.includes(selectedOptions[j])) {
                    count = count + 1;
                } else {
                    count = count - 1;
                    // setAnswerStatus('wrong');
                }
            }
            if (count == options?.length) {
                // setAnswerStatus('correct');
                score.current = score.current + 1;
            } else {
                // setAnswerStatus('wrong');
            }
            console.log(timerRef.current);
            if(timerRef.current) {
                console.log("in timerRef");
                timerRef.current.stopTimer();
            }
            if(event.target.value === 'Finish') {
                setComplete(true);
            }
        }

    }

    const handleFinish = () => {
        // handleSubmit({target: {value:'Finish'}});
        setQuit(true);
    }

    const handleExplanation = () => {
        setExplanation(!showExplanation);
            setSlide(true);
    }

    const handleOption = useCallback((index) => {
        if (selectedOptions.includes(index)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== index));
        } else {
            setSelectedOptions([...selectedOptions, index]);
        }
    }, [selectedOptions]);

    const handleQuit = () => {
        setQuit(true);
    }

    return (
        <React.Fragment>

            <div className="topbar d-flex align-items-center flex-row-reverse">
                {!complete && <h2><Timer finish={handleQuit} time={300} /></h2>}
            </div>

            <div className="quiz d-flex align-items-center justify-content-center flex-column">

                {!quit &&
                    <React.Fragment>
                        <h4 className="title mb-3">{details?.category} quiz</h4>
                        <div className="card transparent">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h4>Score: {score.current}</h4>
                                <h4><Timer ref={timerRef} time={60} submit={handleSubmit} buttonId={i.current} /></h4>
                            </div>
                        </div>
                    </React.Fragment>
                }
                {
                    questions&&!quit &&
                        <React.Fragment>
                            <div class="card border-secondary transparent mt-2">
                                <div class="card-header">Question {i.current + 1}</div>
                                <div class="card-body">
                                    <h5 class="card-title">{questions[i.current].question}</h5>
                                    <p class="card-text">
                                        {
                                            questions && questions[i.current]?.options?.map((option, index) => <div key={index} onClick={() => handleOption(index)} className={`option ${submit ? 'disabled' : ''} ${submit && correctAnswers?.includes(index)?'correct':''} ${submit && !correctAnswers?.includes(index)?'wrong':''} p-2 m-2 ${selectedOptions.includes(index) ? `selected`: ''}`}>
                                                {option}
                                            </div>)

                                        }
                                    </p>
                                    <div className="mr-auto">
                                        <button className="btn btn-outline-secondary me-2" onClick={handleExplanation} disabled={!submit}>Explanation</button>
                                        {!Finish ? <button className="btn btn-outline-primary" id="submit" onClick={handleSubmit} value={submit ? 'Next' : 'Submit'}>
                                            {submit ? 'Next' : 'Submit'}

                                        </button> : <button className="btn btn-outline-success me-2" id="finish" value="Finish" onClick={handleSubmit}>Finish Attempt</button>}
                                    </div>
                                </div>

                                {showExplanation && <div className={`card-body explanation ${slide ? 'show' : ''}`}>
                                    {slide && questions[i.current].explanation}
                                </div>}

                            </div>
                        </React.Fragment>
                }
                {
                    quit && <div style={{textAlign:'center', color:'white'}}>
                    <h2>Your Quiz is Completed.</h2>
                    <h4 className="mt-2">Your score is {score.current}</h4>
                    </div>
                }
            </div>

        </React.Fragment>
    )
}

export default Quiz;