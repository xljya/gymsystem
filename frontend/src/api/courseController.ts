// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addCourse POST /api/course/add */
export async function addCourseUsingPost(
  body: API.CourseAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/course/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCourse POST /api/course/delete */
export async function deleteCourseUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCourseById GET /api/course/get */
export async function getCourseByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCourse_>('/api/course/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getCourseVOById GET /api/course/get/vo */
export async function getCourseVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCourseVO_>('/api/course/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listCourseVOByPage POST /api/course/list/page/vo */
export async function listCourseVoByPageUsingPost(
  body: API.CourseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourseVO_>('/api/course/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateCourse POST /api/course/update */
export async function updateCourseUsingPost(
  body: API.CourseUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
