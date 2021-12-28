// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

const urlBackend = `http://localhost:5000`;

const token = localStorage.getItem('token');

export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>(`${urlBackend}/api/users/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function getProductAll(options?: { [key: string]: any }) {
  return request<any>(`${urlBackend}/api/surveyDetails`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${urlBackend}/api/users/login`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function getProducts() {
  return request<any>(`${urlBackend}/api/products`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProductById(id: string) {
  return request<any>(`${urlBackend}/api/products/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateProductById(data: any) {
  return request<any>(`${urlBackend}/api/products/${data.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
}

export async function addProduct(data: any) {
  return request<any>(`${urlBackend}/api/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
}

export async function deleteProduct(data: any) {
  return request<any>(`${urlBackend}/api/products`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
}
