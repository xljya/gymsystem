import { SYSTEM_LOGO } from '@/constants';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Space, Tag } from 'antd';
import React from 'react';

const AdminWelcomePage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  // 格式化时间函数
  const formatTime = (timeString: string | undefined) => {
    if (!timeString) return '未知';
    const date = new Date(timeString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <PageContainer>
        <div style={{ padding: '24px' }}>
          <ProCard
            title={
              <Space style={{ fontSize: '18px' }}>
                <Avatar
                  src={currentUser?.memberAvatar || SYSTEM_LOGO}
                  icon={<UserOutlined />}
                  size="large"
                />
                <span>{currentUser?.memberName || '管理员'}</span>
                <Tag icon={<CrownOutlined />} color="green" style={{ fontSize: '16px' }}>
                  管理员
                </Tag>
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            <div style={{ padding: '16px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>欢迎使用健身房管理系统</h2>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>
                您的账号：{currentUser?.memberAccount}
              </p>
              <p style={{ fontSize: '16px' }}>注册时间：{formatTime(currentUser?.createTime)}</p>
            </div>
          </ProCard>

          <ProCard
            title={<span style={{ fontSize: '20px' }}>系统功能</span>}
            style={{ marginBottom: 24 }}
          >
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>您可以进行以下管理操作：</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 会员管理：管理健身房会员信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 课程管理：管理健身房课程信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 课程类别管理：管理课程类别信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 课程排期管理：管理课程排期信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 课程预约管理：管理课程预约信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 教练管理：管理健身房教练信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 器材管理：管理健身房器材信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 商品管理：管理健身房商品信息
                </li>
                <li style={{ marginBottom: '12px', fontSize: '16px' }}>
                  • 商品销售管理：管理商品销售记录信息
                </li>
              </ul>
            </div>
          </ProCard>

          <ProCard title={<span style={{ fontSize: '20px' }}>系统提示</span>}>
            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>
                请使用左侧菜单选择您需要的功能。
              </p>
              <p style={{ fontSize: '16px' }}>如有任何问题，请联系系统管理员。</p>
            </div>
          </ProCard>
        </div>
      </PageContainer>
    </div>
  );
};

export default AdminWelcomePage;
