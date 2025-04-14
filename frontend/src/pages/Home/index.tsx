import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const HomePage: React.FC = () => {
  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <PageContainer>
        <div>
          <h1>欢迎来到健身房管理系统</h1>
          <p>这是一个专业的健身房管理系统，提供会员管理、课程管理等功能。</p>
        </div>
      </PageContainer>
    </div>
  );
};

export default HomePage; 