import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabPanels from './tabPanel';
import Cards from '../cards/cards';



export default function TabsContainer({content, children, index, ...other}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=" w-10/12 mx-auto">
      <AppBar position="static" className="bg-transparent text-black shadow-none">
        <Tabs value={value} onChange={handleChange}  className="capitalize" aria-label="simple tabs example">
          {content?.map((label,i)=>(
              <Tab label={label.title} value={i} key={i}   className="capitalize text-base"/>
            ))}
        </Tabs>
      </AppBar>
      {content.map((body,i)=>(
        <>
          <TabPanels value={value} index={i} key ={i} text={body.body} Comp={body.ComponentName} />
        </>
      ))}
    </div>
  );
}
