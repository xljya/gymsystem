import request from '@/utils/request';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProTable, TableDropdown, ModalForm, ProFormText, ProFormDateTimePicker } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
import {
  addBookingUsingPost,
  deleteBookingUsingPost,
  updateBookingUsingPost,
} from '@/api/courseBookingController';

const columns: ProColumns<API.CourseBookingVO>[] = [
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
    title: '预约ID',
    dataIndex: 'bookingId',
    hideInSearch: true,
    editable: false,
  },
  {
    title: '会员ID',
    dataIndex: 'memberId',
    hideInSearch: true,
    editable: false,
  },
  {
    title: '课表ID',
    dataIndex: 'scheduleId',
    hideInSearch: true,
    editable: false,
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
    title: '预约状态',
    dataIndex: 'bookingStatus',
    valueEnum: {
      0: { text: '已预约', status: 'Processing' },
      1: { text: '已取消', status: 'Default' },
      2: { text: '已完成', status: 'Success' },
    },
  },
  {
    title: '出勤状态',
    dataIndex: 'attendanceStatus',
    valueEnum: {
      0: { text: '未签到', status: 'Default' },
      1: { text: '已签到', status: 'Success' },
      2: { text: '缺席', status: 'Error' },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          if (record.bookingId) {
            action?.startEditable?.(record.bookingId);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          if (key === 'delete' && record.bookingId) {
            deleteBookingUsingPost({ id: record.bookingId })
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

  const handleAdd = async (fields: API.CourseBookingAddRequest) => {
    try {
      const res = await addBookingUsingPost(fields);
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
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: 120, marginBottom: 60 }}>
      <ProTable<API.CourseBookingVO>
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
            新增预约
          </a>,
        ]}
        request={async (params) => {
          // 打印请求参数，便于调试
          console.log('请求参数:', params);
          // 发送 POST 请求到后端接口，获取课程预约分页数据
          const res = await request('/api/course/booking/list/page/vo', {
            method: 'POST',
            data: {
              // 搜索条件
              current: params.current,
              pageSize: params.pageSize,
              bookingId: params.bookingId,
              bookingStatus: params.bookingStatus,
              attendanceStatus: params.attendanceStatus,
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
        editable={{
          type: 'single',
          onSave: async (key, record) => {
            try {
              const res = await updateBookingUsingPost({
                bookingId: record.bookingId,
                bookingStatus: record.bookingStatus,
                attendanceStatus: record.attendanceStatus,
                memberId: record.memberId,
                scheduleId: record.scheduleId,
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
            console.log('columnsState 变化:', value);
          },
        }}
        rowKey="bookingId"
        search={{ labelWidth: 'auto' }}
        options={{ setting: { listsHeight: 400 } }}
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
          onChange: (page) => console.log('当前页:', page),
        }}
        dateFormatter="string"
        headerTitle=""
      />

      <ModalForm
        title="新增预约"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          await handleAdd(values as API.CourseBookingAddRequest);
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
          ]}
        />
        <ProFormText
          name="scheduleId"
          label="排课ID"
          rules={[
            {
              required: true,
              message: '请输入排课ID',
            },
          ]}
        />
        <ProFormSelect
          name="bookingStatus"
          label="预约状态"
          valueEnum={{
            0: '已取消',
            1: '已预约',
            2: '已完成',
          }}
          rules={[
            {
              required: true,
              message: '请选择预约状态',
            },
          ]}
        />
        <ProFormSelect
          name="attendanceStatus"
          label="出勤状态"
          valueEnum={{
            0: '未到',
            1: '已到',
            2: '请假',
            3: '爽约',
          }}
          rules={[
            {
              required: true,
              message: '请选择出勤状态',
            },
          ]}
        />
      </ModalForm>
    </div>
  );
};
