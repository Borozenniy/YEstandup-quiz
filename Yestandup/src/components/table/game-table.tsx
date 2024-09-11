import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../../modal/modal-provider';
import { Button } from '../button/button';
import './table.scss';

type GameTableProps = {
  quiz: any;
  chooseQuestion: any;
};

export const GameTable = ({ quiz, chooseQuestion }: GameTableProps) => {
  const { openModal } = useContext(ModalContext) as any;

  const handleChooseQuestion = (row, column) => {
    chooseQuestion(row, column);
    showQuestionModal(row, column);
  };

  const showQuestionModal = (row, column) => {
    openModal(
      <div style={{ width: '500px' }}>
        <h1>Question</h1>
        <p>{quiz[row].columns[column].question}</p>
        <p>{quiz[row].columns[column].answer}</p>
      </div>
    );
  };
  return (
    <>
      <table className='quiz-host'>
        <tbody>
          {quiz.map((row, rowIndex) => (
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
