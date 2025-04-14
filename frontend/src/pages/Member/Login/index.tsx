import { Footer } from '@/components';
import { SYSTEM_LOGO } from '@/constants';
import { memberLoginUsingPost } from '@/api/memberController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useNavigate, Link, useModel } from '@umijs/max';
import { Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
    form: {
      flex: 1,
      marginTop: '120px',
      padding: '0 16px',
    },
    tips: {
      marginBottom: 16,
      color: '#bbb',
      fontSize: 13,
      textAlign: 'right',
    },
  };
});

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: API.MemberLoginRequest) => {
    try {
      const res = await memberLoginUsingPost(values);
      console.log('登录响应:', res);
      
      if (res.code === 0 && res.data) {
        // 使用 flushSync 同步更新状态
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: {
              ...res.data,
              memberAvatar: res.data.memberAvatar || SYSTEM_LOGO,
            },
          }));
        });
        
        message.success('登录成功！');
        // 使用 replace 而不是 push，避免浏览器历史记录堆积
        navigate('/', { replace: true });
      } else {
        message.error(res.message || '登录失败，请重试！');
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="会员登录"
          subTitle="欢迎使用健身管理系统"
          submitter={{
            searchConfig: {
              submitText: '登录',
            },
          }}
          onFinish={handleSubmit}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号密码登录',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="memberAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '请输入账号',
                  },
                ]}
              />
              <ProFormText.Password
                name="memberPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                  {
                    min: 8,
                    message: '密码长度不能小于8位',
                  },
                ]}
              />
            </>
          )}
          <div className={styles.tips}>
            还没有账号？
            <Link to="/member/register">去注册</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
