// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addSchedule POST /api/course/schedule/add */
export async function addScheduleUsingPost(
  body: API.CourseScheduleAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/course/schedule/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteSchedule POST /api/course/schedule/delete */
export async function deleteScheduleUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/schedule/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listScheduleByCoachId POST /api/course/schedule/list/coach */
export async function listScheduleByCoachIdUsingPost(
  body: API.CourseScheduleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCourseScheduleVO_>('/api/course/schedule/list/coach', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listScheduleByCourseId POST /api/course/schedule/list/course */
export async function listScheduleByCourseIdUsingPost(
  body: API.CourseScheduleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCourseScheduleVO_>('/api/course/schedule/list/course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listScheduleByPage POST /api/course/schedule/list/page/vo */
export async function listScheduleByPageUsingPost(
  body: API.CourseScheduleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourseScheduleVO_>('/api/course/schedule/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listScheduleByTimeRange POST /api/course/schedule/list/time */
export async function listScheduleByTimeRangeUsingPost(
  body: API.CourseScheduleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCourseScheduleVO_>('/api/course/schedule/list/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateSchedule POST /api/course/schedule/update */
export async function updateScheduleUsingPost(
  body: API.CourseScheduleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/schedule/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
