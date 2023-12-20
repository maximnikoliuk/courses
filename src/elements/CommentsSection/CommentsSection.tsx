import React, {useState, useEffect, useContext} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore/lite";
import { app } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import { Comment } from '../../types/CoursesTypes';
import { firestoreAutoId } from '../../utils/firebase';
import './commentsSection.scss';
import { AuthContext } from "../../context/AuthContext";

function CommentsSection() {
  const { id } = useParams();
  const context = useContext(AuthContext);
  const { user } = context;
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [newComment, setNewComment] = useState('');

  const getComments = async () => {
    let allComments: Comment[] = [];
    const db = getFirestore(app);
    const commentsCollection = collection(db, 'comments');
    const commentsQuery = query(commentsCollection, where("courseId", '==', id));
    const commentsSnapshot = await getDocs(commentsQuery);
    commentsSnapshot.forEach(doc => {
      let comment = doc.data() as Comment;
      allComments.push(comment);
    });
    setComments(allComments);
  };

  const addComment = async () => {
    const newId = firestoreAutoId();
    const db = getFirestore(app);
    await setDoc(doc(db, "comments", newId), {
      author: user?.displayName || user?.email,
      comment: newComment,
      courseId: id
    });
    setNewComment('');
    getComments();
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Container disableGutters sx={{pt: 4}}>
      <Typography gutterBottom variant="h4">
        Comments
      </Typography>
      <List sx={{ width: '100%' }} className='comments-list'>
        {
          comments.map(comment => <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                  primary={comment.author}
                  secondary={
                    <React.Fragment>
                      <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                      >
                        to All
                      </Typography>
                      {` — ${comment.comment}`}
                    </React.Fragment>
                  }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>)
        }
      </List>
      {
        user ? <>
          <TextField
              variant='outlined'
              label='Comment'
              placeholder='Leave your comment...'
              multiline
              minRows={3}
              maxRows={3}
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
          />
          <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              mt={2}
          >
            <Button disabled={!newComment} variant="contained" size="small" onClick={() => addComment()}>Send</Button>
          </Stack>
        </> : <Typography gutterBottom variant="h6">
          Only authorized users can leave comments
        </Typography>
      }
    </Container>
  );
}

export default CommentsSection;