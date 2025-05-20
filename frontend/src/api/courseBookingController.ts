// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addBooking POST /api/course/booking/add */
export async function addBookingUsingPost(
  body: API.CourseBookingAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/course/booking/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteBooking POST /api/course/booking/delete */
export async function deleteBookingUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/booking/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMyBooking POST /api/course/booking/delete/my */
export async function deleteMyBookingUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/booking/delete/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBookingVOByPage POST /api/course/booking/list/page/vo */
export async function listBookingVoByPageUsingPost(
  body: API.CourseBookingQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourseBookingVO_>('/api/course/booking/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyBookingVOByPage POST /api/course/booking/list/page/vo/my */
export async function listMyBookingVoByPageUsingPost(
  body: API.CourseBookingQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCourseBookingVO_>('/api/course/booking/list/page/vo/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateBooking POST /api/course/booking/update */
export async function updateBookingUsingPost(
  body: API.CourseBookingUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/booking/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
