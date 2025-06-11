import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { Image, message, Tag } from 'antd';
import { listMemberVoByPageUsingPost, updateMemberUsingPost, deleteMemberUsingPost, addMemberUsingPost } from '@/api/memberController';

const columns: ProColumns<API.MemberVO>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    width: 48,
    title: '序号',
    hideInSearch: true,
    editable: false,
    render: (_, __, index) => index + 1,
  },
  {
    title: '会员名称',
    dataIndex: 'memberName',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '会员账号',
    dataIndex: 'memberAccount',
    copyable: true,
    ellipsis: true,
    editable: false,
  },
  {
    title: '头像',
    dataIndex: 'memberAvatar',
    render: (_, record) => (
      <div>
        <Image
          src={
            record.memberAvatar ||
            'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058911861_0.png'
          }
          width={100}
        />
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      0: { text: '未知', status: 'Default' },
      1: { text: '男', status: 'Success' },
      2: { text: '女', status: 'Error' },
    },
  },
  {
    title: '角色',
    dataIndex: 'memberRole',
    valueType: 'select',
    valueEnum: {
      member: { text: '普通会员', status: 'Default' },
      admin: { text: '管理员', status: 'Success' },
    },
    render: (_, record) => {
      const color = record.memberRole === 'admin' ? 'success' : 'processing';
      return <Tag color={color}>{record.memberRole === 'admin' ? '管理员' : '普通会员'}</Tag>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          if (record.id) {
            action?.startEditable?.(record.id);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={async (key) => {
          if (key === 'delete' && record.id) {
            try {
              const res = await deleteMemberUsingPost({ id: record.id });
              console.log('删除响应:', res);
              if (res) {
                message.success('删除成功');
                action?.reload();
              } else {
                message.error('删除失败');
              }
            } catch (error) {
              console.error('删除错误:', error);
              message.error('删除失败');
            }
          }
        }}
        menus={[{ key: 'delete', name: '删除' }]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const handleAdd = async (fields: API.MemberAddRequest) => {
    try {
      const res = await addMemberUsingPost(fields);
      console.log('新增响应:', res);
      if (res) {
        message.success('添加成功');
        setCreateModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error('添加失败');
      }
    } catch (error) {
      console.error('添加错误:', error);
      message.error('添加失败');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '120px', marginBottom: '60px' }}>
      <ProTable<API.MemberVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        toolBarRender={() => [
          <a
            key="add"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            新增会员
          </a>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);
          const res = await listMemberVoByPageUsingPost({
            current: params.current,
            pageSize: params.pageSize,
            memberName: params.memberName,
            memberAccount: params.memberAccount,
            memberRole: params.memberRole,
            gender: params.gender,
          }) as API.PageMemberVO_;
          console.log('响应数据:', res);
          return {
            data: res.records || [],
            success: true,
            total: Number(res.total) || 0,
          };
        }}
        editable={{
          type: 'single',
          onSave: async (key, record) => {
            try {
              const res = await updateMemberUsingPost({
                id: record.id,
                memberName: record.memberName,
                memberAvatar: record.memberAvatar,
                gender: record.gender,
                memberRole: record.memberRole,
              });
              console.log('更新响应:', res);
              if (res) {
                message.success('更新成功');
                actionRef.current?.reload();
              } else {
                message.error('更新失败');
              }
            } catch (error) {
              console.error('更新错误:', error);
              message.error('更新失败');
            }
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle=""
      />

      <ModalForm
        title="新增会员"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          await handleAdd(values as API.MemberAddRequest);
        }}
      >
        <ProFormText
          name="memberName"
          label="会员名称"
          rules={[
            {
              required: true,
              message: '请输入会员名称',
            },
          ]}
        />
        <ProFormText
          name="memberAccount"
          label="会员账号"
          rules={[
            {
              required: true,
              message: '请输入会员账号',
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
        <ProFormSelect
          name="gender"
          label="性别"
          valueEnum={{
            0: '未知',
            1: '男',
            2: '女',
          }}
          rules={[
            {
              required: true,
              message: '请选择性别',
            },
          ]}
        />
        <ProFormSelect
          name="memberRole"
          label="角色"
          valueEnum={{
            member: '普通会员',
            admin: '管理员',
          }}
          rules={[
            {
              required: true,
              message: '请选择角色',
            },
          ]}
        />
      </ModalForm>
    </div>
  );
};