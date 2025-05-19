// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addCategory POST /api/course/category/add */
export async function addCategoryUsingPost(
  body: API.CourseCategoryAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/course/category/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCategory POST /api/course/category/delete */
export async function deleteCategoryUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/category/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listCategoryByPage POST /api/course/category/list/page/vo */
export async function listCategoryByPageUsingPost(
  body: API.CourseCategoryQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourseCategoryVO_>('/api/course/category/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateCategory POST /api/course/category/update */
export async function updateCategoryUsingPost(
  body: API.CourseCategoryUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/category/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
