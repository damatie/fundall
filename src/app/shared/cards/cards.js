import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default function Cards({children,className}) {

  return (
    <Card className={`${className} bg-white shadow-md rounded-20 p-10`}>
      <CardContent>
      {children}
      </CardContent>
    </Card>
  );
}
