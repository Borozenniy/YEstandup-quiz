import { useState, useEffect } from 'react';
import { Table } from '../table/table';
import { Button } from '../button/button';
import './create-quiz.scss';

const tableExample = [
  {
    rowName: 'Row 1',
    columns: [
      { name: 'Column 1', question: 'Question 1', answer: 'Answer 1' },
      { name: 'Column 2', question: 'Question 2', answer: 'Answer 2' },
      { name: 'Column 3', question: 'Question 3', answer: 'Answer 3' },
    ],
  },
  {
    rowName: 'Row 2',
    columns: [
      { name: 'Column 1', question: 'Question 1', answer: 'Answer 1' },
      { name: 'Column 2', question: 'Question 2', answer: 'Answer 2' },
      { name: 'Column 3', question: 'Question 3', answer: 'Answer 3' },
    ],
  },
  {
    rowName: 'Row 3',
    columns: [
      { name: 'Column 1', question: 'Question 1', answer: 'Answer 1' },
      { name: 'Column 2', question: 'Question 2', answer: 'Answer 2' },
      { name: 'Column 3', question: 'Question 3', answer: 'Answer 3' },
    ],
  },
];

const tableMode = ['create', 'edit', 'finish'];

type TableCell = {
  row: number | null;
  column: number | null;
};

export const CreateQuiz = () => {
  //TODO: rebuid this to more comfortable system with Tabs
  const [isCreating, setIsCreating] = useState(false);
  //*

  //* file upload
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [showImage, setShowImage] = useState(false);

  //? for second stage of creating quiz
  const [tableCell, setTableCell] = useState<TableCell>({ row: 0, column: 0 });
  //?

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

  const tableColumns = table[0].columns;

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

  const nextStep = () => {
    setCurrentTableMode(tableMode[1]);
    setIsCreating(true);
  };

  const backStep = () => {
    setCurrentTableMode(tableMode[0]);
    setIsCreating(false);
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
    const table = [];

    for (let i = 0; i < sliderRowsValue; i++) {
      const row = {
        rowName: `Row ${i + 1}`,
        columns: [],
      };
      for (let j = 0; j < sliderColumnsValue; j++) {
        row.columns.push({
          name: `Column ${j + 1}`,
          question: `Question ${j + 1}`,
          answer: `Answer ${j + 1}`,
        });
      }
      table.push(row);
    }

    setTable(table);
  };

  const updateColumnValues = (columnIndex: number, columnValue: string) => {
    const updatedTable = [...table];
    updatedTable.map((row) => {
      row.columns[columnIndex - 1] = columnValue;
    });
    //updatedTable[0].columns.map((column, index) => {
    //  column = columnValues;
    //});
    setTable(updatedTable);
    clearColumnValues();
  };

  const nextQuestion = () => {
    console.log('Next Question');
  };

  const previousQuestion = () => {
    console.log('Previous Question');
  };

  const changeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const changeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const saveQuestionAndAnswer = () => {
    const updatedTable = [...table];
    updatedTable[tableCell.row].columns[tableCell.column].question = question;
    updatedTable[tableCell.row].columns[tableCell.column].answer = answer;
    setTable(updatedTable);
    clearCellValues();
  };
  const clearCellValues = () => {
    setQuestion('');
    setAnswer('');
    setTableCell({ row: null, column: null });
  };
  //TODO: get row and column index separetely from
  useEffect(() => {
    if (tableCell.row !== null && tableCell.column !== null) {
      setQuestion(table[tableCell.row].columns[tableCell.column].question);
      setAnswer(table[tableCell.row].columns[tableCell.column].answer);
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
  return (
    <div className='create-quiz'>
      <div className='create-quiz__modification'>
        <div className='create-quiz__stages'>
          <span className='create-quiz__stage'>Creating Quiz</span>
          <span className='create-quiz__stage'>Editing Quiz</span>
          <span className='create-quiz__stage'>Finishing</span>
        </div>
        {isCreating ? (
          <>
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
                  <p>Question</p>
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
          </>
        ) : (
          <>
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
          </>
        )}

        <div>
          <Button
            label='Back'
            mode='primary'
            onClick={backStep}
            disabled={!isCreating}
          />
          <Button label='Next Step' mode='primary' onClick={nextStep} />
        </div>
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
  );
};
