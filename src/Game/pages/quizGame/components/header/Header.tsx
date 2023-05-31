import "./header.css"
import { QuizContext } from "../../../../contexts/QuizContext"
import { FC, ReactElement, useContext } from "react"
import { getLifeIcons } from "../../../../helpers/getIcons"
import Navbar from "../navbar/Navbar";


const Header:FC = (): ReactElement => {
  
  const quizContext = useContext(QuizContext)
  
  const score = quizContext?.state.score
  const totalQuestions = quizContext?.state.questions.length 
  const currentQuestionIndex = quizContext?.state.currentQuestionIndex
  const currentQuestionIndexShow = currentQuestionIndex! + 1 
  const life = quizContext!.state.life

  return (
    
    <>

      <div className="header">
      <Navbar/>
        <span className="score">Points: {score}</span>
        <span className="index">Question {currentQuestionIndexShow} of {totalQuestions}</span>
        <span className="score" style={{marginTop: ".5rem"}}>{getLifeIcons(life)}</span>

      </div>
    </>
  )
}

export default Header
