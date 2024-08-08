import { useState, useEffect, useRef } from 'react';
import { Table } from '../table/table';
import { Button } from '../button/button';
import './create-quiz.scss';

const tableExample = [
  { rowName: 'Row 1', columns: ['Column 1', 'Column 2', 'Column 3'] },
  { rowName: 'Row 2', columns: ['Column 1', 'Column 2', 'Column 3'] },
  { rowName: 'Row 3', columns: ['Column 1', 'Column 2', 'Column 3'] },
];

export const CreateQuiz = () => {
  const [table, setTable] = useState(tableExample);
  const [tableParameters, setTableParameters] = useState({
    transparentBackground: false,
    fontSize: 16,
  });
  const [sliderRowsValue, setSliderRowsValue] = useState(3);
  const [sliderColumnsValue, setSliderColumnsValue] = useState(3);
  const [isBackgroundTransparent, setIsBackgroundTransparent] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  //* Values for the table column
  const [columnValues, setColumnValues] = useState('');
  const [columnIndex, setColumnIndex] = useState<number | null>(null);

  const tableColumns = table[0].columns;

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

  const nextStep = () => {
    console.log('Next Step');
  };

  const changeColumnValues = (e) => {
    setColumnValues(e.target.value);
    console.log(columnValues);
  };

  const changeColumnIndex = (e) => {
    console.log(e.target.value);
    setColumnIndex(e.target.value);
  };

  const createTable = () => {
    const table = [];
    for (let i = 0; i < sliderRowsValue; i++) {
      const row = {
        rowName: `Row ${i + 1}`,
        columns: [],
      };
      for (let j = 0; j < sliderColumnsValue; j++) {
        row.columns.push(`Column ${j + 1}`);
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
  };

  useEffect(() => {
    setTableParameters({
      ...tableParameters,
      transparentBackground: isBackgroundTransparent,
      fontSize,
    });
  }, [isBackgroundTransparent, fontSize]);

  useEffect(() => {
    createTable();
  }, [sliderRowsValue, sliderColumnsValue]);
  /*
 const updatedTable = [...table];
    updatedTable[0].columns.map((column, index) => {
      column = columnValues;
    });
  */

  useEffect(() => {
    if (columnIndex !== null && columnValues !== '') {
      updateColumnValues(columnIndex, columnValues);
    }
  }, [columnValues, columnIndex]);
  return (
    <div className='create-quiz'>
      <div className='create-quiz__modification'>
        <h1>Create Quiz</h1>
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
        </div>
        <div>
          <span>
            Background transparent : {isBackgroundTransparent ? 'Yes' : 'No'}
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
        <Button label='Next Step' mode='primary' onClick={nextStep} />
      </div>
      <div className='create-quiz__table'>
        <Table
          table={table}
          tableParameters={tableParameters}
          transparentBackground={isBackgroundTransparent}
          fontSize={fontSize}
          //columns={['Column 1', 'Column 2', 'Column 3']}
          //rows={[1, 2, 3]}
        />
      </div>
    </div>
  );
};
