import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	section: {
		padding: '16px'
	},
	header: {
		fontWeight: 'bold'
	},
	title: {
		marginBottom: 8,
		fontWeight: 500
	}
}));

function SideNavBar(props) {
	const classes = useStyles();
	const [blogs, setBlogs] = React.useState([]);
	// const blogList = useSelector(state => state.blog.getBlogs.data);

	React.useEffect(() => {
		setBlogs([...props.blog]);
	}, [props.blog]);

	const blogSort = (data) => {
		if (data.length > 0) return data.sort((a, b) => {
			return (b.employees.length) - new Date(a.employees.length);
		});
	}

	const trendingBlogs = blogSort(blogs) && blogSort(blogs).map((blog, index) => {
		if (index < 3) return (
			<div key={index}>
				<div className={classes.section}>
					<Typography variant="body1" component="h3" className={classes.title} style={{ fontSize: 16 }}>
						{blog.title}
					</Typography>
					<Typography variant="body1" style={{ color: 'grey' }}>
						{blog.category !== null && blog.category.name}
					</Typography>
				</div>
				<Divider />
			</div>
		);
	});

	return (
		<>
			<Paper variant="outlined">
				<Typography variant="h6" component="h2" className={`${classes.header} ${classes.section}`}>
					Trending
				</Typography>
				<Divider />
				{trendingBlogs}
			</Paper>
			{/* <br></br>
			<br></br>
			<Paper variant="outlined">
				<Typography variant="h6" component="h2" className={`${classes.header} ${classes.section}`}>
					Trending
				</Typography>
				<Divider />
				{trendingBlogs}
			</Paper> */}
		</>
	);
}

export default SideNavBar;
