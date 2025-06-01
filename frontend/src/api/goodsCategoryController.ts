// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addGoodsCategory POST /api/goods/category/add */
export async function addGoodsCategoryUsingPost(
  body: API.GoodsCategoryAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/goods/category/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteGoodsCategory POST /api/goods/category/delete */
export async function deleteGoodsCategoryUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/goods/category/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getGoodsCategoryVOById GET /api/goods/category/get/vo */
export async function getGoodsCategoryVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsCategoryVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGoodsCategoryVO_>('/api/goods/category/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listGoodsCategoryVOByPage POST /api/goods/category/list/page/vo */
export async function listGoodsCategoryVoByPageUsingPost(
  body: API.GoodsCategoryQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseIPageGoodsCategoryVO_>('/api/goods/category/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateGoodsCategory POST /api/goods/category/update */
export async function updateGoodsCategoryUsingPost(
  body: API.GoodsCategoryUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/goods/category/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
