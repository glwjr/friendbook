import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Posts() {
  const { posts } = useSelector((state) => state);

  return (
    <Grid
      container
      spacing={4}
      margin={4}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      { posts.map((post) => (
        <Grid key={post.id} xs={8}>
          <Card>
            <CardHeader
              avatar={(
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="avatar">
                  R
                </Avatar>
              )}
              action={(
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              )}
              title={post.user.username}
              subheader={post.createdAt}
            />
            <CardMedia
              component="img"
              height="194"
              image={post.imageUrl ? post.imageUrl : ''}
              alt="post image"
            />
            <CardContent>
              <Typography variant="body2" color="text.primary">
                {post.post}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
