package com.liucf.gymsystembackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.liucf.gymsystembackend.model.entity.CourseSchedule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
* @author yueyue
* @description 针对表【course_schedule(课程排期表)】的数据库操作Mapper
* @createDate 2025-04-30 19:22:50
* @Entity com.liucf.gymsystembackend.model.entity.CourseSchedule
*/
@Mapper
public interface CourseScheduleMapper extends BaseMapper<CourseSchedule> {

    /**
     * 根据课程ID查询其所有有效排期
     * @param courseId 课程ID
     * @return 该课程的排期列表
     */
    List<CourseSchedule> selectSchedulesByCourseId(@Param("courseId") Long courseId);
    
    List<CourseSchedule> selectSchedulesByCourseIds(@Param("courseIds") List<Long> courseIds);

}




