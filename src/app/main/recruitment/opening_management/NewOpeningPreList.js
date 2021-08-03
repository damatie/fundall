import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import SharedButton from 'app/shared/button/SharedButton';
import EditIcon from '@material-ui/icons/BorderColor';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    margin: theme.spacing(3),
  },
  contentItem: {
    marginBottom: theme.spacing(2),
  },
  headerText: {
    marginBottom: theme.spacing(1),
    color: '#6F6F6F',
    fontSize: 12,
  },
  bodyText: {
    marginTop: theme.spacing(1),
    color: '#000000',
    fontSize: 15,
  },
  pullRight: {
    position: 'right'
  }
}));

const NewOpeningPreList = ({customHook}) => {
  const classes = useStyles();
  const { contentList, handleEditList} = customHook;
  // console.log(contentList);
  return (
      <section className={classes.contentItem}>
      {  contentList.length > 0 && contentList.sort((a, b)=> (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).map( (content) => {
            return (
                <Card className={classes.card} key={content.id}  elevation={5}>
                    <CardContent className={classes.cardContent}>
                    <Grid container justifyContent="space-between">
                    <Grid item >
                        <div className={classes.contentItem}>
                        <Typography variant="subtitle1" className={classes.headerText}>KPO Category</Typography>
                        <Typography variant="body1" className={classes.bodyText}>{content?.category}</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <SharedButton
                            variant='contained'
                            color='default'
                            type='button'
                            startIcon={<EditIcon/>}
                            size="small" 
                            onClick={(ev) => handleEditList(content.id)}
                        >
                            EDIT
                        </SharedButton>
                    </Grid>
                    </Grid>
                    <div className={classes.contentItem}>
                        <Typography variant="subtitle1" className={classes.headerText}>Description</Typography>
                        <Typography variant="body1" className={classes.bodyText}>{content?.kpoDescription}</Typography>
                    </div>
                    <div className={classes.contentItem}>
                        <Typography variant="subtitle1" className={classes.headerText}>Target</Typography>
                        <Typography variant="body1" className={classes.bodyText}>{content?.target}</Typography>
                    </div>
                    <div className={classes.contentItem}>
                        <Typography variant="subtitle1" className={classes.headerText}>PIP Target</Typography>
                        <Typography variant="body1" className={classes.bodyText}>{''+content?.kpoPipTarget}</Typography>
                    </div>
                    </CardContent>
                </Card>
            )
        })}
      </section>
  );
};

export default NewOpeningPreList;