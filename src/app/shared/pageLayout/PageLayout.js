import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Paper from '@material-ui/core/Paper';

const PageLayout = ({
  contentToolbar,
	content,
	noSearch,
  header: {
    icon,
    title,
    handleSearch,
  },
  button: {
    showButton,
    btnTitle,
    onClick,
  }
}) => {

  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  return (
    <FusePageSimple
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between px-24">
					<div className="flex flex-col items-start max-w-full">
						<div className="flex items-center">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-32">{icon}</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									{title}
								</Typography>
							</FuseAnimate>
						</div>
					</div>

					<div className="flex flex-1 items-center justify-center px-12">
						{!noSearch && <ThemeProvider theme={mainTheme}>
							<FuseAnimate animation="transition.slideDownIn" delay={300}>
								<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
									<Icon color="action">search</Icon>
									<Input
										placeholder="Search"
										className="flex flex-1 mx-8"
										disableUnderline
										fullWidth
										// value={search}
										inputProps={{
											'aria-label': 'Search'
										}}
										onChange={handleSearch}
									/>
								</Paper>
							</FuseAnimate>
						</ThemeProvider>}
					</div>

          {showButton && <div className="flex items-center max-w-full">
            <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Button
                  // className="mb-16"
                  variant="contained"
                  color="secondary"
                  disableElevation
                  onClick={onClick}
                >
                  {btnTitle}
                </Button>
              </FuseAnimate>
            </div>
          </div>}
				</div>
			}
			contentToolbar={contentToolbar}
			content={content}
			innerScroll
		/>
  );
};

export default PageLayout;