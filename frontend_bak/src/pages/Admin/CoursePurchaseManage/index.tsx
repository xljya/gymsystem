import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, ModalForm, ProFormText } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { message } from 'antd';
import { updateCoursePurchaseUsingPost, deleteCoursePurchaseUsingPost, addCoursePurchaseUsingPost } from '@/api/coursePurchaseController';
import request from '@/utils/request';

const columns: ProColumns<API.CoursePurchaseVO>[] = [
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
    title: '会员ID',
    dataIndex: 'memberId',
    hideInSearch: true,
  },
  {
    title: '课程ID',
    dataIndex: 'courseId',
    hideInSearch: true,
  },
  {
    title: '教练ID',
    dataIndex: 'coachId',
    hideInSearch: true,
  },
  {
    title: '课时数',
    dataIndex: 'classCount',
    hideInSearch: true,
  },
  {
    title: '总价',
    dataIndex: 'totalPrice',
    valueType: 'money',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      0: { text: '无效', status: 'Error' },
      1: { text: '有效', status: 'Success' },
    },
    render: (_, record) => {
      const color = record.status === 1 ? 'success' : 'error';
      const text = record.status === 1 ? '有效' : '无效';
      return <span style={{ color: color === 'success' ? '#52c41a' : '#ff4d4f' }}>{text}</span>;
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
        onSelect={(key) => {
          if (key === 'delete' && record.id) {
            deleteCoursePurchaseUsingPost({ id: record.id })
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

  const handleAdd = async (fields: API.CoursePurchaseAddRequest) => {
    try {
      const res = await addCoursePurchaseUsingPost(fields);
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
      <ProTable<API.CoursePurchaseVO>
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
            新增购买记录
          </a>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);
          const res = await request('/api/coursePurchase/list/page/vo', {
            method: 'POST',
            data: {
              current: params.current,
              pageSize: params.pageSize,
              memberId: params.memberId,
              courseId: params.courseId,
              status: params.status,
              paymentStatus: params.status,
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
              const res = await updateCoursePurchaseUsingPost({
                id: record.id,
                memberId: record.memberId,
                courseId: record.courseId,
                coachId: record.coachId,
                classCount: record.classCount,
                totalPrice: record.totalPrice,
                status: record.status,
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
        title="新增购买记录"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          const data = {
            ...values,
            classCount: Number(values.classCount),
            totalPrice: Number(values.totalPrice),
          };
          await handleAdd(data as API.CoursePurchaseAddRequest);
        }}
      >
        <ProFormText
          name="memberId"
          label="会员ID"
          rules={[
            {
              required: true,
              message: '请输入会员ID',
            },
            {
              pattern: /^\d+$/,
              message: '请输入有效的数字ID',
            },
          ]}
        />
        <ProFormText
          name="courseId"
          label="课程ID"
          rules={[
            {
              required: true,
              message: '请输入课程ID',
            },
            {
              pattern: /^\d+$/,
              message: '请输入有效的数字ID',
            },
          ]}
        />
        <ProFormText
          name="coachId"
          label="教练ID"
          rules={[
            {
              required: true,
              message: '请输入教练ID',
            },
            {
              pattern: /^\d+$/,
              message: '请输入有效的数字ID',
            },
          ]}
        />
        <ProFormText
          name="classCount"
          label="课时数"
          rules={[
            {
              required: true,
              message: '请输入课时数',
            },
            {
              pattern: /^\d+$/,
              message: '请输入有效的数字',
            },
          ]}
        />
        <ProFormText
          name="totalPrice"
          label="总价"
          rules={[
            {
              required: true,
              message: '请输入总价',
            },
            {
              pattern: /^\d+(\.\d{1,2})?$/,
              message: '请输入有效的金额',
            },
          ]}
        />
      </ModalForm>
    </div>
  );
}; 