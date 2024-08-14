import { useState } from 'react';
import { Button } from '../button/button';
import './table.scss';

type TableProps = {
  table: any;
  tableParameters: TableParametersProps;
  mode: 'create' | 'edit' | 'finish';
  tableCell: TableCell;
  setTableCell: (tableCell: number[]) => void;
};

type TableParametersProps = {
  transparentBackground: boolean;
  fontSize: number;
  backgroundColor: string;
};

type TableCell = {
  row: number;
  column: number;
};

//const tableExample = [
//  { rowName: 'Row 1', columns: ['Column 1', 'Column 2', 'Column 3'] },
//  { rowName: 'Row 2', columns: ['Column 1', 'Column 2', 'Column 3'] },
//  { rowName: 'Row 3', columns: ['Column 1', 'Column 2', 'Column 3'] },
//];

export const Table = ({
  table,
  tableParameters,
  mode = 'create',
  tableCell,
  setTableCell,
}: TableProps) => {
  const [editedRow, setEditedRow] = useState<number | null>(null);
  const [editedColumn, setEditedColumn] = useState<number | null>(null);
  const [newCellValue, setNewCellValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const isTransparent = tableParameters.transparentBackground
    ? 'quiz-table--transparent'
    : '';

  const handleCellClick = (
    rowIndex: number,
    columnIndex: number,
    currentValue: string
  ) => {
    if (isEditing) {
      setIsEditing(false);
    }
    if (isEditing && editedRow === rowIndex && editedColumn === columnIndex) {
      setIsEditing(false);
      return;
    }
    setIsEditing(true);
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
    updatedTable[rowIndex].columns[columnIndex].name = newCellValue;
  };

  const handleClickSaveButton = () => {
    console.log('Save');
    console.log(newCellValue);
    clearEdition();
  };

  const clearEdition = () => {
    setIsEditing(false);
    setEditedRow(null);
    setEditedColumn(null);
    setNewCellValue('');
  };

  const pickQuestionToEdit = (row, column) => {
    console.log('Pick question to edit');
    console.log(row, column);
    setTableCell({ row, column });
  };

  if (mode === 'create') {
    return (
      <table
        className={`quiz-table ${isTransparent}`}
        style={{
          fontSize: Number(tableParameters.fontSize) + 'px',
          backgroundColor: isTransparent
            ? 'transparent'
            : tableParameters.backgroundColor,
        }}
      >
        <tbody>
          {table.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key={rowIndex}>
                <span>{row.rowName}</span>
              </td>
              {row.columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  onClick={() =>
                    handleCellClick(rowIndex, columnIndex, column.name)
                  }
                >
                  {isEditing &&
                  columnIndex === editedColumn &&
                  rowIndex === editedRow ? (
                    <>
                      <input
                        type='text'
                        value={newCellValue}
                        autoFocus
                        onChange={handleSetCellValueChange}
                        onBlur={() =>
                          handleChangeCellValueOnBlur(rowIndex, columnIndex)
                        }
                      />
                      <Button
                        label='Save'
                        mode='primary'
                        onClick={handleClickSaveButton}
                      />
                    </>
                  ) : (
                    column.name
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (mode === 'edit') {
    return (
      <table className='quiz-table'>
        <tbody>
          {table.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key={rowIndex}>
                <span>{row.rowName}</span>
                {/*{rowIndex === editedRow}*/}
              </td>
              {row.columns.map((column, columnIndex) => (
                <td
                  className={`${
                    rowIndex === tableCell.row &&
                    columnIndex === tableCell.column
                      ? 'td--active'
                      : ''
                  }`}
                  key={columnIndex}
                  onClick={() => pickQuestionToEdit(rowIndex, columnIndex)}
                >
                  {column.name}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};
