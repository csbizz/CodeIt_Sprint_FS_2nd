import axios from 'axios';
import isEmpty from './isEmpty.js';
import HttpStatus from './HttpStatus.js';

const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
});

async function axiosData({ base, url, method, data = {}, params = {} }) {
  if (!url || !method) throw new Error('URL and Method is required');
  if (!HTTP_METHODS[method]) throw new Error('Invalid HTTP method');

  const instance = axios.create({
    baseURL: base,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await instance({ method, url, data, params })
    .then(res => {
      if (res.status === HttpStatus.NO_CONENT && isEmpty(res.data)) return res.status;

      return res.data;
    })
    .catch(e => {
      return e;
    });

  return response;
}

export async function axiosGet(base, url, params) {
  return axiosData({ base, url, method: HTTP_METHODS.GET, params });
}

export async function axiosPost(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.POST, data });
}

export async function axiosPatch(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.PATCH, data });
}

export async function axiosPut(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.PUT, data });
}

export async function axiosDelete(base, url, data) {
  return axiosData({ base, url, method: HTTP_METHODS.DELETE, data });
}
