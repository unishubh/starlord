function checkHeaderRow(row) {
  if (row.length < 4) {
    return false;
  }

  const slicedRow = row.slice(0, 4);

  if (
    slicedRow[0] !== 'type' ||
    slicedRow[1] !== 'content' ||
    slicedRow[2] !== 'numOptions' ||
    slicedRow[3] !== 'correctIndex'
  ) {
    return false;
  }

  return true;
}

/**
 *
 * @param {string} csvString
 */
export default function createQuestionsFromCsv(csvString) {
  if (!csvString) {
    // do something
    return null;
  }

  const rows = csvString.split('\n');

  let questions = [];

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    const items = row.split(',');

    if (index === 0) {
      if (!checkHeaderRow(items)) {
        // incorrect header! replace this with whatever schema you want your top row to look like
        alert('invalid header');
        return null;
      } else {
        continue;
      }
    }

    let cols = row.split(',');

    const question = {
      type: cols[0],
      content: cols[1],
      numOptions: cols[2],
      correctIndex: cols[3], // in 'human' terms, not array notation
      options: cols.slice(4, 4 + cols[2] + 1),
    };

    questions.push(question);
  }

  return questions;
}
