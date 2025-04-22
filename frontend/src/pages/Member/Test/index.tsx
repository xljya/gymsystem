import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';

const TestPage: React.FC = () => {
  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <PageContainer>
        <div style={{ padding: '24px' }}>
          <ProCard
            style={{ marginBottom: 24 }}
          >
            <div style={{ padding: '16px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>这是一个测试页面</h2>
              <p style={{ fontSize: '16px' }}>用于测试会员布局和导航功能</p>
            </div>
          </ProCard>
        </div>
      </PageContainer>
    </div>
  );
};

export default TestPage; 