package com.liucf.gymsystembackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.vo.CourseVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
* @author yueyue
* @description 针对表【course(课程信息表)】的数据库操作Mapper
* @createDate 2025-04-30 19:22:50
* @Entity com.liucf.gymsystembackend.model.entity.Course
*/
@Mapper
public interface CourseMapper extends BaseMapper<Course> {

    /**
     * 根据课程ID获取课程VO（包含分类和教练名称）
     * @param id 课程ID
     * @return CourseVO
     */
    CourseVO selectCourseVoById(@Param("id") Long id);

    /**
     * 获取所有课程VO列表（包含分类和教练名称）
     * @return List<CourseVO>
     */
    List<CourseVO> listAllCoursesForVO();

    /**
     * 根据分类ID获取课程VO列表（包含分类和教练名称）
     * @param categoryId 分类ID
     * @return List<CourseVO>
     */
    List<CourseVO> selectCourseVOsByCategoryId(@Param("categoryId") Long categoryId);

}




