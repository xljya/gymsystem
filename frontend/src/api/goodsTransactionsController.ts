// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addGoodsTransactions POST /api/goodsTransactions/add */
export async function addGoodsTransactionsUsingPost(
  body: API.GoodsTransactionsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/goodsTransactions/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteGoodsTransactions POST /api/goodsTransactions/delete */
export async function deleteGoodsTransactionsUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/goodsTransactions/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getGoodsTransactionsById GET /api/goodsTransactions/get */
export async function getGoodsTransactionsByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsTransactionsByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGoodsTransactions_>('/api/goodsTransactions/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getGoodsTransactionsVOById GET /api/goodsTransactions/get/vo */
export async function getGoodsTransactionsVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsTransactionsVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGoodsTransactionsVO_>('/api/goodsTransactions/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listGoodsTransactionsVOByPage POST /api/goodsTransactions/list/page/vo */
export async function listGoodsTransactionsVoByPageUsingPost(
  body: API.GoodsTransactionsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageGoodsTransactionsVO_>('/api/goodsTransactions/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateGoodsTransactions POST /api/goodsTransactions/update */
export async function updateGoodsTransactionsUsingPost(
  body: API.GoodsTransactionsUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/goodsTransactions/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
