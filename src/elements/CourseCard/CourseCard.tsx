import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import './courseCard.scss';
import { CourseCardProps } from "../../types/CoursesTypes";

function CourseCard ({ courseData }: CourseCardProps) {
  const {
    id,
    title,
    shortDescription,
    duration,
    language,
    difficultyLevel
  } = courseData;
  const navigate = useNavigate();

  return (
    <Grid item key={2} xs={12} sm={6} md={4}>
      <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          classes={{
            root: `course-card ${difficultyLevel.toLowerCase()}`,
          }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography className="course-title" gutterBottom variant="h5">
            {title}
          </Typography>
          <Stack direction="row" spacing={1} mb={1}>
            <Chip label={`${duration} lessons`} size="small" color="success" />
            <Chip label={language.toLowerCase()} size="small" color="secondary" />
          </Stack>
          <Typography>
            {shortDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              navigate(`/courses/${id}`);
            }}
          >View course</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CourseCard;