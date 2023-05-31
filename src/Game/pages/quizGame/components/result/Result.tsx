import "./result.css"
import { FC, ReactElement, useContext, useState } from "react"
import { QuizContext, allowedActions } from "../../../../contexts/QuizContext"
import { getStarsIcons } from "../../../../helpers/getIcons"

import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError
} from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";




const ShowResult:FC = ():ReactElement => {
  const { publicKey, requestTransaction } = useWallet();


  const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();


    const provingKeyUrl = 'https://provers.s3.us-west-2.amazonaws.com/mint.prover';

    const score = quizContext?.state.score
    const inputs = [publicKey, `${score}u64`];

    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      'quiz_token.aleo',
      'mint',
      inputs,
      provingKeyUrl
    );

    if (requestTransaction) {
      
      await requestTransaction(aleoTransaction);
    }
  };
  
  const quizContext = useContext(QuizContext)
  const dispatch = quizContext?.dispatch
  const totalQuestions = quizContext!.state.questions.length
  const correctAnswers = quizContext!.state.assertedAnswersCount
  const score = quizContext?.state.score 
 
  const calcAssertPercetage = () => {
    const assertPercetage = (correctAnswers * 100) / totalQuestions
    return assertPercetage
  }

 

  function AlertMessage() {
    alert('Wait a few seconds till the pop-up window appear.');
  }
  

  return (
    <div className="result-wrap">
      
      <div className="result-header">
        <p>Congratulations 👏👏👏</p>
      </div>
      
      <div className="result-body container">
        
        <small className="stars-wrap">
          {getStarsIcons(calcAssertPercetage())}
        </small>
        
        <div className="score-wrap">
          <small>Score: </small>
          <small className="score-amount">{score}</small>
        </div>

        <span>Answered {correctAnswers} from {totalQuestions} questions</span>
        


        <button 
          className="reset-btn"
          onClick={() => {
            onClick();
            AlertMessage();
        }}
        >
          Mint Points!
        </button>



      </div>
    </div>
  );
};



export default ShowResult;

