import { useState } from 'react';

export const FileReader = () => {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  return (
    <div>
      <p>Choose a file to upload</p>
      <input type='file' id='file-ipload' name='file' accept='' />
    </div>
  );
};
