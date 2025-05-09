// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addCoach POST /api/coach/add */
export async function addCoachUsingPost(
  body: API.CoachAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/coach/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCoach POST /api/coach/delete */
export async function deleteCoachUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/coach/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCoachById GET /api/coach/get */
export async function getCoachByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCoachByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCoach_>('/api/coach/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getCoachVOById GET /api/coach/get/vo */
export async function getCoachVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCoachVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCoachVO_>('/api/coach/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listDistinctCoachAddresses GET /api/coach/list/addresses */
export async function listDistinctCoachAddressesUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListString_>('/api/coach/list/addresses', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listCoachVOByPage POST /api/coach/list/page/vo */
export async function listCoachVoByPageUsingPost(
  body: API.CoachQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCoachVO_>('/api/coach/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** coachRegister POST /api/coach/register */
export async function coachRegisterUsingPost(
  body: API.CoachRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/coach/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateCoach POST /api/coach/update */
export async function updateCoachUsingPost(
  body: API.CoachUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/coach/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
