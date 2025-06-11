import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Button, Card, Form, Input, message, Space, Tabs, Divider, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import {
  getMyMemberInfoUsingGet,
  updateMyInfoUsingPost,
  updatePasswordUsingPost,
} from '@/api/memberController';

const MemberSettings = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageStatus, setPageStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // 获取最新的用户信息
  const fetchUserInfo = async () => {
    try {
      // 使用标准API函数调用
      const res = await getMyMemberInfoUsingGet() as API.MemberVO;
      console.log('获取用户信息响应完整内容:', JSON.stringify(res, null, 2));
      
      // 响应拦截器已经解包了数据，res 直接就是 MemberVO 对象
      if (res && res.id && res.memberAccount) {
        console.log('成功获取用户信息数据:', res);
        // 更新表单数据
        profileForm.setFieldsValue({
          memberName: res.memberName || '',
          memberAvatar: res.memberAvatar || '',
          gender: res.gender, // 添加性别字段
        });
        
        // 更新页面状态
        setPageStatus('ready');
        return res;
      } else {
        console.error('返回数据不是有效的用户信息:', res);
        setPageStatus('error');
        return null;
      }
    } catch (error) {
      console.error('获取用户信息错误:', error);
      setPageStatus('error');
      return null;
    }
  };

  // 组件加载时获取用户信息
  useEffect(() => {
    console.log('个人设置页面初始化');
    console.log('当前用户信息:', currentUser);
    
    // 优先直接获取最新用户信息，不依赖currentUser状态
    fetchUserInfo()
      .then(userData => {
        if (userData) {
          console.log('API请求成功获取最新用户信息');
        } else if (currentUser?.id) {
          console.log('API请求失败但currentUser存在，使用currentUser数据');
          // 如果API请求失败但currentUser存在，使用currentUser填充表单
          profileForm.setFieldsValue({
            memberName: currentUser.memberName || '',
            memberAvatar: currentUser.memberAvatar || '',
            gender: currentUser.gender,
          });
          setPageStatus('ready');
        }
      })
      .catch(err => {
        console.error('获取用户信息异常:', err);
        if (currentUser?.id) {
          // 出错时如果有currentUser也使用它
          profileForm.setFieldsValue({
            memberName: currentUser.memberName || '',
            memberAvatar: currentUser.memberAvatar || '',
            gender: currentUser.gender,
          });
          setPageStatus('ready');
        }
      });
  }, [currentUser]);

  // 更新个人资料
  const handleUpdateProfile = async (values: { memberName: string; memberAvatar: string; gender?: number }) => {
    if (!currentUser?.id) {
      message.error('用户未登录');
      return;
    }
    
    setLoading(true);
    console.log('提交的个人资料:', values);
    
    try {
      // 使用标准API函数调用
      const res = await updateMyInfoUsingPost({
        memberName: values.memberName,
        memberAvatar: values.memberAvatar,
        gender: values.gender,
      });
      
      console.log('更新个人资料响应:', JSON.stringify(res, null, 2));
      
      // 响应拦截器已经解包了数据，res 直接就是布尔值
      if (res) {
        message.success('更新成功');
        
        // 更新全局状态中的用户信息
        if (initialState?.fetchUserInfo) {
          const newUserInfo = await initialState.fetchUserInfo();
          if (newUserInfo) {
            console.log('已更新全局用户状态');
            
            // 重新获取最新数据，更新表单
            fetchUserInfo();
          }
        }
      } else {
        message.error(`更新失败: 未知错误`);
      }
    } catch (error) {
      console.error('更新个人资料错误:', error);
      message.error(`更新失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  // 修改密码
  const handleUpdatePassword = async (values: { 
    oldPassword: string; 
    newPassword: string; 
    confirmPassword: string 
  }) => {
    if (!currentUser?.id) {
      message.error('用户未登录');
      return;
    }
    
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次输入的新密码不一致');
      return;
    }
    
    setLoading(true);
    console.log('提交密码修改请求');
    
    try {
      // 使用标准API函数调用
      const res = await updatePasswordUsingPost({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        checkPassword: values.confirmPassword, // 确保字段名与API匹配
      });
      
      console.log('修改密码响应:', JSON.stringify(res, null, 2));
      
      // 响应拦截器已经解包了数据，res 直接就是布尔值
      if (res) {
        message.success('密码修改成功');
        passwordForm.resetFields();
      } else {
        message.error(`密码修改失败: 未知错误`);
      }
    } catch (error) {
      console.error('修改密码错误:', error);
      message.error(`密码修改失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: '个人资料',
      children: (
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleUpdateProfile}
        >
          <Form.Item 
            label="头像链接" 
            name="memberAvatar"
            extra="请输入有效的图片URL地址，建议使用HTTPS链接"
            initialValue={currentUser?.memberAvatar || ''}
          >
            <Input placeholder="请输入头像链接" />
          </Form.Item>
          
          <Form.Item 
            label="用户名" 
            name="memberName"
            initialValue={currentUser?.memberName || ''}
            rules={[
              { required: true, message: '请输入用户名' },
              { max: 12, message: '用户名不能超过12个字符' },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          
          <Form.Item 
            label="性别" 
            name="gender"
            initialValue={currentUser?.gender || 0}
          >
            <Radio.Group>
              <Radio value={0}>保密</Radio>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存设置
            </Button>
            <Button 
              style={{ marginLeft: 8 }} 
              onClick={() => history.back()}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'password',
      label: '修改密码',
      children: (
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleUpdatePassword}
        >
          <Form.Item
            label="原密码"
            name="oldPassword"
            rules={[
              { required: true, message: '请输入原密码' },
              { min: 8, message: '密码长度不能小于8位' },
            ]}
          >
            <Input.Password 
              placeholder="请输入原密码" 
              prefix={<LockOutlined />} 
            />
          </Form.Item>
          
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 8, message: '新密码长度不能小于8位' },
            ]}
          >
            <Input.Password 
              placeholder="请输入新密码" 
              prefix={<LockOutlined />} 
            />
          </Form.Item>
          
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password 
              placeholder="请再次输入新密码" 
              prefix={<LockOutlined />} 
            />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} danger>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  // 根据页面状态渲染不同内容
  if (pageStatus === 'loading') {
    return (
      <PageContainer title="个人设置">
        <Card style={{ textAlign: 'center', padding: '50px' }}>
          <Space direction="vertical" align="center">
            <LoadingOutlined style={{ fontSize: 36 }} spin />
            <div style={{ marginTop: 16 }}>用户信息加载中...</div>
          </Space>
        </Card>
      </PageContainer>
    );
  }

  if (pageStatus === 'error') {
    return (
      <PageContainer title="个人设置">
        <Card>
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: 18, marginBottom: 16 }}>获取用户信息失败</div>
            <Button 
              type="primary" 
              onClick={() => window.location.reload()}
            >
              刷新页面
            </Button>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="个人设置">
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar 
            size={100} 
            icon={<UserOutlined />} 
            src={currentUser?.memberAvatar || profileForm.getFieldValue('memberAvatar')}
            alt="用户头像"
            style={{ 
              border: '1px solid #f0f0f0', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <div style={{ marginTop: 8, fontSize: 16, fontWeight: 'bold' }}>
            {currentUser?.memberName || profileForm.getFieldValue('memberName') || ''}
            {currentUser?.memberRole === 'admin' && 
              <span style={{ 
                backgroundColor: '#1890ff', 
                color: 'white', 
                fontSize: 12, 
                padding: '2px 8px', 
                borderRadius: 4, 
                marginLeft: 8 
              }}>
                管理员
              </span>
            }
          </div>
        </div>
        
        <Divider />
        
        <Tabs 
          items={items} 
          defaultActiveKey="profile"
          tabBarStyle={{ marginBottom: 20 }}
        />
      </Card>
    </PageContainer>
  );
};

export default MemberSettings; 