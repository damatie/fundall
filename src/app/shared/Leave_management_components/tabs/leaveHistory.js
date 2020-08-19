import React, { useEffect, useState } from 'react';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const header = fetchHeaders();

const handleShowMore = (type, data) => {
  switch(type) {
    case 'half': {
      return data.slice(0, 3)
    }
    case 'all': {
      return data;
    }
  }
};

const LeaveHistory = ({id}) => {
  const [history, setHistory] = useState([
  {
    fromDate: '15/5/2020',
    toDate: '20/5/2020',
    days: 9
  },
  {
    fromDate: '15/6/2020',
    toDate: '20/6/2020',
    days: 10
  },
  {
    fromDate: '15/5/2020',
    toDate: '20/7/2020',
    days: 12
  },
  {
    fromDate: '15/6/2019',
    toDate: '20/8/2019',
    days: 18
  },
  {
    fromDate: '15/5/2019',
    toDate: '20/9/2019',
    days: 10
  },
  {
    fromDate: '15/6/2019',
    toDate: '20/10/2019',
    days: 19
  },
  {
    fromDate: '15/5/2018',
    toDate: '20/11/2018',
    days: 10
  },
  {
    fromDate: '15/6/2018',
    toDate: '20/12/2018',
    days: 15
  },
  ]);
  const [histories, setHistories] = useState([]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if(showAll) {
      setHistories(handleShowMore('all', history))
    } else {
      setHistories(handleShowMore('half', history))
    }
  }, [showAll]);

  return (
    <FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>

      <Card className="w-full mb-16">
        <AppBar position="static" elevation={0}>
          <Toolbar className="px-8">
            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
              Employee leave history
            </Typography>
            {/* <Button className="normal-case" color="inherit" size="small">
              See all
            </Button> */}
          </Toolbar>
        </AppBar>
        <CardContent className="p-0">
          <List className="p-0">
            {histories.map(group => (
              <ListItem key={group.id} className="px-8">
                <ListItemText
                  primary={
                    <>
                    <div className="flex my-16">
                      <Typography
                        className="font-bold"
                        color="primary"
                        paragraph={false}
                      >
                        From date
                      </Typography>

                      <Typography className="mx-4" paragraph={false}>
                        {group.fromDate}
                      </Typography>
                    </div>

                    <div className="flex my-16">
                      <Typography
                        className="font-bold"
                        color="primary"
                        paragraph={false}
                      >
                        To date
                      </Typography>

                      <Typography className="mx-4" paragraph={false}>
                        {group.toDate}
                      </Typography>
                    </div>
                    <div className="flex my-16">
                      <Typography
                        className="font-bold"
                        color="primary"
                        paragraph={false}
                      >
                        Days
                      </Typography>

                      <Typography className="mx-4" paragraph={false}>
                        {group.days}
                      </Typography>
                    </div>
                  </>
                  }
                  
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Button variant="text" color="default" onClick={e => setShowAll(!showAll)}>
            {showAll ? 'Show less' : 'Show All'}
          </Button>
        </CardActions>
      </Card>
    </FuseAnimateGroup>
  );
};

export default LeaveHistory;