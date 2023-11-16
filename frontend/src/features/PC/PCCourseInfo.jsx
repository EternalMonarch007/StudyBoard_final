import CourseInfoCSS from '@assets/css/CourseInfo.module.css';
import * as React from 'react';
import { apiClient } from '@lib/apiClient';
import LoadingSpinner from '@features/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const CourseInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const courseId = searchParams.get('courseId');
    if (!courseId) {
      navigate('/pcmycourses');
    }
  }, [navigate, searchParams]);

  const courseId = searchParams.get('courseId');
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', { courseId }],
    queryFn: async () => {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/courses/getCourseById/${courseId}`);

      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className={CourseInfoCSS.container}>
        <div className={CourseInfoCSS.leftElement}>
          <h2>{course.data.course_name}</h2>
        </div>
        <div className={CourseInfoCSS.rightElement}>
          <Link to={`/people/${courseId}`}>
            <button className={CourseInfoCSS.button}>People</button>
          </Link>
        </div>
      </div>
      <div>
        <Link to="/Syllabus.pdf" target="_blank">
          <button className={CourseInfoCSS.button}>Syllabus</button>
        </Link>
        <Link to={`/PCExamAnalysis/${courseId}`}>
          <button className={CourseInfoCSS.button}>Reports</button>
        </Link>
        <Link to={`/sendRecommendations/${courseId}/${course.data.course_name}`}>
          <button className={CourseInfoCSS.button}>Send Recommendation</button>
        </Link>
      </div>

      <div className={CourseInfoCSS.CourseInformation} style={{ height: '380px' }}>
        <p>
          <strong>Course Code:</strong> {course.data.course_code}
        </p>
        <p>
          <strong>Course Name:</strong> {course.data.course_name}
        </p>
        <p>
          <strong>Course Instructor:</strong> {course.data.instructor.name}
        </p>
        <p>
          <strong>Course Description:</strong> {course.data.course_description}
        </p>
        <p>
          <strong>Course Start Date:</strong> {course.data.course_start_date}
        </p>
        <p>
          <strong>Course End Date:</strong> {course.data.course_end_date}
        </p>

        <p>
          <strong>Students:</strong> {course.data.students.length}
        </p>
      </div>
    </div>
  );
};

export default CourseInfo;
