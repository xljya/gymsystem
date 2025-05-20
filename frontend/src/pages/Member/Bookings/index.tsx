import { PageContainer } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { deleteMyBookingUsingPost } from '@/api/courseBookingController';
import request from '@/utils/request';
import { useRef } from 'react';
import { Button, Modal, message } from 'antd';

const MemberBookings = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const actionRef = useRef<ActionType>();

  const handleCancelBooking = async (bookingId: number) => {
    Modal.confirm({
      title: '取消预约',
      content: '确定要取消这个课程预约吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          const res = await deleteMyBookingUsingPost({ id: bookingId });
          console.log('取消预约响应:', res);
          if (res) {
            message.success('预约已取消');
            actionRef.current?.reload();
          } else {
            message.error('取消预约失败，请稍后再试');
          }
        } catch (error) {
          console.error('取消预约错误:', error);
          message.error('取消预约失败，请稍后再试');
        }
      },
    });
  };

  const columns: ProColumns<API.CourseBookingVO & { courseName?: string; courseDate?: string; startTime?: string; endTime?: string; location?: string; memberName?: string  }>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      title: '序号',
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      hideInSearch: true,
    },
    {
      title: '上课日期',
      dataIndex: 'courseDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '上课时间',
      dataIndex: 'startTime',
      hideInSearch: true,
      render: (_, record) => {
        return record.startTime && record.endTime ? `${record.startTime} - ${record.endTime}` : '-';
      },
    },
    {
      title: '上课地点',
      dataIndex: 'location',
      hideInSearch: true,
    },
    {
      title: '预约时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '预约状态',
      dataIndex: 'bookingStatus',
      valueEnum: {
        0: { text: '已取消', status: 'Default' },
        1: { text: '已预约', status: 'Processing' },
        2: { text: '已完成', status: 'Success' },
      },
    },
    {
      title: '出勤状态',
      dataIndex: 'attendanceStatus',
      valueEnum: {
        0: { text: '未签到', status: 'Default' },
        1: { text: '已签到', status: 'Success' },
        2: { text: '请假', status: 'Warning' },
        3: { text: '缺席', status: 'Error' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        record.bookingStatus === 1 ? (
          <Button 
            key="cancel"
            type="link"
            danger
            onClick={() => handleCancelBooking(record.bookingId as number)}
          >
            取消预约
          </Button>
        ) : null,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.CourseBookingVO>
        headerTitle=""
        actionRef={actionRef}
        rowKey="bookingId"
        search={false}
        toolBarRender={() => []}
        request={async (params) => {
          if (!currentUser?.id) {
            return {
              data: [],
              success: true,
              total: 0,
            };
          }
          
          // 打印请求参数，便于调试
          console.log('会员预约-请求参数:', params);
          
          try {
            // 使用与管理员相同的请求方式
            const res = await request('/api/course/booking/list/page/vo/my', {
              method: 'POST',
              data: {
                memberId: currentUser.id,
                current: params.current,
                pageSize: params.pageSize,
              },
            });
            
            // 打印响应数据，便于调试
            console.log('会员预约-响应数据:', res);
            
            // 返回 ProTable 需要的数据格式
            return {
              data: res.records || [],
              success: true,
              total: Number(res.total) || 0,
            };
          } catch (error) {
            console.error('会员预约-获取数据失败:', error);
            message.error('获取预约数据失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default MemberBookings; 