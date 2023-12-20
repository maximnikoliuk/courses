import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite';
import CommentsSection from '../../elements/CommentsSection/CommentsSection';
import { app } from '../../firebase/firebase';
import { StateCourse } from '../../types/CoursesTypes';
import './cource.scss';

function Course () {
  const { id } = useParams();
  const [fullCourse, setFullCourse] = useState({
    id: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    duration: 0,
    language: '',
    difficultyLevel: ''
  });

  const getFullCourseData = async () => {
    const db = getFirestore(app);
    const coursesCollection = collection(db, 'courses');
    const courseQuery = query(coursesCollection, where("id", '==', id));
    const coursesSnapshot = await getDocs(courseQuery);
    coursesSnapshot.forEach(doc => {
      let course = doc.data() as StateCourse;
      setFullCourse(course);
    });
  };

  useEffect(() => {
    getFullCourseData();
  }, []);

  return (
      <Container sx={{ pt: 10, pb: 8 }} maxWidth="md">
        <Typography gutterBottom variant="h3" className="course-title">
          {fullCourse.title}
        </Typography>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip label={`${fullCourse.duration} lessons`} size="small" color="success" />
          <Chip label={`${fullCourse.language.toLowerCase()}`} size="small" color="secondary" />
        </Stack>
        <Typography>
          {fullCourse.fullDescription}
        </Typography>
        <CommentsSection />
      </Container>
  )
}

export default Course;