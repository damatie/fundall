import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'

const BasicCard = ({children, title, button}) => {
  return (
    <Card className="w-full mb-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="px-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
            {title}
					</Typography>
          <section>
            {button}
          </section>
        </Toolbar>
      </AppBar>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default BasicCard;