import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoanHistory from './loanHistory';
import { TextField } from '@material-ui/core';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { useParams } from 'react-router';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import moment from 'moment'

const headers = fetchHeaders();
function LoanStatementTab() {
  const [statements, setStatements] = useState([]);
  const { id } = useParams();
  const loan = useSelector(({ loan }) => loan.loan.data);

  useEffect(() => {
    if(loan.loanData) {
      setStatements(loan.loanData.loanStatements);
    }
    
  }, [loan])
	return (
		<div className="md:flex">
			<div className="flex w-full">
          {statements.map(item => (
            <FuseAnimateGroup
            enter={{
              animation: 'transition.slideUpBigIn'
            }}
            >
            	<Card className="w-full mb-16" key={item.id}>
                <AppBar position="static" elevation={0}>
                  <Toolbar className="px-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                      Date
                    </Typography>
                    <Typography className="font-bold m-4 text-15">
                      {moment(item.createdAt).format('LLL')}
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography 
                    className="font-bold mb-4 text-15">Amount paid</Typography>
                    <Typography>{Intl.NumberFormat().format(item.amountPaid)}</Typography>
                  </div>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Balance</Typography>
                    <Typography>{Intl.NumberFormat().format(item.balance)}</Typography>
                  </div>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          ))}
			</div>

		  {/* <div className="flex flex-col md:w-320">
				<LoanHistory />
			</div>  */}
		</div>
	);
}

export default React.memo(LoanStatementTab);
