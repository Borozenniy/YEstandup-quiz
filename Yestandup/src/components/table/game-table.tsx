import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../../modal/modal-provider';
import { QuestionCard } from '../question-card/question-card';
import { Button } from '../button/button';
import './table.scss';

type GameTableProps = {
  session: any;
  chooseQuestion: any;
};
//quiz.quiz.quiz.map
export const GameTable = ({ session, chooseQuestion }: GameTableProps) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const { openModal } = useContext(ModalContext) as any;

  const handleChooseQuestion = (row, column) => {
    chooseQuestion(row, column);
    //setShowQuestion(true);
    //showQuestionModal(row, column);
  };

  //const showQuestionModal = (row, column) => {
  //  openModal(
  //    <div style={{ width: '500px' }}>
  //      <h1>Question</h1>
  //      <p>{session.quiz.quiz[row].columns[column].question}</p>
  //      <p>{session.quiz.quiz[row].columns[column].answer}</p>
  //    </div>
  //  );
  //};

  const showActiveQuestionModal = (activeQuestion) => {
    openModal(
      <>
        <QuestionCard session={session} currentQuestion={activeQuestion} />
      </>
    );
  };
  //useEffect(() => {
  //  if (session?.activeQuestion?.length > 0 && session?.quiz?.quiz) {
  //    let activeQuestion = null;

  //    // Перебір рядів у квізі
  //    session.quiz.quiz.forEach((row) => {
  //      // Шукаємо відповідне питання в колонках
  //      const foundColumn = row.columns.find(
  //        (column) => column._id.toString() === session.activeQuestion[0]._id
  //      );

  //      // Якщо знайдено питання, зупиняємо пошук
  //      if (foundColumn) {
  //        activeQuestion = foundColumn;
  //      }
  //    });

  //    console.log(activeQuestion); // Це буде об'єкт з відповідним _id
  //  }
  //}, [session.activeQuestion, session.quiz]);

  useEffect(() => {
    if (session?.activeQuestion?.length > 0 && session?.quiz?.quiz) {
      session.quiz.quiz.forEach((row) => {
        const foundColumn = row.columns.find(
          (column) => column._id.toString() === session.activeQuestion[0]._id
        );

        if (foundColumn) {
          //setActiveQuestion(foundColumn);
          showActiveQuestionModal(foundColumn);
          console.log(foundColumn);
        }
      });
    }
  }, [session.activeQuestion]);

  //useEffect(() => {
  //  if (session?.activeQuestion.length > 0) {
  //    setShowQuestion(true);
  //  }
  //}, [session.activeQuestion]);

  //if (activeQuestion) {
  //  return <QuestionCard session={session} currentQuestion={activeQuestion} />;
  //}

  return (
    <>
      <table className='quiz-host'>
        <tbody>
          {session.quiz.quiz.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className='value' key={rowIndex}>
                <span>{row.rowName}</span>
              </td>
              {row.columns.map((column, columnIndex) => (
                <td
                  className='value'
                  key={columnIndex}
                  onClick={() => handleChooseQuestion(rowIndex, columnIndex)}
                >
                  {column.name}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
