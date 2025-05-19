import React from 'react';
import { Button } from 'antd';
import { useModel } from '@umijs/max';
import { Link } from 'umi';

/**
 * 全局头部组件
 * 显示会员登录状态和登录按钮
 */
const GlobalHeader: React.FC = () => {
  // 使用 UmiJS 的 useModel 钩子获取全局状态
  const { initialState } = useModel('@@initialState');
  // 从全局状态中获取当前登录的会员信息
  const { currentMember } = initialState || {};

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
      <div className="member-login-status">
        {/* 如果会员已登录（有id），显示会员名称 */}
        {currentMember?.id ? (
          <div>{currentMember.memberName || 'Stargaze'}</div>
        ) : (
          // 如果未登录，显示登录按钮
          <Button type="primary">
            <Link to="/member/login">登录</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default GlobalHeader; 