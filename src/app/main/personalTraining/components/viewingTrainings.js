import { AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const ViewTrainings = ({ open, handleClose, data, viewer }) => {

    const handleApprove = () => {
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <AppBar position="static">
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {data.trainingName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form noValidate>
                <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        disabled
                        value={data.employeeName}
                        variant="outlined"
                        label="Employee"
                        className="w-full mb-24"
                    />
                    {
                        (viewer && viewer.toLowerCase() !== "employee" && data.employeeID)
                            ?
                            <TextField
                                id="outlined-secondary"
                                type="text"
                                disabled
                                value={data.employeeID}
                                variant="outlined"
                                label="Employee"
                                className="w-full mb-24"
                            />
                            :
                            <></>
                    }

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        disabled
                        defaultValue={data.employeeMail}
                        variant="outlined"
                        label="Employee Mail"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        disabled
                        value={data.category}
                        variant="outlined"
                        label="Category"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        disabled
                        value={data.startDate}
                        variant="outlined"
                        label="Start Date"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        disabled
                        value={data.endDate}
                        variant="outlined"
                        label="End Date"
                        className="w-full mb-24"
                    />

                    {
                        viewer && viewer.toLowerCase() === "hr" ? // must be an hr to view
                            <>
                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    disabled
                                    value={viewer.department.departmentName}
                                    variant="outlined"
                                    label="Department"
                                    className="w-full mb-24"
                                />

                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    disabled
                                    value={viewer.entity.entityName}
                                    variant="outlined"
                                    label="Entity"
                                    className="w-full mb-24"
                                />

                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    disabled
                                    value={viewer?.country ?? "Nigeria"}
                                    variant="outlined"
                                    label="Country"
                                    className="w-full mb-24"
                                />

                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    disabled
                                    value={viewer?.info.industrySenority}
                                    variant="outlined"
                                    label="Industry Senority"
                                    className="w-full mb-24"
                                />

                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    disbaled
                                    value={data.info.SRGSeniority}
                                    variant="outlined"
                                    label="Company Senority"
                                    className="w-full mb-24"
                                />

                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    disabled
                                    value={viewer.state}
                                    variant="outlined"
                                    label="State"
                                    className="w-full mb-24"
                                />

                            </>
                            : <></>
                    }

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        disabled
                        value={data.certification}
                        variant="outlined"
                        label="Certification"
                        className="w-full mb-24"
                    />

                </DialogContent>
                {
                    data.status !== "pending" &&
                    <DialogActions className="justify-between m-10 px-24 pb-12 sm:px-16">
                        <Button variant="contained" color="primary" onClick={handleApprove}>
                            Approve
                    </Button>
                        <Button variant="contained" color="danger" onClick={handleClose}>
                            Reject
                    </Button>
                    </DialogActions>}
            </form>
        </Dialog>
    )
}

export default ViewTrainings
