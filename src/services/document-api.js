import axios from '../utils/axios';

// вход
async function logInUser(credentials) {
  const { data } = await axios.post('/auth/login', credentials);
  if (data) token.set(data.token);
  return data;
}

// олучение атрибутов
async function fetchAttributes() {
  const {data} = await axios.get('/description');
  return data
}
// получение одного документа
async function fetchDocument(id) {
  const {data} = await axios.get(`/document/${id}`);
  return data;
}
// получение списка документов
async function fetchDocumentsList(body) {
  const {data} = await axios.post('/list', body);
  return data;
}

const API = {
  fetchAttributes,
  fetchDocument,
  fetchDocumentsList
};
export default API;