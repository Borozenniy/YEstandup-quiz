import { useState, useEffect } from 'react';
import { createQuiz } from '../../services/api/quiz/quiz.js';
import { Table } from '../table/table';
import { Button } from '../button/button';
import './create-quiz.scss';

const tableExample = {
  quizName: 'Change name',
  quiz: [
    {
      rowName: 'Row 1',
      columns: [
        { name: 'Column 1', question: '3', answer: '3' },
        { name: 'Column 2', question: 'Question 2', answer: '3' },
        { name: 'Column 3', question: 'Question 3', answer: '3' },
      ],
    },
    {
      rowName: 'Row 2',
      columns: [
        { name: 'Column 1', question: 'Question 1', answer: '3' },
        { name: 'Column 2', question: 'Question 2', answer: '3' },
        { name: 'Column 3', question: 'Question 3', answer: '3' },
      ],
    },
    {
      rowName: 'Row 3',
      columns: [
        { name: 'Column 1', question: 'Question 1', answer: '3' },
        { name: 'Column 2', question: 'Question 2', answer: '3' },
        { name: 'Column 3', question: 'Question 3', answer: '3' },
      ],
    },
  ],
};

const tableMode = ['create', 'edit', 'finish'];

type TableCell = {
  row: number | null;
  column: number | null;
};

export const CreateQuiz = () => {
  //TODO: rebuid this to more comfortable system with Tabs
  //const [isCreating, setIsCreating] = useState(false);
  const [quizName, setQuizName] = useState(tableExample.quizName);
  //*

  //* file upload
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [showImage, setShowImage] = useState(false);

  //? for second stage of creating quiz
  const [tableCell, setTableCell] = useState<TableCell>({ row: 0, column: 0 });
  //?

  const [maximumRows, setMaximumRows] = useState(3);
  const [maximumColumns, setMaximumColumns] = useState(3);

  //? question and answer
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  //?
  //*
  const [table, setTable] = useState(tableExample);
  const [currentTableMode, setCurrentTableMode] = useState(tableMode[0]);
  const [tableParameters, setTableParameters] = useState({
    transparentBackground: false,
    fontSize: 16,
  });
  const [sliderRowsValue, setSliderRowsValue] = useState(3);
  const [sliderColumnsValue, setSliderColumnsValue] = useState(3);
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [isBackgroundTransparent, setIsBackgroundTransparent] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  //* Values for the table column
  const [columnValues, setColumnValues] = useState('');
  const [columnIndex, setColumnIndex] = useState(1);

  console.log(table.quiz);
  const quizStage = (mode: string) => {
    switch (mode) {
      case 'create':
        return (
          <>
            <span className='create-quiz__stage create-quiz__stage-active'>
              Creating Quiz
            </span>
            <span className='create-quiz__stage'>Editing Quiz</span>
            <span className='create-quiz__stage'>Finishing</span>
          </>
        );

      case 'edit':
        return (
          <>
            <span className='create-quiz__stage'>Creating Quiz</span>
            <span className='create-quiz__stage create-quiz__stage-active'>
              Editing Quiz
            </span>
            <span className='create-quiz__stage'>Finishing</span>
          </>
        );
      case 'finish':
        return (
          <>
            <span className='create-quiz__stage'>Creating Quiz</span>
            <span className='create-quiz__stage'>Editing Quiz</span>
            <span className='create-quiz__stage create-quiz__stage-active'>
              Finishing
            </span>
          </>
        );
    }
  };

  const tableColumns = table.quiz[0].columns;
  console.log(currentTableMode);

  const changeQuizName = (e: any) => {
    setQuizName(e.target.value);
  };

  const saveQuizName = () => {
    setTable({ ...table, quizName: quizName });
  };

  const clearColumnValues = () => {
    setColumnValues('');
    setColumnIndex(1);
  };
  const changeSliderRowsValue = (e) => {
    setSliderRowsValue(e.target.value);
  };

  const changeSliderColumnsValue = (e) => {
    setSliderColumnsValue(e.target.value);
  };

  const changeFontSize = (e) => {
    setFontSize(e.target.value);
  };

  const changeBackgroundTransparent = () => {
    setIsBackgroundTransparent(!isBackgroundTransparent);
  };

  const changeBackgroundColor = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleNextStep = () => {
    if (currentTableMode === 'create') {
      setCurrentTableMode(tableMode[1]);
    }
    if (currentTableMode === 'edit') {
      setCurrentTableMode(tableMode[2]);
    }
  };

  const handleBackStep = () => {
    if (currentTableMode === 'finish') {
      setCurrentTableMode(tableMode[1]);
    }
    setCurrentTableMode(tableMode[0]);
    console.log('Back Step');
  };

  const changeColumnValues = (e) => {
    setColumnValues(e.target.value);
    console.log(columnValues);
  };

  const changeColumnIndex = (e) => {
    console.log(e.target.value);
    setColumnIndex(e.target.value);
  };

  const handleFileUpload = (e) => {
    console.log(e.target);
    const file = event.target.files[0];
    if (file) {
      if (fileContent) {
        URL.revokeObjectURL(fileContent);
      }
      setFileName(file.name);
      const fileURL = URL.createObjectURL(file);
      setFileContent(fileURL);
    }
  };

  const createTable = () => {
    const newTable = [];

    for (let i = 0; i < sliderRowsValue; i++) {
      const row = {
        rowName: `Row ${i + 1}`,
        columns: [],
      };
      for (let j = 0; j < sliderColumnsValue; j++) {
        row.columns.push({
          name: `Column ${j + 1}`,
          question: `Question ${j + 1}`,
          answer: '',
        });
      }
      newTable.push(row);
    }

    setTable({ ...table, quiz: newTable });
  };

  const updateColumnValues = (columnIndex: number, columnValue: string) => {
    const updatedTable = table.quiz;
    updatedTable.map((row) => {
      row.columns[columnIndex - 1].name = columnValue;
    });
    //updatedTable[0].columns.map((column, index) => {
    //  column = columnValues;
    //});
    setTable({ ...table, quiz: updatedTable });
    clearColumnValues();
  };

  //const checkIsTableFilled = () => {
  //  if (table.length === 0) {
  //    return false;
  //  }
  //};
  //console.log(table.length === 0);

  const previousQuestion = () => {
    if (table.length === 0 || (tableCell.row === 0 && tableCell.column === 0))
      return;
    tableCell.column === 0
      ? setTableCell({ row: tableCell.row - 1, column: maximumColumns - 1 })
      : setTableCell({ row: tableCell.row, column: tableCell.column - 1 });
  };

  const nextQuestion = () => {
    if (
      table.length === 0 ||
      (tableCell.row === maximumRows - 1 &&
        tableCell.column === maximumColumns - 1)
    )
      return;
    tableCell.column === maximumColumns - 1
      ? setTableCell({ row: tableCell.row + 1, column: 0 })
      : setTableCell({ row: tableCell.row, column: tableCell.column + 1 });
  };

  const changeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const changeAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const saveQuestionAndAnswer = () => {
    if (tableCell.row !== null && tableCell.column !== null) {
      const updatedTable = [...table.quiz];
      updatedTable[tableCell.row].columns[tableCell.column].question = question;
      updatedTable[tableCell.row].columns[tableCell.column].answer = answer;
      setTable({ ...table, quiz: updatedTable });
      //clearCellValues();
      nextQuestion();
    }
  };
  const clearCellValues = () => {
    setQuestion('');
    setAnswer('');
    setTableCell({ row: null, column: null });
  };
  //TODO: get row and column index separetely from
  useEffect(() => {
    if (tableCell.row !== null && tableCell.column !== null) {
      setQuestion(table.quiz[tableCell.row].columns[tableCell.column].question);
      setAnswer(table.quiz[tableCell.row].columns[tableCell.column].answer);
    }
  }, [tableCell]);

  useEffect(() => {
    setTableParameters({
      ...tableParameters,
      transparentBackground: isBackgroundTransparent,
      fontSize,
      backgroundColor,
    });
  }, [isBackgroundTransparent, fontSize, backgroundColor]);

  useEffect(() => {
    if (table.quiz.length > 0) {
      setMaximumRows(table.quiz.length);
      setMaximumColumns(table.quiz[0].columns.length);
    }
  }, [table.quiz]);

  useEffect(() => {
    createTable();
  }, [sliderRowsValue, sliderColumnsValue]);
  /*
 const updatedTable = [...table];
    updatedTable[0].columns.map((column, index) => {
      column = columnValues;
    });
  */

  //useEffect(() => {
  //  if (columnIndex !== null && columnValues !== '') {
  //    updateColumnValues(columnIndex, columnValues);
  //  }
  //}, [columnValues, columnIndex]);

  const finishQuiz = () => {
    createQuiz(tableExample);
  };

  const createQuiz = async (quiz) => {
    const response = await fetch(`http://localhost:5000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quiz), // Тут quiz вже є tableExample
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const sendQuiz = () => {
    //const user = { name: 'TESTNAME', password: '12345' };
    //createUser(user);
    createUser(table);
  };

  const createUser = async (quiz) => {
    const response = await fetch(`http://localhost:5000/quiz/create-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quiz),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  //const createQuiz = async (quiz) => {
  //    const response = await fetch(`http://localhost:5000/quiz/create-quiz`, {
  //      method: 'POST',
  //      headers: {
  //        'Content-Type': 'application/json',
  //      },
  //      body: JSON.stringify(quiz),  // Тут quiz вже є tableExample
  //    });

  //    if (!response.ok) {
  //      throw new Error('Network response was not ok');
  //    }
  //    return response.json();
  //  };

  return (
    <div className='create-quiz'>
      <div className='create-quiz__modification'>
        <div className='create-quiz__stages'>{quizStage(currentTableMode)}</div>
        {currentTableMode === 'finish' && (
          <div>
            <h2>Gsss</h2>
          </div>
        )}
        {currentTableMode === 'edit' && (
          <div>
            <div>
              <Button
                label='Previous question'
                mode='primary'
                onClick={previousQuestion}
              />
              <Button
                label='Next question'
                mode='primary'
                onClick={nextQuestion}
              />
              <div>
                {tableCell.column === null ? (
                  <div>
                    <p>Pick a cell</p>
                  </div>
                ) : (
                  <p>
                    Question {tableCell.column + 1} / {maximumColumns}
                  </p>
                )}
                <input
                  type='text'
                  placeholder='Question'
                  value={question}
                  onChange={changeQuestion}
                />
                <p>Answer</p>
                <input
                  type='text'
                  placeholder='Answer'
                  value={answer}
                  onChange={changeAnswer}
                />
                <Button
                  label='Save'
                  mode='primary'
                  onClick={saveQuestionAndAnswer}
                  disabled={!question || !answer}
                />
              </div>
              {/*<div>
                  <p>Donwload image</p>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileUpload}
                  />
                  {fileName && <h2>Downloaded: {fileName}</h2>}
                  <Button
                    label='Show image'
                    mode='primary'
                    onClick={() => setShowImage(!showImage)}
                  />
                  {fileContent && (
                    <div
                      className={`upload-image ${
                        showImage && 'upload-image--hidden'
                      }`}
                    >
                      <h3>Вміст файлу:</h3>
                      <img
                        src={fileContent}
                        alt='Завантажене зображення'
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                  )}
                </div>*/}
              {/*<div>
                  <p>Answer</p>
                  <input
                    type='text'
                    placeholder='Answer'
                    onClick={handleFileUpload}
                  />
                  {fileName && <p>Downloaded file: {fileName}</p>}
                </div>
                {fileContent && (
                  <div>
                    <h3>File</h3>
                    <pre>{fileContent}</pre>
                  </div>
                )}*/}
            </div>
          </div>
        )}
        {currentTableMode === 'create' && (
          <div>
            <span>Quiz Name</span>
            <input type='text' value={quizName} onChange={changeQuizName} />
            <Button
              label='Save quiz name'
              mode='primary'
              onClick={saveQuizName}
              disabled={!quizName || quizName === table.quizName}
            />
            <span> Rows : {sliderRowsValue}</span>
            <input
              type='range'
              min='1'
              max='10'
              value={sliderRowsValue}
              onChange={changeSliderRowsValue}
              className='create-quiz__slider'
            />
            <span> Columns : {sliderColumnsValue}</span>
            <input
              type='range'
              min='1'
              max='10'
              value={sliderColumnsValue}
              onChange={changeSliderColumnsValue}
              className='create-quiz__slider'
            />
            <span> Font Size : {fontSize}</span>
            <input
              type='range'
              min='10'
              max='80'
              step={2}
              value={fontSize}
              onChange={changeFontSize}
              className='create-quiz__slider'
            />
            <div>
              <span>Select column: </span>
              <select name='column' id='column' onChange={changeColumnIndex}>
                {tableColumns.map((column, index) => {
                  return (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </select>
              <input
                type='text'
                value={columnValues}
                onChange={changeColumnValues}
              />
              <Button
                disabled={columnValues === ''}
                label='Update column '
                mode='primary'
                onClick={() => updateColumnValues(columnIndex, columnValues)}
              />
            </div>
            <div>
              <span> Background Color: </span>
              <input
                type='color'
                name='color'
                id='color'
                value={backgroundColor}
                onChange={changeBackgroundColor}
              />
              <span>
                Background transparent :{' '}
                {isBackgroundTransparent ? 'Yes' : 'No'}
              </span>
              <input
                type='checkbox'
                name='transparent'
                value='true'
                onChange={changeBackgroundTransparent}
                //name='transparent'
                //value='false'
                //onChange={changeBackgroundTransparent}
              />
            </div>
          </div>
        )}

        <div>
          <Button
            label='Back'
            mode='primary'
            onClick={handleBackStep}
            disabled={currentTableMode === 'create'}
          />
          {currentTableMode === 'finish' ? (
            <Button label='Finish Quiz' mode='primary' onClick={sendQuiz} />
          ) : (
            <Button label='Next Step' mode='primary' onClick={handleNextStep} />
          )}
        </div>
        <div className='create-quiz__table'>
          <Table
            table={table}
            tableParameters={tableParameters}
            mode={currentTableMode}
            tableCell={tableCell}
            setTableCell={setTableCell}
            //columns={['Column 1', 'Column 2', 'Column 3']}
            //rows={[1, 2, 3]}
          />
        </div>
      </div>
    </div>
  );
};
