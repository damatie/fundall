import React from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    readMore: {
        color: "#007f8c"
    },
    readLess: {
        color: "#007f8c"
    }
}));

const ReadLess = ({text, size}) => {
    const classes = useStyles();
  return (
      <ReactReadMoreReadLess
        charLimit={size}
        readMoreText={"Read more >>"}
        readLessText={"Read less <<"}
        readMoreClassName={classes.readMore}
        readLessClassName={classes.readLess}
      >
        {text || ''}
      </ReactReadMoreReadLess>
  );
}

export default ReadLess;
