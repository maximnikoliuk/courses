import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CourseCard from '../../elements/CourseCard/CourseCard';
import Typography from '@mui/material/Typography';
import FiltersSection from '../../elements/FiltersSection/FiltersSection';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { StateCourse } from '../../types/CoursesTypes';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { app } from '../../firebase/firebase';
import { setCourses } from '../../redux/sliceCourses';

function CoursesPage () {
  const dispatch = useAppDispatch();
  const { coursesList } = useAppSelector(
      (state) => state.courses,
  );
  const { filtersList } = useAppSelector(
      (state) => state.filters,
  );

  const filterCourses = (courses: StateCourse[]) => {
    return courses.filter(course => course.title.toLowerCase().includes(filtersList.title.toLocaleLowerCase()) &&
        (filtersList.level === 'ALL' || course.difficultyLevel === filtersList.level) &&
        (filtersList.language === 'ALL' || course.language === filtersList.language));
  };

  const getCourses = async () => {
    let courses: StateCourse[] = [];
    const db = getFirestore(app);
    const coursesCollection = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesCollection);
    coursesSnapshot.forEach(doc => {
      let course = doc.data() as StateCourse;
      courses.push(course);
    });
    // Each time we load all the courses to simulate normal request to DB and then
    // filter them on front end side. IT IS NOT A GOOD WAY but firestore queries are not flexible when we have few filters
    const filteredCourses = filterCourses(courses);
    dispatch(setCourses(filteredCourses));
  };

  useEffect(() => {
    // We get courses list from firestore each time when filter is changed
    getCourses();
  }, [filtersList]);

  return (
      <Container sx={{ pt: 10, pb: 8 }} maxWidth="md">
        <Typography gutterBottom variant="h3">
          Learn best with us
        </Typography>
        <FiltersSection />
        <Grid container spacing={4}>
          {
            coursesList.map((course: StateCourse) => (
                <CourseCard key={course.id} courseData={course} />
            ))
          }
        </Grid>
      </Container>
  )
}

export default CoursesPage;