import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PermissionList from './PermissionList';
import SubMenuList from './SubMenuList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {capitalizeWords} from '../../../shared/capitalizeWords';

const PermissionsContainer = ({
  state,
  role,
  data,
  value,
  index,
  setPayload,
  payload,
  handleSubmit
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        state.loadingPermission ? (
          <Skeleton variant="rect" width='60%' height="100%" animation="wave" />
        ) :
        data.mainMenu && data.mainMenu.map((item) => (
            // <section key={item.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`main_${item.id}`}
                >
                  <Typography variant="h6" className='font-semibold' color="initial"> {capitalizeWords(item.title)} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SubMenuList setPayload={setPayload} payload={payload} data={data} mainMenuId={item.id} role={role}/>
                </AccordionDetails>
              </Accordion>
              
          ))
      )}
      <Button disabled={state.loadingPermission || state.loadingRoles} variant="contained" color="primary" className='text-white my-8 mt-8' onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default PermissionsContainer;