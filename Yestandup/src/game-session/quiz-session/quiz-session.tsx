import { useState, useEffect } from 'react';
import { Button } from '../../components/button/button';

export const QuizSession = ({ sessionId }) => {
  const [session, setSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const currentQuestion = session.quiz.questions[currentQuestionIndex];
  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch(
        `http://localhost:5000/session/${sessionId}`
      );
      const data = await response.json();
      setSession(data);
    };
    fetchSession();
  }, [sessionId]);

  const submitAnswer = async () => {
    const response = await fetch(
      `http://localhost:5000/session/${sessionId}/submit-answer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: selectedAnswer }),
      }
    );
    if (response.ok) {
      console.log('Answer submitted');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      console.error('Error submitting answer');
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quiz Session: {session.quiz.quizName}</h1>
      <h2>{currentQuestion.questionText}</h2>
      <ul>
        {currentQuestion.answer.map((answer) => (
          <li key={answer} onClick={() => setSelectedAnswer(answer)}></li>
        ))}
      </ul>
      <Button label='Submit Answer' mode='primary' onClick={submitAnswer} />
    </div>
  );
};
