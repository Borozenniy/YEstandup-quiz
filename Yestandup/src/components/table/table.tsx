import { useState } from 'react';
import './table.scss';
import e from 'cors';

type TableProps = {
  table: any;
  transparentBackground: boolean;
  fontSize: number;
};

//const tableExample = [
//  { rowName: 'Row 1', columns: ['Column 1', 'Column 2', 'Column 3'] },
//  { rowName: 'Row 2', columns: ['Column 1', 'Column 2', 'Column 3'] },
//  { rowName: 'Row 3', columns: ['Column 1', 'Column 2', 'Column 3'] },
//];

export const Table = ({
  table,
  transparentBackground,
  fontSize,
}: TableProps) => {
  const [editedRow, setEditedRow] = useState<number | null>(null);
  const [editedColumn, setEditedColumn] = useState<number | null>(null);
  const [newCellValue, setNewCellValue] = useState('');
  const isTransparent = transparentBackground ? 'quiz-table--transparent' : '';

  const handleCellClick = (
    rowIndex: number,
    columnIndex: number,
    currentValue: string
  ) => {
    setEditedRow(rowIndex);
    setEditedColumn(columnIndex);
    setNewCellValue(currentValue);
  };

  const handleSetCellValueChange = (e) => {
    setNewCellValue(e.target.value);
  };

  const handleChangeCellValueOnBlur = (
    rowIndex: number,
    columnIndex: number
  ) => {
    const updatedTable = [...table];
    updatedTable[rowIndex].columns[columnIndex] = newCellValue;
  };
  return (
    <table
      className={`quiz-table ${isTransparent}`}
      style={{ fontSize: Number(fontSize) + 'px' }}
    >
      <tbody>
        {table.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <span>{row.rowName}</span>
            </td>
            {row.columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                onClick={() => handleCellClick(rowIndex, columnIndex, column)}
              >
                {columnIndex === editedColumn && rowIndex === editedRow ? (
                  <input
                    type='text'
                    style={{ fontSize: Number(fontSize) + 'px' }}
                    value={newCellValue}
                    autoFocus
                    onChange={handleSetCellValueChange}
                    onBlur={() =>
                      handleChangeCellValueOnBlur(rowIndex, columnIndex)
                    }
                  />
                ) : (
                  column
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
