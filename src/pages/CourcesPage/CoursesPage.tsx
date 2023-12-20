import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CourseCard from '../../elements/CourseCard/CourseCard';
import Typography from '@mui/material/Typography';
import { and, collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite';
import FiltersSection from '../../elements/FiltersSection/FiltersSection';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { StateCourse } from '../../types/CoursesTypes';
import { app } from '../../firebase/firebase';
import { setCourses } from '../../redux/sliceCourses';
import { COURSE_LEVELS } from '../../utils/constants';

function CoursesPage () {
  const dispatch = useAppDispatch();
  const { coursesList } = useAppSelector(
      (state) => state.courses,
  );
  const { filtersList } = useAppSelector(
      (state) => state.filters,
  );

  const getFiltersQueries = () => {
    const queries = [];
    if (filtersList.title) {
      queries.push(
          and(
              where("title", ">=", filtersList.title.toLowerCase()),
              where("title", "<=", `${filtersList.title.toLowerCase()}\uf8ff`)
          )
      );
    }
    if (filtersList.level !== COURSE_LEVELS.ALL) {
      queries.push(
          where("difficultyLevel", "==", filtersList.level)
      );
    }
    if (filtersList.language !== COURSE_LEVELS.ALL) {
      queries.push(
          where("language", "==", filtersList.language)
      );
    }
    return queries;
  };

  const getCourses = async () => {
    const queries = getFiltersQueries();
    let courses: StateCourse[] = [];
    const db = getFirestore(app);
    const coursesCollection = collection(db, 'courses');
    let coursesSnapshot;
    if (queries.length > 0) {
      const coursesQuery = query(coursesCollection, and(...queries));
      coursesSnapshot = await getDocs(coursesQuery)
    } else {
      coursesSnapshot = await getDocs(coursesCollection)
    }
    coursesSnapshot.forEach(doc => {
      let course = doc.data() as StateCourse;
      courses.push(course);
    });
    dispatch(setCourses(courses));
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