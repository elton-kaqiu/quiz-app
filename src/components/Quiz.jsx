import {useState} from "react";
import QUESTIONS from "../questions.js";
import quizCompleted from '../assets/quiz-complete.png'
import {QuestionTimer} from "./QuestionTimer.jsx";

export const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    function handelSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        })

    }

    if (quizIsComplete) {
        return (
            <div id='summary'>
                <img src={quizCompleted} alt='Trophy icon'/>
                <h2>Quiz Completed!</h2>
            </div>
        )
    }
    const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswer.sort(() => Math.random() - 0.5)
    return (
        <div id='quiz'>
            <div id='question'>
                <QuestionTimer timeout={10000}
                               onTimeout={() => handelSelectAnswer(null)}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {shuffledAnswer.map(answer => (
                        <li key={answer} className='answer'>
                            <button onClick={() => handelSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}