// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** addMember POST /api/member/add */
export async function addMemberUsingPost(
  body: API.MemberAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/member/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMember POST /api/member/delete */
export async function deleteMemberUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/member/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getMemberById GET /api/member/get */
export async function getMemberByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMemberByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMembers_>('/api/member/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginMember GET /api/member/get/login */
export async function getLoginMemberUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginMemberVO_>('/api/member/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getMyMemberInfo GET /api/member/get/my */
export async function getMyMemberInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseMemberVO_>('/api/member/get/my', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getMemberVOById GET /api/member/get/vo */
export async function getMemberVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMemberVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMemberVO_>('/api/member/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMembers GET /api/member/list */
export async function listMembersUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMembers_>('/api/member/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listMemberVOByPage POST /api/member/list/page/vo */
export async function listMemberVoByPageUsingPost(
  body: API.MemberQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMemberVO_>('/api/member/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** memberLogin POST /api/member/login */
export async function memberLoginUsingPost(
  body: API.MemberLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginMemberVO_>('/api/member/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** memberLogout POST /api/member/logout */
export async function memberLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/member/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** memberRegister POST /api/member/register */
export async function memberRegisterUsingPost(
  body: API.MemberRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/member/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMember POST /api/member/update */
export async function updateMemberUsingPost(
  body: API.MemberUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/member/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMyInfo POST /api/member/update/my */
export async function updateMyInfoUsingPost(
  body: API.MemberUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/member/update/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePassword POST /api/member/update/password */
export async function updatePasswordUsingPost(
  body: API.MemberPasswordUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/member/update/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
