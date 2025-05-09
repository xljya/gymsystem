import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { toast } from 'sonner';
 // 假设 API 类型定义在这里

interface CourseBookingFormProps {
  courseId: string;
  courseName: string;
  coachId?: string; // 添加 coachId prop
  currentUser?: API.LoginMemberVO; // 添加 currentUser prop
  onSuccess?: () => void;
  onClose?: () => void; // 添加 onClose 回调，用于关闭弹窗
}

const CourseBookingForm: React.FC<CourseBookingFormProps> = ({
  courseId,
  courseName,
  coachId, // 接收 coachId
  currentUser,
  onSuccess,
  onClose, // 接收 onClose
}) => {
  const [bookingTime, setBookingTime] = useState<dayjs.Dayjs>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.memberName || '',
  });

  // 当 currentUser 更新时，同步更新表单数据
  useEffect(() => {
    setFormData({
      name: currentUser?.memberName || '',
    });
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingTime) {
      toast.error('请选择预约时间');
      return;
    }

    setLoading(true);
    try {
      const formattedBookingDate = bookingTime.format('YYYY-MM-DD HH:mm:ss');

      const response = await fetch('/api/member/course/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_id: Number(currentUser?.id),
          coach_id: Number(coachId),
          course_id: Number(courseId),
          create_time: formattedBookingDate,
          member_name: formData.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '预约失败');
      }

      toast.success('预约成功！');
      onSuccess?.();
      // 重置表单
      setFormData({
        name: currentUser?.memberName || '',
      });
      setBookingTime(undefined);
      onClose?.(); // 成功后调用 onClose 关闭弹窗
    } catch (error: any) {
      toast.error(error.message || '预约失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          DatePicker: {
            presetsWidth: 180,
            presetsMaxWidth: 180,
          },
        },
      }}
    >
      <div className="max-w-md w-full mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900 text-center mb-1">预约课程</h3>
        <p className="text-sm text-gray-500 text-center mb-6">课程名称：{courseName}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentUser?.id && (
            <div>
              <Label htmlFor="memberId" className="mb-1 block text-sm text-gray-700">会员ID</Label>
              <Input
                id="memberId"
                value={currentUser.id}
                readOnly
                className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          )}
          <div>
            <Label htmlFor="name" className="mb-1 block text-sm text-gray-700">姓名</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="请输入您的姓名"
              required
              className="w-full"
            />
          </div>

          {coachId && (
            <div>
              <Label htmlFor="coachId" className="mb-1 block text-sm text-gray-700">教练ID</Label>
              <Input
                id="coachId"
                value={coachId}
                readOnly
                className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <Label htmlFor="courseId" className="mb-1 block text-sm text-gray-700">课程ID</Label>
            <Input
              id="courseId"
              value={courseId}
              readOnly
              className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          
          <div>
            <Label className="mb-1 block text-sm text-gray-700">预约时间</Label>
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm:ss"
              value={bookingTime}
              onChange={(date) => setBookingTime(date)}
              placeholder="选择日期和时间"
              className="w-full h-10 border-gray-300 hover:border-gray-400 focus:border-indigo-500"
              disabledDate={(current) => current < dayjs().startOf('day')}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-900 transition rounded-lg mt-4"
          >
            {loading ? '提交中…' : '确认预约'}
          </Button>
        </form>
      </div>
    </ConfigProvider>
  );
};

export default CourseBookingForm; 