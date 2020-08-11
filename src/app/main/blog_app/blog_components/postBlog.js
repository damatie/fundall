import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import * as blogActions from '../store/actions';
import { useDispatch } from 'react-redux';
import ProgressBtn from '../../../shared/progressBtn'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
  },
  addPostBtn: {
    margin: '0 0 24px 0',
  },
  blogTitle: {
    minHeight: 56,
    fontSize: 24,
    width: '100%',
    padding: 16,
  },
  blogContent: {
    minHeight: 500,
    fontSize: 16,
    padding: 16,
    minWidth: '100%',
  },
  tagInput: {
    maxWidth: '100%'
  },
  input: {
    display: 'none',
  },
  upload: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    paddingLeft: 16,
    color: 'rgba(0,0,0,.25)',
    fontWeight: 'bold',
    fontSize: 16,
  }
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function PostBlog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [checked, setChecked] = useState([0]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [names, setNames] = useState('');

  const setImage = (event) => {
    const nameArray = Object.values(event.target.files);
    nameArray.forEach((item, index, array) => {
      if (array.length <= 1) setNames(`${item.name}`);
      else setNames(`${array.length} files`);
    })
    setImages(event.target.files);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('categories', checked);
    formData.append('tags', tags);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    dispatch(blogActions.submitBlogPost(formData, history));
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={3} className={classes.addPostBtn}>
        <ProgressBtn onClick={handleSubmit} content="Add new blog post" />
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper variant="outlined" elevation={3}>
            <input
              placeholder='Blog title'
              className={classes.blogTitle}
              onChange={event => setTitle(event.target.value)}
            />
          </Paper>
          <Paper variant="outlined" elevation={3}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              onChange={event => setImage(event)}
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button color="primary" component="span" className={classes.upload}>
                Uplaod image(s)
              </Button>
              <Typography variant="body1" component='span' style={{margin: '4px 0 0 12px'}}>
                {images.length === 0 ? 'No image choosen' : names}
              </Typography>
            </label>
          </Paper>
          <Paper variant="outlined" elevation={3}>
            <textarea
              placeholder='Blog content'
              className={classes.blogContent}
              onChange={event => setBody(event.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" elevation={3}>
            <Typography variant='subtitle2' align='center' style={{padding: 16}}>
              Post sittings
            </Typography>
            <Divider />
            <Typography variant='caption' component="h3" style={{padding: '16px 16px 0 16px'}}>
              Categories
            </Typography>
            <List style={{padding: 0}}>
              {['Social', 'Business', 'Random'].map((value) => {
                const labelId = `category-label-${value}`;
                return (
                  <ListItem style={{padding: '0 16px'}} key={value} role={undefined} dense button onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                  </ListItem>
                );
              })}
            </List>
            <Typography variant='caption' component="h3" style={{padding: '16px 16px 0 16px'}}>
              Tags
            </Typography>
            <Autocomplete
              className={classes.tagInput}
              multiple
              id="checkboxes-tags-demo"
              options={tagList}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </React.Fragment>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select tags"
                />
              )}
            />
            {tags}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

const tagList = [
  { title: 'sport', year: 1994 },
  { title: 'Education', year: 1972 },
  { title: 'Javascript', year: 1974 },
  { title: 'Sales', year: 2008 },
  { title: 'Jobs', year: 1957 },
  { title: "Some random tag", year: 1993 },
];

export default PostBlog;
