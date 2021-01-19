import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

function RecruitmentHeader(props) {
  const theme = useTheme();

  const checkRoute = () => {
    if (props.positionId) {
      return `/recruitment/position_details/${props.positionId}`;
    }
    return '/recruitment/dashboard';
  }

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full">
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Typography
            className="normal-case flex items-center sm:mb-12"
            color="inherit"
          >
            <Icon
              className="text-20 text-black bg-white rounded-20"
              component={Link}
              to={checkRoute()}
              role="button"
            >
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className="mx-4 text-20 ml-16">{props.heading}</span>
          </Typography>
        </FuseAnimate>
      </div>
    </div>
  )
}

export default RecruitmentHeader;
