import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBtn from '../../../shared/progressBtn';
import AddCategory from '../blogCategories/addCategoryModal';
import Button from '@material-ui/core/Button';

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
		fontSize: 16,
		minWidth: '23%'
	},
	list: {
		paddingBottom: 32
	}
}));

function AddBlogPost(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const loading = useSelector(({ AddBlogPost }) => AddBlogPost.posts.loading);
	const categories = useSelector(({ AddBlogPost }) => AddBlogPost.categories.categories);
	const posts = useSelector(({ AddBlogPost }) => AddBlogPost.posts.data);
	const post = posts.postData;

	const postId = props.match.params.post_id;
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [images, setImages] = useState([]);
	const [names, setNames] = useState('');
	const [canSubmit, setCanSubmit] = useState(false);
	const [category, setCategory] = useState('');
	const [categoryId, setCategoryId] = useState(null);

	// console.log(props);
	useEffect(() => {
		dispatch(Actions.getCategories());
		if (postId) {
			dispatch(Actions.getPostById(postId));
		}
	}, [dispatch]);

	useEffect(() => {
		if (postId && !post === false) {
			setTitle(post ? post.title : '');
			setBody(post ? post.body : '');
			setNames(post.images.length > 0 ? post.images[0].url : '');
			setCategory(post.category ? post.category.name : '');
			setCategoryId(post.categoryId ? post.categoryId : '');
			setCanSubmit(true);
		}
	}, [post]);

	console.log(post);

	useEffect(() => {
		validForm();
	}, [title, body, category]);

	const validForm = () => {
		if (title !== '' && body !== '' && category !== '') {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	};

	const handleChange = event => {
		const currentCategory = categories.find(category => category.name === event.target.value);
		setCategoryId(currentCategory.id);
		setCategory(currentCategory.name);
	};

	const imageChange = event => {
		const nameArray = Object.values(event.target.files);
		nameArray.forEach((item, i, array) => {
			if (array.length <= 1) setNames(`${item.name}`);
			else setNames(`${array.length} files`);
		});
		setImages(event.target.files);
	};

	// function srcToFile(src, fileName, mimeType) {
	// 	return fetch(src)
	// 		.then(function (res) {
	// 			return res.arrayBuffer();
	// 		})
	// 		.then(function (buf) {
	// 			return new File([buf], fileName, { type: mimeType });
	// 	});
	// }

	// src = file url, mimeType = image/jpg or image/png, fileName= thankgod;

	const handleSubmit = () => {
		let formData = new FormData();
		console.log(images);
		formData.append('title', title);
		formData.append('body', body);
		formData.append('categoryId', categoryId);
		for (let i = 0; i < images.length; i++) {
			formData.append('images', images[i]);
		}
		if (postId) {
			dispatch(Actions.updatePost(formData, postId));
		} else {
			dispatch(Actions.createPost(formData));
		}
	};

	const postCategories = categories.map(category => {
		return <FormControlLabel value={category.name} key={category.id} control={<Radio />} label={category.name} />;
	});

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12} sm={3} className={classes.addPostBtn}>
				<ProgressBtn
					onClick={handleSubmit}
					loading={loading}
					disable={!canSubmit}
					content={postId ? 'Edit Blog Post' : 'Add new blog post'}
				/>
			</Grid>
			<Grid item container spacing={3}>
				<Grid item xs={12} sm={8}>
					<Paper variant="outlined" elevation={3}>
						<input
							placeholder="Blog title"
							className={classes.blogTitle}
							value={title}
							onChange={event => setTitle(event.target.value)}
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
						<label htmlFor="contained-button-file" style={{ display: 'flex' }}>
							<Button color="primary" component="span" className={classes.upload}>
								Upload image
							</Button>
							<Typography variant="body1" component="span" style={{ padding: '12px 0 0 12px' }}>
								{!names === true ? 'No image choosen' : names}
							</Typography>
						</label>
					</Paper>
					<Paper variant="outlined" elevation={3}>
						<textarea
							placeholder="Blog content"
							className={classes.blogContent}
							onChange={event => setBody(event.target.value)}
							rows={5}
							value={body}
							style={{ resize: 'none' }}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper variant="outlined" elevation={3} style={{ position: 'relative' }}>
						<Typography variant="subtitle2" align="center" style={{ padding: 16 }}>
							Select Category
						</Typography>
						<Divider />
						<FormControl component="fieldset" style={{ padding: 16 }}>
							<FormLabel component="legend" style={{ padding: '16px 0 0' }}>
								Category
							</FormLabel>
							<RadioGroup aria-label="category" value={category} onChange={handleChange}>
								{postCategories}
							</RadioGroup>
						</FormControl>
						<div style={{ paddingTop: 20 }}></div>
						<AddCategory />
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default withReducer('AddBlogPost', reducer)(AddBlogPost);
