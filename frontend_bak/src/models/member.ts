import { useState, useCallback } from 'react';
import { getLoginMemberUsingGet } from '@/api/memberController';

export interface LoginMemberVO {
  id?: number;
  memberName?: string;
  memberAccount?: string;
  memberAvatar?: string;
  memberRole?: string;
  createTime?: string;
}

export default function useMemberModel() {
  const [loginMember, setLoginMember] = useState<LoginMemberVO>({
    memberName: '未登录',
  });

  const fetchLoginMember = useCallback(async () => {
    try {
      const res = await getLoginMemberUsingGet();
      if (res.code === 0 && res.data) {
        setLoginMember(res.data);
      }
    } catch (error) {
      console.error('获取登录会员信息失败:', error);
    }
  }, []);

  return {
    loginMember,
    fetchLoginMember,
  };
} 