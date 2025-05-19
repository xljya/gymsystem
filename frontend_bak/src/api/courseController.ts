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
export async function deleteCourseUsingPost(body: number, options?: { [key: string]: any }) {
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

/** getCourseVoByIdWithSchedule GET /api/course/getCourseVoById */
export async function getCourseVoByIdWithScheduleUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseVoByIdWithScheduleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCourseVO_>('/api/course/getCourseVoById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listCourseByCategoryId GET /api/course/list/category/${param0} */
export async function listCourseByCategoryIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCourseByCategoryIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<API.BaseResponseListCourseVO_>(`/api/course/list/category/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** listCourseByCoachId GET /api/course/list/coach/${param0} */
export async function listCourseByCoachIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCourseByCoachIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { coachId: param0, ...queryParams } = params;
  return request<API.BaseResponseListCourseVO_>(`/api/course/list/coach/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** listCourseByPage POST /api/course/list/page */
export async function listCourseByPageUsingPost(
  body: API.CourseQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourseVO_>('/api/course/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listAllCourses GET /api/course/listAllCourses */
export async function listAllCoursesUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCourseVO_>('/api/course/listAllCourses', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listCoursesByCategoryIdWithSchedule GET /api/course/listCourseByCategoryId */
export async function listCoursesByCategoryIdWithScheduleUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCoursesByCategoryIdWithScheduleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCourseVO_>('/api/course/listCourseByCategoryId', {
    method: 'GET',
    params: {
      ...params,
    },
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
