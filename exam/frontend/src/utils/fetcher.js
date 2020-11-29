import config from '../Components/config';

const mapOptionsToValues = (options) => {
  return options.map((option) => ({
    value: option.id,
    label: option.name,
  }));
};

const apiCaller = async (url) => {
  try {
    return await fetch(url);
  } catch (e) {
    console.log(e);
  }
};
const fetchFromUrl = async (url) => {
  try {
    const resp = await apiCaller(url);
    const data = await resp.json();
    return await mapOptionsToValues(data.data);
  } catch (e) {
    return mapOptionsToValues([]);
  }
};

//   fetch(url).then((response) => {
//     response.json().then((resp) => {
//       console.log('in api method, resp is ', resp);
//       return resp;
//     });
//   });
// };
const fetchExams = async (inputValue, callback) => {
  if (!inputValue) {
    return callback([]);
  }

  const fetchURL = `${config.apiUrl}api/subject/${inputValue}`;
  const data = await fetchFromUrl(fetchURL);
  callback(data);
};

const fetchExamsForSelect = async (inputValue = 'trick') => {
  const fetchURL = `${config.apiUrl}api/subject/${inputValue}`;
  return fetchFromUrl(fetchURL);
};

const fetchCategoriesForSelect = async (inputValue = 'trick') => {
  const fetchURL = `${config.apiUrl}api/category/${inputValue}`;
  return fetchFromUrl(fetchURL);
};

const fetchCategories = async (inputValue, callback) => {
  if (!inputValue) {
    return callback([]);
  }

  const fetchURL = `${config.apiUrl}api/category/${inputValue}`;
  const data = await fetchFromUrl(fetchURL);
  callback(data);
};

export { fetchExams, fetchCategories, fetchExamsForSelect, fetchCategoriesForSelect };
