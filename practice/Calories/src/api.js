import * as ownFetch from './own_fetch.js';

const SERVER = 'https://learn.codeit.kr/6245/foods/';

async function getFoods(params = {}) {
  return await ownFetch.fetchGet(SERVER, params);
}

async function createFood(formData) {
  const options = { headers: { 'Content-Type': 'multipart/form-data' } };
  return await ownFetch.fetchPost(SERVER, formData, options);
}

async function patchFood(id, formData) {
  const options = { headers: { 'Content-Type': 'multipart/form-data' } };
  return await ownFetch.fetchPut(SERVER + id, formData, options);
}

async function deleteFood(id) {
  return await ownFetch.fetchDelete(SERVER + id);
}

export { getFoods, createFood, patchFood, deleteFood };
