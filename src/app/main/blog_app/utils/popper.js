// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Popper from '@material-ui/core/Popper';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     border: '1px solid',
//     padding: theme.spacing(1),
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function SimplePopper() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

  

//   const handleClick = (event) => {
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popper' : undefined;

//   return (
//     <div>
//       <button aria-describedby={id} type="button" onClick={handleClick}>
//         Toggle Popper
//       </button>
//       <Popper id={id} open={open} anchorEl={anchorEl}>
//         <div className={classes.paper}>The content of the Popper.</div>
//       </Popper>
//     </div>
//   );
// }



// // import React from 'react';
// // import { makeStyles } from '@material-ui/core/styles';
// // import Modal from '@material-ui/core/Modal';
// // import { useSelector } from 'react-redux';

// // function rand() {
// //   return Math.round(Math.random() * 20) - 10;
// // }

// // function getModalStyle() {
// //   const top = 50 + rand();
// //   const left = 50 + rand();

// //   return {
// //     top: `${top}%`,
// //     left: `${left}%`,
// //     transform: `translate(-${top}%, -${left}%)`,
// //   };
// // }

// // const useStyles = makeStyles((theme) => ({
// //   paper: {
// //     position: 'absolute',
// //     width: 400,
// //     backgroundColor: theme.palette.background.paper,
// //     border: '2px solid #000',
// //     boxShadow: theme.shadows[5],
// //     padding: theme.spacing(2, 4, 3),
// //   },
// // }));

// // export default function SimpleModal() {
// //   const classes = useStyles();
// //   const [modalStyle] = React.useState(getModalStyle);
// //   const [open, setOpen] = React.useState(false);

// //   const handleOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   const body = (
// //     <div style={modalStyle} className={classes.paper}>
// //       <h2 id="simple-modal-title">Text in a modal</h2>
// //       <p id="simple-modal-description">
// //         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
// //       </p>
// //     </div>
// //   );

// //   return (
// //     <div>
// //       <Modal
// //         open={open}
// //         onClose={handleClose}
// //         aria-labelledby="simple-modal-title"
// //         aria-describedby="simple-modal-description"
// //       >
// //         {body}
// //       </Modal>
// //     </div>
// //   );
// // }
