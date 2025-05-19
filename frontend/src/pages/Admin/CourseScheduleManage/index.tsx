import {
  addScheduleUsingPost,
  deleteScheduleUsingPost,
  updateScheduleUsingPost,
} from '@/api/courseScheduleController';
import request from '@/utils/request';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormText,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';

const columns: ProColumns<API.CourseScheduleVO>[] = [
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
    title: '排期ID',
    dataIndex: 'scheduleId',
    hideInSearch: true,
    editable: false,
  },
  {
    title: '课程ID',
    dataIndex: 'courseId',
    hideInSearch: false,
  },
  {
    title: '教练ID',
    dataIndex: 'coachId',
    hideInSearch: false,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '教室编号',
    dataIndex: 'roomNumber',
    hideInSearch: true,
  },
  {
    title: '最大参与人数',
    dataIndex: 'maxParticipants',
    hideInSearch: true,
  },
  {
    title: '当前参与人数',
    dataIndex: 'currentParticipants',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      0: { text: '已取消', status: 'Error' },
      1: { text: '可预约', status: 'Processing' },
      2: { text: '已满', status: 'Warning' },
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
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, __, action) => [
      <a
        key="editable"
        onClick={() => {
          if (record.scheduleId) {
            action?.startEditable?.(record.scheduleId);
          }
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          if (key === 'delete' && record.scheduleId) {
            deleteScheduleUsingPost({ id: record.scheduleId })
              .then((res) => {
                if (res) {
                  message.success('删除成功');
                  action?.reload();
                } else {
                  message.error('删除失败');
                }
              })
              .catch(() => {
                message.error('删除操作异常');
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

  const handleAdd = async (fields: API.CourseScheduleAddRequest) => {
    try {
      const res = await addScheduleUsingPost(fields);
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
      <ProTable<API.CourseScheduleVO>
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
            新增课程排期
          </a>,
        ]}
        request={async (params) => {
          console.log('请求参数:', params);

          const res = await request('/api/course/schedule/list/page/vo', {
            method: 'POST',
            data: {
              current: params.current,
              pageSize: params.pageSize,
              courseId: params.courseId,
              coachId: params.coachId,
              status: params.status,
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
              const res = await updateScheduleUsingPost({
                scheduleId: record.scheduleId,
                courseId: record.courseId,
                coachId: record.coachId,
                startTime: record.startTime,
                endTime: record.endTime,
                roomNumber: record.roomNumber,
                maxParticipants: record.maxParticipants,
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
              message.error('更新操作失败');
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
        rowKey="scheduleId"
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
        title="新增课程排期"
        width="400px"
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={async (values) => {
          await handleAdd(values as API.CourseScheduleAddRequest);
        }}
      >
        <ProFormDigit
          name="courseId"
          label="课程ID"
          min={1}
          rules={[{ required: true, message: '请输入课程ID' }]}
        />
        <ProFormDigit
          name="coachId"
          label="教练ID"
          min={1}
          rules={[{ required: true, message: '请输入教练ID' }]}
        />
        <ProFormText
          name="roomNumber"
          label="教室编号"
          rules={[{ required: true, message: '请输入教室编号' }]}
        />
        <ProFormDateTimePicker
          name="startTime"
          label="开始时间"
          rules={[{ required: true, message: '请选择开始时间' }]}
        />
        <ProFormDateTimePicker
          name="endTime"
          label="结束时间"
          rules={[{ required: true, message: '请选择结束时间' }]}
        />
        <ProFormDigit
          name="maxParticipants"
          label="最大参与人数"
          min={1}
          rules={[{ required: true, message: '请输入最大参与人数' }]}
        />
      </ModalForm>
    </div>
  );
};
