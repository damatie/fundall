import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

function RecruitmentHeader(props) {
  const theme = useTheme();

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full">
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to={`/recruitment/position_details/${props.positionId}`}
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className="mx-4">Recruitment</span>
          </Typography>
        </FuseAnimate>
      </div>
      <div className="flex items-center max-w-full">
        <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography className="text-16 sm:text-20 truncate">
              {props.heading}
            </Typography>
          </FuseAnimate>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography variant="caption">Employee Detail</Typography>
          </FuseAnimate>
        </div>
      </div>
    </div>
  )
}

export default RecruitmentHeader;
