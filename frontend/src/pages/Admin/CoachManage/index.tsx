import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, ModalForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { Image, message, Tag } from 'antd';
import { updateCoachUsingPost, deleteCoachUsingPost, addCoachUsingPost } from '@/api/coachController';
import request from '@/utils/request';

const columns: ProColumns<API.CoachVO>[] = [
  {
    dataIndex: 'coachId',
    valueType: 'index',
    width: 48,
    title: '序号',
    hideInSearch: true,
    editable: false,
    render: (_, __, index) => index + 1,
  },
  {
    title: '教练名称',
    dataIndex: 'coachName',
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
    title: '教练账号',
    dataIndex: 'coachAccount',
    copyable: true,
    ellipsis: true,
    editable: false,
  },
  {
    title: '头像',
    dataIndex: 'coachAvatar',
    width: 100,
    render: (_, record) => (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Image 
          src={record.coachAvatar || 'https://liuyueyue.top/images/preview.jpg'} 
          width={50} 
          height={50}
          style={{ objectFit: 'cover' }}
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
    title: '年龄',
    dataIndex: 'coachAge',
    hideInSearch: true,
  },
  {
    title: '课程类型',
    dataIndex: 'courseType',
    hideInSearch: true,
  },
  {
    title: '薪资',
    dataIndex: 'coachSalary',
    hideInSearch: true,
  },
  {
    title: '地址',
    dataIndex: 'coachAddress',
    hideInSearch: true,
  },
  {
    title: '入职日期',
    dataIndex: 'entryDate',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'coachStatus',
    valueEnum: {
      0: { text: '在职', status: 'Success' },
      1: { text: '离职', status: 'Error' },
    },
    render: (_, record) => {
      const color = record.coachStatus === 0 ? 'success' : 'error';
      return (
        <Tag color={color}>
          {record.coachStatus === 0 ? '在职' : '离职'}
        </Tag>
      );
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
          if (record.coachId) {
            action?.startEditable?.(record.coachId);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          if (key === 'delete' && record.coachId) {
            deleteCoachUsingPost({ id: record.coachId }).then((res) => {
              console.log('删除响应:', res);
              if (res) {
                message.success('删除成功');
                action?.reload();
              } else {
                message.error('删除失败');
              }
            }).catch(error => {
              console.error('删除错误:', error);
              message.error('删除失败');
            });
          }
        }}
        menus={[
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const handleAdd = async (fields: API.CoachAddRequest) => {
    try {
      const res = await addCoachUsingPost(fields);
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
      <ProTable<API.CoachVO>
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
            新增教练
          </a>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);
          const res = await request('/api/coach/list/page/vo', {
            method: 'POST',
            data: {
              current: params.current,
              pageSize: params.pageSize,
              coachName: params.coachName,
              coachAccount: params.coachAccount,
              gender: params.gender,
            },
          });
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
              const res = await updateCoachUsingPost({
                coachId: record.coachId,
                coachName: record.coachName,
                coachAvatar: record.coachAvatar,
                gender: record.gender,
                coachAge: record.coachAge,
                courseType: record.courseType,
                coachSalary: record.coachSalary,
                coachAddress: record.coachAddress,
                entryDate: record.entryDate,
                coachStatus: record.coachStatus,
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
        rowKey="coachId"
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
        title="新增教练"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          await handleAdd(values as API.CoachAddRequest);
        }}
      >
        <ProFormText
          name="coachName"
          label="教练名称"
          rules={[
            {
              required: true,
              message: '请输入教练名称',
            },
          ]}
        />
        <ProFormText
          name="coachAccount"
          label="教练账号"
          rules={[
            {
              required: true,
              message: '请输入教练账号',
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
        <ProFormText
          name="coachAge"
          label="年龄"
          rules={[
            {
              required: true,
              message: '请输入年龄',
            },
          ]}
        />
        <ProFormText
          name="courseType"
          label="课程类型"
          rules={[
            {
              required: true,
              message: '请输入课程类型',
            },
          ]}
        />
        <ProFormText
          name="coachSalary"
          label="薪资"
          rules={[
            {
              required: true,
              message: '请输入薪资',
            },
          ]}
        />
        <ProFormText
          name="coachAddress"
          label="地址"
          rules={[
            {
              required: true,
              message: '请输入地址',
            },
          ]}
        />
        <ProFormDatePicker
          name="entryDate"
          label="入职日期"
          rules={[
            {
              required: true,
              message: '请选择入职日期',
            },
          ]}
        />
      </ModalForm>
    </div>
  );
}; 