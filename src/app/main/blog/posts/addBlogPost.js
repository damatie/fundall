import React, { useState, useEffect } from 'react';
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
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBtn from '../../../shared/progressBtn';
import AddCategory from '../blogCategories/addCategoryModal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4),
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(2)
		}
	},
	addPostBtn: {
		margin: '0 0 24px 0'
	},
	blogTitle: {
		minHeight: 56,
		fontSize: 24,
		width: '100%',
		padding: 16
	},
	blogContent: {
		minHeight: 300,
		fontSize: 16,
		padding: 16,
		minWidth: '100%'
	},
	tagInput: {
		maxWidth: '100%'
	},
	input: {
		display: 'none'
	},
	upload: {
		justifyContent: 'flex-start',
		textTransform: 'none',
		paddingLeft: 16,
		color: 'rgba(0,0,0,.25)',
		fontWeight: 'bold',
		fontSize: 16
	},
	list: {
		paddingBottom: 32,
	},
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AddBlogPost(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
    const loading = useSelector(({ AddBlogPost }) => AddBlogPost.posts.loading);
    const categories = useSelector(({AddBlogPost}) => AddBlogPost.categories.categories);
    const posts = useSelector(({AddBlogPost}) => AddBlogPost.posts.data);
    const post = posts.postData;

    const postId = props.match.params.post_id;
	const [checked, setChecked] = useState([0]);
    const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [images, setImages] = useState({});
	const [tags, setTags] = useState([]);
    const [names, setNames] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);
    const [category, setCategory] = useState(0);

    // console.log(props);
    useEffect(() => {
        dispatch(Actions.getCategories());
        if(postId){
            dispatch(Actions.getPostById(postId));
        }
    }, [dispatch])
    
    useEffect(() => {
        if(postId){
            setTitle((post) ? post.title : '');
            setBody((post) ? post.body : '');
            setCategory((post) ? post.categoryId : 0);
            setCanSubmit(true);
        }
    }, [post])

    const validForm = () => {
        if(title !== '' && body !== '' && category !== 0){
            setCanSubmit(true);
        }else{
            setCanSubmit(false);
        }
    }

	const handleToggle = value => () => {
        setCategory(value);
        validForm();
    };
    

	function imageChange(event) {
		setNames(event.target.files[0].name);
		setImages({ images: event.target.files[0] });
	}

	const handleSubmit = () => {
		let formData = new FormData();
		console.log(category);
		formData.append('title', title);
		formData.append('body', body);
		formData.append('images', images.file);
		formData.append('categoryId', category);
		// formData.append('tags', tags);
		// for (let i = 0; i < images.length; i++) {
		//   formData.append('images', images[i]);
        // }
        if(postId){
            dispatch(Actions.updatePost(formData, postId));
        }else{
            dispatch(Actions.createPost(formData));
        }
	};

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12} sm={3} className={classes.addPostBtn}>
				<ProgressBtn onClick={handleSubmit} loading={loading} disable={!canSubmit} content={(postId) ? "Edit Blog Post" :"Add new blog post"} />
			</Grid>
			<Grid item container spacing={3}>
				<Grid item xs={12} sm={8}>
					<Paper variant="outlined" elevation={3}>
						<input
							placeholder="Blog title"
                            className={classes.blogTitle}
                            value={title}
							onChange={event => {setTitle(event.target.value); validForm();}}
						/>
					</Paper>
					<Paper variant="outlined" elevation={3}>
						<input
							accept="image/*"
							className={classes.input}
							id="contained-button-file"
							onChange={imageChange}
							type="file"
						/>
						<label htmlFor="contained-button-file">
							<Button color="primary" component="span" className={classes.upload}>
								Upload image
							</Button>
							<Typography variant="body1" component="span" style={{ margin: '4px 0 0 12px' }}>
								{images.length === 0 ? 'No image choosen' : names}
							</Typography>
						</label>
					</Paper>
					<Paper variant="outlined" elevation={3}>
						<textarea
							placeholder="Blog content"
							className={classes.blogContent}
							onChange={event => {setBody(event.target.value); validForm();}}
                            rows={5}
                            value={body}
							style={{ resize: 'none' }}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper variant="outlined" elevation={3}>
						<Typography variant="subtitle2" align="center" style={{ padding: 16 }}>
							Post settings
						</Typography>
						<Divider />
						<Typography variant="body1" component="h3" style={{ padding: '16px 16px 8px 16px', color: 'grey' }}>
							Categories
						</Typography>
						<List style={{ padding: 0 }}>
							{categories.map(category => {
								const labelId = `category-label-${category.name}`;
								return (
									<ListItem
										style={{ padding: '0 16px' }}
										key={category.id}
										// role={undefined}
										dense
										button
										onClick={handleToggle(category.id)}
									>
										<ListItemIcon>
											<Checkbox
												edge="start"
												// checked={category === category.id}
                        tabIndex={-1}
                        value={category}
												disableRipple
                        onChange={validForm}
                        inputProps={{ 'aria-labelledby': labelId }}
											/>
										</ListItemIcon>
										<ListItemText id={labelId} primary={category.name} />
									</ListItem>
								);
							})}
              <div style={{padding: '16px'}}></div>
							<AddCategory />
						</List>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}

const tagList = [
	{ title: 'sport', year: 1994 },
	{ title: 'Education', year: 1972 },
	{ title: 'Javascript', year: 1974 },
	{ title: 'Sales', year: 2008 },
	{ title: 'Jobs', year: 1957 },
	{ title: 'Some random tag', year: 1993 }
];

export default withReducer('AddBlogPost', reducer)(AddBlogPost);
