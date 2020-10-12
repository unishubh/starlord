import React, { useCallback, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

export default function UploadCsvModal() {
  const [visible, setVisibility] = useState(false);
  const [csvData, setCsvData] = useState();

  function handleClose() {
    setVisibility(false);
  }

  function handleCreateQuestions() {
    if (!csvData) return;

    // add validation for CSV data based on how it should be structured

    // add any other functionality (i.e. storing the CSV data to the database)

    setVisibility(false);
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);

      if (acceptedFiles.length > 1 || acceptedFiles.length === 0) {
        alert('ruh roh');
        return;
      }

      // read the file
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setCsvData(binaryStr);

        alert(binaryStr);
      };
      reader.readAsText(file);
    },
    [setCsvData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <button type="button" className="button button-contactForm boxed-btn" onClick={() => setVisibility(true)}>
        Upload a CSV
      </button>

      <Modal show={visible} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload a CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>This Modal allows you to upload a CSV file to create all of your questions</p>
          </div>

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="dropzone-body">nice file!</div>
            ) : (
              <div className="dropzone-body">Drag and drop a CSV file (or click me)</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateQuestions}>
            Create Questions
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
