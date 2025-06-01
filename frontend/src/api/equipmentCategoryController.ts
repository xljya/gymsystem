// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addEquipmentCategory POST /api/equipment/category/add */
export async function addEquipmentCategoryUsingPost(
  body: API.EquipmentCategoryAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/equipment/category/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteEquipmentCategory POST /api/equipment/category/delete */
export async function deleteEquipmentCategoryUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/equipment/category/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getEquipmentCategoryVOById GET /api/equipment/category/get/vo */
export async function getEquipmentCategoryVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEquipmentCategoryVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseEquipmentCategoryVO_>('/api/equipment/category/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listEquipmentCategoryVOByPage POST /api/equipment/category/list/page/vo */
export async function listEquipmentCategoryVoByPageUsingPost(
  body: API.EquipmentCategoryQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseIPageEquipmentCategoryVO_>(
    '/api/equipment/category/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** updateEquipmentCategory POST /api/equipment/category/update */
export async function updateEquipmentCategoryUsingPost(
  body: API.EquipmentCategoryUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/equipment/category/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
