import { useState, useEffect, useRef } from 'react';
import { Table } from '../table/table';
import './create-quiz.scss';

const tableExample = [
  { rowName: 'Row 1', columns: ['Column 1', 'Column 2', 'Column 3'] },
  { rowName: 'Row 2', columns: ['Column 1', 'Column 2', 'Column 3'] },
  { rowName: 'Row 3', columns: ['Column 1', 'Column 2', 'Column 3'] },
];

export const CreateQuiz = () => {
  const [table, setTable] = useState(tableExample);
  const [sliderRowsValue, setSliderRowsValue] = useState(3);
  const [sliderColumnsValue, setSliderColumnsValue] = useState(3);
  const [isBackgroundTransparent, setIsBackgroundTransparent] = useState(false);
  const [fontSize, setFontSize] = useState(16);

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

  useEffect(() => {
    createTable();
  }, [sliderRowsValue, sliderColumnsValue]);
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
      </div>
      <div className='create-quiz__table'>
        <Table
          table={table}
          transparentBackground={isBackgroundTransparent}
          fontSize={fontSize}
          //columns={['Column 1', 'Column 2', 'Column 3']}
          //rows={[1, 2, 3]}
        />
      </div>
    </div>
  );
};
