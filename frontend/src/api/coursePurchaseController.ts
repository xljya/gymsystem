// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addCoursePurchase POST /api/coursePurchase/add */
export async function addCoursePurchaseUsingPost(
  body: API.CoursePurchaseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/coursePurchase/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCoursePurchase POST /api/coursePurchase/delete */
export async function deleteCoursePurchaseUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/coursePurchase/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCoursePurchaseById GET /api/coursePurchase/get */
export async function getCoursePurchaseByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCoursePurchaseByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCoursePurchase_>('/api/coursePurchase/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getCoursePurchaseVOById GET /api/coursePurchase/get/vo */
export async function getCoursePurchaseVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCoursePurchaseVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCoursePurchaseVO_>('/api/coursePurchase/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listCoursePurchaseVOByPage POST /api/coursePurchase/list/page/vo */
export async function listCoursePurchaseVoByPageUsingPost(
  body: API.CoursePurchaseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCoursePurchaseVO_>('/api/coursePurchase/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateCoursePurchase POST /api/coursePurchase/update */
export async function updateCoursePurchaseUsingPost(
  body: API.CoursePurchaseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/coursePurchase/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
