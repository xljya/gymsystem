import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, ModalForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { Image, message, Tag } from 'antd';
import { updateCoachUsingPost, deleteCoachUsingPost, addCoachUsingPost } from '@/api/coachController';
import request from '@/utils/request';

// 教练管理
const columns: ProColumns<API.CoachVO>[] = [
  // ...（省略表格列定义，和原来一样）
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
          src={
            record.coachAvatar ||
            'https://image.liucf.com/images/2025/05/90f433495b9f855d61092482c6bfaaef.png'
          }
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
      return <Tag color={color}>{record.coachStatus === 0 ? '在职' : '离职'}</Tag>;
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
            deleteCoachUsingPost({ id: record.coachId })
              .then((res) => {
                console.log('删除响应:', res);
                if (res) {
                  message.success('删除成功');
                  action?.reload();
                } else {
                  message.error('删除失败');
                }
              })
              .catch((error) => {
                console.error('删除错误:', error);
                message.error('删除失败');
              });
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

  /**
   * 新增教练的表单是如何提交的？
   * 
   * 1. 当用户点击“新增教练”按钮时，createModalVisible 设为 true，弹出 ModalForm 表单。
   * 2. 用户填写表单后，点击提交，ModalForm 的 onFinish 会被触发。
   * 3. onFinish 会调用 handleAdd 方法，并将表单填写的数据（values）作为参数传入。
   * 4. handleAdd 方法内部会调用 addCoachUsingPost(fields) 向后端发送新增教练的请求。
   * 5. 如果后端返回成功，弹出“添加成功”提示，关闭弹窗，并刷新表格数据。
   * 6. 如果失败，则弹出“添加失败”提示。
   */
  const handleAdd = async (fields: API.CoachAddRequest) => {
    try {
      // 这里将表单数据提交到后端
      const res = await addCoachUsingPost(fields);
      console.log('新增响应:', res);
      if (res) {
        message.success('添加成功');
        setCreateModalVisible(false); // 关闭弹窗
        actionRef.current?.reload();  // 刷新表格
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
        // ProTable 的 request 方法，用于请求教练列表分页数据
        request={async (params) => {
          // 打印请求参数，便于调试
          console.log('请求参数:', params);
          // 发送 POST 请求到后端接口，获取教练分页数据
          const res = await request('/api/coach/list/page/vo', {
            method: 'POST',
            data: {
              // 当前页码
              current: params.current,
              // 每页条数
              pageSize: params.pageSize,
              // 搜索条件：教练姓名
              coachName: params.coachName,
              // 搜索条件：教练账号
              coachAccount: params.coachAccount,
              // 搜索条件：性别
              gender: params.gender,
            },
          });
          // 打印响应数据，便于调试
          console.log('响应数据:', res);
          // 返回 ProTable 需要的数据格式
          return {
            // data 字段：表格要展示的数据，来源于接口返回的 records 字段
            // 如果 records 不存在，则返回空数组
            data: res.records || [],
            // success 字段：请求是否成功，这里直接写 true
            success: true,
            // total 字段：数据总数，来源于接口返回的 total 字段
            // 如果 total 不存在，则返回 0
            total: Number(res.total) || 0,
          };
        }}
        /*
          解读：
          data 数据是怎么来的？
          - data 字段是 ProTable 组件用来渲染表格的主要数据源。
          - 这里的 data: res.records || []，意思是从后端接口 /api/coach/list/page/vo 的响应结果中，取出 records 字段作为表格的数据。
          - 如果接口没有返回 records 字段，则用空数组代替，避免表格报错。
          - 通常后端会返回一个分页对象，包含 records（当前页数据数组）、total（总条数）等字段。
          - 所以 data 实际上就是后端分页接口返回的当前页的教练数据列表。
        */
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

      {/* 新增教练的表单，提交时会触发 onFinish，调用 handleAdd 方法 */}
      <ModalForm
        title="新增教练"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          // 这里会把表单数据传递给 handleAdd 进行提交
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