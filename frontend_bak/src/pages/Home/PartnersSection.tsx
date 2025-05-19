import { Col, ConfigProvider, Row, Typography } from 'antd';
import styles from './PartnersSection.module.css';

const { Title } = Typography;

// 模拟的合作伙伴 Logo 数据（请替换为你的实际数据）
// 你可以从 API 获取这些数据
const brandPartners = [
  {
    id: 1,
    name: '品牌 A',
    logoUrl: 'https://image.liucf.com/images/2025/04/ffb30097ade2ef17775d42e7e3418ebf.avif',
    linkUrl: 'https://www.cursor.com/',
  },
  {
    id: 2,
    name: '品牌 B',
    logoUrl: 'https://image.liucf.com/images/2025/04/5e57bfd9dfb9fa01e057206d275539e5.webp',
    linkUrl: 'https://chatgpt.com/',
  },
  {
    id: 3,
    name: '品牌 C',
    logoUrl: 'https://image.liucf.com/images/2025/04/6e936a6d9a2ee84e02bc18a23736b7e8.png',
    linkUrl: 'https://www.deepseek.com/',
  },
  {
    id: 4,
    name: '品牌 D',
    logoUrl: 'https://image.liucf.com/images/2025/04/92428c150b738025360250e8725c6d67.png',
    linkUrl: 'https://github.com/',
  },
  {
    id: 5,
    name: '品牌 E',
    logoUrl: 'https://image.liucf.com/images/2025/05/e697701b4950608cdb41ec0ea923ccf3.svg',
    linkUrl: 'https://lovable.dev/',
  },
  {
    id: 6,
    name: '品牌 F',
    logoUrl: 'https://image.liucf.com/images/2025/04/d0e56d131bfb5f12169280b4ac424a3a.png',
    linkUrl: 'https://leonardo.ai/',
  },
];

const PartnersSection = () => {
  return (
    // ConfigProvider 仍然保留，以备将来可能需要自定义样式
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d92621', // 设置主要颜色
        },
        components: {
            Button: { // 为遮罩层按钮定制样式（可选）
                // 如果希望按钮是白色透明背景，可能需要更复杂的定制
            }
        }
      }}
    >
      {/* 外层容器 */}
      <div
        style={{
          width: '100%',
          padding: '48px 0',
          backgroundColor: 'rgb(250, 250, 250)', // 修改背景颜色
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* 标题 */}
        <Title level={4} style={{ marginBottom: '32px', fontWeight: 'bold' }}>
          合作伙伴
        </Title>{' '}
        {/* 调整了标题和 Logo 网格之间的间距 */}
        {/* Logo 网格 */}
        <Row gutter={[32, 32]} style={{ width: '100%', maxWidth: '896px', padding: '0 16px' }}>
          {/* 直接映射 brandPartners */}
          {brandPartners.length > 0 ? (
            brandPartners.map((partner) => (
              <Col key={partner.id} xs={12} md={8}>
                <div
                  className={styles.logoContainer}
                  onClick={() => window.open(partner.linkUrl, '_blank')}
                  style={{ cursor: 'pointer' }} // 添加指针样式以提示可点击
                >
                  <div className={styles.logoContent}>
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                      />
                    ) : (
                      `${partner.name}` // 显示占位文字
                    )}
                  </div>
                  {/* 移除按钮，注释掉遮罩层内容 */}
                  {/* <div className={styles.overlay}>
                    <Button
                      type="primary"
                      href={partner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.overlayButton}
                      ghost
                      onClick={(e) => e.stopPropagation()} // 阻止事件冒泡到父级 div
                    >
                      了解更多
                    </Button>
                  </div> */}
                </div>
              </Col>
            ))
          ) : (
            // 保留无数据时的提示
            <Col
              span={24}
              style={{
                textAlign: 'center',
                color: '#9ca3af',
                minHeight: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              暂无合作伙伴
            </Col>
          )}
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default PartnersSection;
