import { memberRegisterUsingPost } from '@/api/memberController';
import { Footer } from '@/components';
import { SYSTEM_LOGO } from '@/constants';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import {Link, useNavigate } from '@umijs/max';
import { message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';

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

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const navigate = useNavigate();

  const handleSubmit = async (values: API.MemberRegisterRequest) => {
    const { memberPassword, checkPassword } = values;

    // 校验密码一致性
    if (memberPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      const id = await memberRegisterUsingPost(values);

      if (id) {
        message.success('注册成功！');
        navigate('/member/login', { replace: true });
        return;
      } else {
        message.error('注册失败，请重试！');
      }
    } catch (error) {
      console.error('注册错误:', error);
      message.error('注册失败，请重试！');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="会员注册"
          subTitle="欢迎加入我们的健身管理系统"
          submitter={{
            searchConfig: {
              submitText: '注册',
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
                label: '账号密码注册',
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
                  {
                    min: 4,
                    message: '账号长度不能小于4位',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '账号只能包含字母、数字和下划线',
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
                    type: 'string',
                    message: '密码长度不能小于8位',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="请确认密码"
                rules={[
                  {
                    required: true,
                    message: '请确认密码',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不能小于8位',
                  },
                ]}
              />
            </>
          )}
          <div className={styles.tips}>
            已有账号？
            <Link to="/member/login">去登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
