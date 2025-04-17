import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Row, Col, Statistic, Space } from 'antd';
import { UserOutlined, TeamOutlined, ShoppingCartOutlined, BookOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <PageContainer>
        <div style={{ padding: '24px' }}>
          <ProCard
            title={`欢迎回来，${currentUser?.memberName || '会员'}！`}
            subTitle="以下是您的健身数据概览"
            extra={<Space>上次登录时间：{currentUser?.updateTime || '未知'}</Space>}
            style={{ marginBottom: 24 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="剩余课程"
                    value={0}
                    prefix={<BookOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="我的教练"
                    value={0}
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="消费记录"
                    value={0}
                    prefix={<ShoppingCartOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="会员积分"
                    value={0}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
            </Row>
          </ProCard>

          <ProCard
            title="健身小贴士"
            style={{ marginBottom: 24 }}
          >
            <div style={{ padding: '16px' }}>
              <h3>科学健身，健康生活</h3>
              <p>1. 运动前请做好充分的热身准备</p>
              <p>2. 根据个人情况选择合适的运动强度</p>
              <p>3. 保持规律的锻炼习惯</p>
              <p>4. 注意补充水分和营养</p>
              <p>5. 运动后做好拉伸放松</p>
            </div>
          </ProCard>

          <ProCard
            title="最新活动"
            style={{ marginBottom: 24 }}
          >
            <div style={{ padding: '16px' }}>
              <h3>会员专享活动</h3>
              <p>1. 新会员注册即送100积分</p>
              <p>2. 推荐好友入会，双方各得200积分</p>
              <p>3. 每月消费满1000元，赠送私教课程一节</p>
              <p>4. 生日当月消费享8折优惠</p>
            </div>
          </ProCard>
        </div>
      </PageContainer>
    </div>
  );
};

export default HomePage; 