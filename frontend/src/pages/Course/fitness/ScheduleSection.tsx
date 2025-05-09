import React, { useState } from 'react';
import { FitnessClass } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addBookingUsingPost } from '@/api/courseBookingController';
import { Modal } from 'antd';

// 课程日程表组件
interface ScheduleSectionProps {
  classes: FitnessClass[];
  currentUser?: API.LoginMemberVO;
}

// Helper interface for the processed schedule item
interface ScheduledClassItem extends FitnessClass {
  actualScheduleId: string;
  actualDay: string;
  actualTime: string;
}

const daysOfWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ classes, currentUser }) => {
  const [loadingScheduleId, setLoadingScheduleId] = useState<string | null>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successCourseName, setSuccessCourseName] = useState('');

  // Generate schedule data grouped by day, ensuring each item has its specific scheduleId
  const scheduleDataByDay = daysOfWeek.reduce((acc, day) => {
    const scheduledItemsForDay: ScheduledClassItem[] = [];
    classes.forEach(cls => {
      cls.schedule.forEach(sch => {
        if (sch.day === day) {
          const scheduleId = sch.scheduleId ? sch.scheduleId.toString() : '';
          scheduledItemsForDay.push({
            ...cls,
            actualScheduleId: scheduleId,
            actualDay: sch.day,
            actualTime: sch.time,
          });
        }
      });
    });
    // Sort by time
    scheduledItemsForDay.sort((a, b) => a.actualTime.localeCompare(b.actualTime));
    acc[day] = scheduledItemsForDay;
    return acc;
  }, {} as Record<string, ScheduledClassItem[]>);

  const handleBooking = async (scheduleId: string, courseName: string) => {
    console.log('[ScheduleSection] handleBooking called with:', { scheduleId, courseName });
    console.log('[ScheduleSection] currentUser:', currentUser);

    const memberId = currentUser!.id;

    console.log(`[ScheduleSection] Attempting to book scheduleId: ${scheduleId} for memberId: ${memberId}`);
    setLoadingScheduleId(scheduleId);
    try {
      const params: API.CourseBookingAddRequest = {
        scheduleId: Number(scheduleId),
        memberId: memberId,
      };
      console.log('[ScheduleSection] API call params:', params);
      const res = await addBookingUsingPost(params);
      console.log('[ScheduleSection] API response:', res);

      if (res) {
        setSuccessCourseName(courseName);
        setSuccessModalVisible(true);
      } else {
        console.error('[ScheduleSection] 预约API错误:');
        Modal.error({
          title: '预约失败',
          content: '请稍后再试',
        });
      }
    } catch (error: any) {
      console.error('[ScheduleSection] Catch block error:', error);
      Modal.error({
        title: '预约失败',
        content: '请稍后再试',
      });
    } finally {
      setLoadingScheduleId(null);
      console.log('[ScheduleSection] handleBooking finished.');
    }
  };

  return (
    <section id="schedule" className="py-12">
      <div className="fitness-container">
        <h2 className="text-3xl font-bold mb-8">课程日程表</h2>
        
        <Tabs defaultValue={daysOfWeek[0]} className="w-full">
          <TabsList className="mb-6 w-full flex flex-wrap h-auto bg-transparent justify-start border-b">
            {daysOfWeek.map(day => (
              <TabsTrigger 
                key={day}
                value={day}
                className="data-[state=active]:border-fitness-red data-[state=active]:text-fitness-red border-b-2 border-transparent px-4 py-2 rounded-none"
              >
                {day}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {daysOfWeek.map(day => (
            <TabsContent key={day} value={day} className="mt-0">
              {scheduleDataByDay[day].length === 0 ? (
                <Card className="bg-gray-50">
                  <CardContent className="p-8 text-center">
                    <p className="text-fitness-gray">这一天没有安排课程</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {scheduleDataByDay[day].map(classItem => (
                    <Card key={`${classItem.id}-${classItem.actualScheduleId}-${day}`} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-24 bg-fitness-red text-white p-4 flex items-center justify-center text-center">
                            <span className="text-xl font-bold">{classItem.actualTime}</span>
                          </div>
                          <div className="flex-grow p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex-grow">
                              <h4 className="font-bold">{classItem.title}</h4>
                              <p className="text-sm text-fitness-gray">{classItem.category} • {classItem.duration}分钟</p>
                            </div>
                            <button
                              type="button"
                              className="fitness-btn-secondary px-4 py-2"
                              onClick={() => handleBooking(classItem.actualScheduleId, classItem.title)}
                              disabled={loadingScheduleId === classItem.actualScheduleId}
                            >
                              {loadingScheduleId === classItem.actualScheduleId ? '预约中...' : '预约'}
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Modal
          title="预约成功"
          open={successModalVisible}
          onOk={() => setSuccessModalVisible(false)}
          onCancel={() => setSuccessModalVisible(false)}
          okText="确定"
          cancelText="关闭"
        >
          <p>课程 "{successCourseName}" 预约成功！</p>
        </Modal>
      </div>
    </section>
  );
};

export default ScheduleSection;
