import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import _ from '@lodash/index';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BlogListContent from './posts/blogListContent';
import SideNavBar from './posts/sideNav';
import { animateScroll as scroll } from "react-scroll";
import { useAuth } from 'app/hooks/useAuth';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '16px',
		padding: theme.spacing(3),
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	aSide: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		},
		marginTop: 40
	},
	pagination: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '32px'
	},
	header: {
		flexGrow: 1,
		display: 'flex'
	},
	title: {
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	search: {
		height: '44px',
		width: '300px',
		padding: '16px 8px',
		marginLeft: '16px'
	}
}));

function MainBlog() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const userData = useAuth().getUserData;

	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const posts = useSelector(({ MainBlog }) => MainBlog.posts.data);
	const totalNo = useSelector(({ MainBlog }) => MainBlog.posts.totalNo);
	const [tabValue, setTabValue] = useState(0);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [data, setData] = useState(posts);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	console.log(data);
	const blogPost = data.length > 0
		? data.map(blog => {
				return blog.post;
		  })
		: Array.from(posts).map(blog => {
				return blog.post;
		  });
	const blogAuthor = data
		? Array.from(data).map(blog => {
				return blog.author;
		  })
		: Array.from(posts).map(blog => {
				return blog.author;
		  });

	useEffect(() => {
		dispatch(Actions.getPosts(rowsPerPage, 0));
	}, [dispatch]);

	useEffect(() => {
		if (search.length >= 2) {
			setData(_.filter(posts, row => row.post.title.toLowerCase().includes(search.toLowerCase())));
			setPage(0);
		} else {
			setData(posts);
		}
	}, [posts, search]);

	function handleSearch(event) {
		setSearch(event.target.value);
	}

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleClickOpen() {
		window.location = '/main/blog/post';
	}

	const handleChangePage = (event, value) => {
		console.log(value);
		let newPage = value-1;
		dispatch(Actions.getPosts(rowsPerPage, newPage*rowsPerPage));
		scroll.scrollToTop();
		setPage(value);
	};

	const week = blogPost.filter(blog => {
		const weekAgo = new Date();
		weekAgo.setDate(weekAgo.getDate() - 7);
		return new Date(blog.createdAt) >= weekAgo;
	});

	const month = blogPost.filter(blog => {
		const monthAgo = new Date();
		monthAgo.setDate(monthAgo.getDate() - 30);
		return new Date(blog.createdAt) >= monthAgo;
	});

	const year = blogPost.filter(blog => {
		const yearAgo = new Date();
		yearAgo.setDate(yearAgo.getDate() - 365);
		return new Date(blog.createdAt) >= yearAgo;
	});

	const NoPost = () => {
		return (
			<>
				<h1>No Post to view here</h1>
			</>
		);
	};

	function checkRole() {
		return (userData.role.toUpperCase() === 'HR');
	}

	return (
		<ThemeProvider theme={mainTheme}>
			<FusePageSimple
				classes={{
					root: 'bg-red',
					header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					rightSidebar: 'w-320',
					toolbar: 'min-h-48 h-48',
					content: classes.content
				}}
				header={
					<ThemeProvider theme={mainTheme}>
						<div className="flex flex-col flex-1 p-8 pt-24 sm:p-12 relative">
							<div className="flex items-center w-full pl-20">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<Icon className="text-32">list</Icon>
								</FuseAnimate>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<span className="text-24 mx-16">Blog List</span>
								</FuseAnimate>
								<div className="flex flex-1 items-center justify-center px-12">
									<FuseAnimate animation="transition.slideDownIn" delay={300}>
										<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
											<Icon color="action">search</Icon>

											<Input
												placeholder="Search"
												className="flex flex-1 mx-8"
												disableUnderline
												fullWidth
												value={search}
												inputProps={{
													'aria-label': 'Search'
												}}
												onChange={ev => handleSearch(ev)}
											/>
										</Paper>
									</FuseAnimate>
								</div>
							</div>
							{ checkRole() && 
							(<div className="flex flex-1 items-end">
								<FuseAnimate animation="transition.expandIn" delay={600}>
									<Fab
										color="secondary"
										aria-label="add"
										className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
										onClick={handleClickOpen}
									>
										<Icon>add</Icon>
									</Fab>
								</FuseAnimate>
							</div>)
							}
						</div>
					</ThemeProvider>
				}
				content={
					<div className="card">
						<Grid container className={classes.root} spacing={2}>
							<Grid item xs={12} sm={8}>
								<div className={classes.root}>
									<Tabs
										value={tabValue}
										onChange={handleChangeTab}
										indicatorColor="primary"
										textColor="primary"
										variant="scrollable"
										classes={classes.tabs}
										scrollButtons="auto"
										classes={{ root: 'w-250 h-16' }}
									>
										<Tab className="h-16 normal-case" style={{ minWidth: 64 }} label="Feed" />
										<Tab className="h-16 normal-case" style={{ minWidth: 64 }} label="Week" />
										<Tab className="h-16 normal-case" style={{ minWidth: 64 }} label="Month" />
										<Tab className="h-16 normal-case" style={{ minWidth: 64 }} label="Year" />
										<Tab className="h-16 normal-case" style={{ minWidth: 64 }} label="Latest" />
									</Tabs>
								</div>
								{
									<div className={classes.content}>
										{tabValue === 0 &&
											(blogPost.length <= 0 ? (
												<h1>Loading...</h1>
											) : (
												blogPost.map((blog, i) => (
													<BlogListContent blog={blog} author={blogAuthor[i]} key={i} />
												))
											))}
										{tabValue === 1 &&
											(week.length === 0 ? (
												<NoPost />
											) : (
												week.map((blog, i) => (
													<BlogListContent blog={blog} author={blogAuthor[i]} key={i} />
												))
											))}
										{tabValue === 2 &&
											(month.length === 0 ? (
												<NoPost />
											) : (
												month.map((blog, i) => (
													<BlogListContent blog={blog} author={blogAuthor[i]} key={i} />
												))
											))}
										{tabValue === 3 &&
											(year.length === 0 ? (
												<NoPost />
											) : (
												year.map((blog, i) => (
													<BlogListContent blog={blog} author={blogAuthor[i]} key={i} />
												))
											))}
										{tabValue === 4 &&
											(blogPost.length <= 0 ? (
												<h1>Loading...</h1>
											) : (
												blogPost.map((blog, i) => (
													<BlogListContent blog={blog} author={blogAuthor[i]} key={i} />
												))
											))}
									</div>
								}
							</Grid>
							<Grid item xs={12} sm={4} className={classes.aSide}>
								<SideNavBar blog={blogPost} />
							</Grid>
						</Grid>
						<div className={classes.pagination}>
							<Pagination count={Math.round(totalNo/rowsPerPage)} page={page} onChange={handleChangePage} color="primary" />
						</div>
					</div>
				}
			/>
		</ThemeProvider>
	);
}

export default withReducer('MainBlog', reducer)(MainBlog);
