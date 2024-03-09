import { useCallback, useState } from 'react';
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.js';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((answer) => {
    console.log('Answer selected:', answer);
     setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
  }, [])

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  console.log('ANSWERS:', userAnswers);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz is Complete!</h2>
      </div>
    );
  }

  const answersToBeShuffled = QUESTIONS[activeQuestionIndex].answers;
  const shuffledAnswers = answersToBeShuffled.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      {
        <div id="question">
          <QuestionTimer key={activeQuestionIndex} timeOnTimer={5000} onTimeout={handleSkipAnswer} />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default Quiz;

// const Quiz = () => {
//   const [unansweredQuestions, setUnansweredQuestions] = useState(QUESTIONS);
//   const [answers, setAnswers] = useState([]);
//   const [newQuestion, setNewQuestion] = useState({
//     id: 'q0',
//     text: 'No Question',
//     answers: ['La', 'Lala', 'Lalala', 'Lalalala'],
//   });

//   const randomNumber = (max) => {
//     return Math.floor(Math.random() * max);
//   };

//   useEffect( () => {
//     const fetchUnansweredQuestions = async () => {
//       console.log('unansweredQuestions', unansweredQuestions);
//       const newIndex = randomNumber(unansweredQuestions.length);
//       const question = unansweredQuestions[newIndex];
//       await setNewQuestion(question);
//     }
//     fetchUnansweredQuestions()
//   }, [unansweredQuestions]);

//   const playerAnswer = async (id, index) => {
//     console.log('id:', id);
//     console.log('index:', index);
//     const newAnswer = { id: id, index: index };
//     await setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
//     await setUnansweredQuestions((unansweredQuestions) => {
//       unansweredQuestions.filter(
//         (unansweredQuestion) => unansweredQuestion.id !== id
//       );
//     });
//     console.log('answers', answers);
//   };

//   return (
//     <>
//       <h2>{newQuestion.text}</h2>
//       <ul>
//         {newQuestion.answers.map((answer, index) => {
//           return (
//             <li key={`${newQuestion.id}-${index}`}>
//               <button onClick={() => playerAnswer(newQuestion.id, index)}>
//                 {answer}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };
