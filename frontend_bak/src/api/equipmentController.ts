// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addEquipment POST /api/equipment/add */
export async function addEquipmentUsingPost(
  body: API.EquipmentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/equipment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteEquipment POST /api/equipment/delete */
export async function deleteEquipmentUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/equipment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getEquipmentById GET /api/equipment/get */
export async function getEquipmentByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEquipmentByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseEquipment_>('/api/equipment/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getEquipmentVOById GET /api/equipment/get/vo */
export async function getEquipmentVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEquipmentVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseEquipmentVO_>('/api/equipment/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listEquipmentVOByPage POST /api/equipment/list/page/vo */
export async function listEquipmentVoByPageUsingPost(
  body: API.EquipmentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEquipmentVO_>('/api/equipment/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateEquipment POST /api/equipment/update */
export async function updateEquipmentUsingPost(
  body: API.EquipmentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/equipment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
