import axios from 'axios';
import { isEmpty } from './utils.js';

const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
});

const HTTP_STATUS = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
});

async function axiosData({ base, url, method, data = {}, params = {} }) {
  if (!url || !method) throw new Error('URL and Method is required');
  if (!HTTP_METHODS[method]) throw new Error('Invalid HTTP method');

  const instance = axios.create({
    baseURL: base,
    headers: { 'Content-Type': 'application/json' },
    validateStatus: status => 200 <= status && status < 300, // res.ok와 동일한 조건
  });
  instance.interceptors.response.use(
    // NOTE validateStatus를 통과함 == res.ok
    // 반환된 response를 가공해서 반환한다.
    response => {
      // NOTE data가 중첩된 경우에 일관적으로 사용할 수 있도록 하는 코드
      return { ...response, data: response.data.data || response.data };
    },
    // NOTE validateStatus를 통과하지 못함 == !res.ok
    // 반환된 error를 이용해 에러처리를 한다.
    error => {
      // NOTE 에러 응답 상세 내용 확인
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Request data:', error.config?.data);
      return Promise.reject(error);
    },
  );

  const res = await instance({ method, url, data, params });

  // NOTE 204 case
  if (res.status === HTTP_STATUS.NO_CONTENT && isEmpty(res.data)) return res.status;

  return res.data;
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
