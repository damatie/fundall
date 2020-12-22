import { AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

const ViewTrainings = ({ open, handleClose, data, viewer, approveTraining, rejectTraining }) => {

    const handleApprove = () => {
        approveTraining(data.id, viewer === "Line Manager" ? "lm" : "hr");
    }

    const handleReject = () => {
        rejectTraining(data.id, viewer === "Line Manager" ? "lm" : "hr");
    }

    useEffect(() => {
        // console.log(data)
    }, [data])

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
                    {/* 
                    <TextField
                        id="outlined-secondary"
                        type="text"
                        disabled
                        value={data.employeeName}
                        variant="outlined"
                        label="Employee"
                        className="w-full mb-24"
                    /> */}
                    {
                        (viewer && viewer.toLowerCase() !== "employee")
                            ?
                            <>
                                {
                                    data.employeeId &&
                                    <TextField
                                        id="outlined-secondary"
                                        type="text"
                                        // disabled
                                        onChange={() => { }}
                                        value={data?.employeeId}
                                        variant="outlined"
                                        label="Employee"
                                        className="w-full mb-24"
                                    />
                                }

                                {
                                    data.email &&
                                    <TextField
                                        id="outlined-secondary"
                                        type="text"
                                        // disabled
                                        onChange={() => { }}
                                        defaultValue={data?.email}
                                        variant="outlined"
                                        label="Employee Mail"
                                        className="w-full mb-24"
                                    />
                                }

                            </>
                            :
                            <></>
                    }

                    {
                        data.employeeGrade ?
                            <TextField
                                id="outlined-secondary"
                                type="text"
                                // disabled
                                onChange={() => { }}
                                value={data?.employeeGrade}
                                variant="outlined"
                                label="Employee Grade"
                                className="w-full mb-24"
                            />
                            : <></>
                    }

                    {
                        data.companySeniority ?
                            <TextField
                                id="outlined-secondary"
                                type="text"
                                // disabled
                                onChange={() => { }}
                                value={data?.companySeniority}
                                variant="outlined"
                                label="Company Seniority"
                                className="w-full mb-24"
                            />
                            : <></>
                    }

                    {
                        data.industrySenority ?
                            <TextField
                                id="outlined-secondary"
                                type="text"
                                // disabled
                                onChange={() => { }}
                                value={data?.industrySenority}
                                variant="outlined"
                                label="Industry Seniority"
                                className="w-full mb-24"
                            />
                            : <></>
                    }


                    <TextField
                        id="outlined-secondary"
                        type="text"
                        // disabled
                        onChange={() => { }}
                        value={data.category}
                        variant="outlined"
                        label="Category"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        // disabled
                        onChange={() => { }}
                        value={data.startDate}
                        variant="outlined"
                        label="Start Date"
                        className="w-full mb-24"
                    />

                    <TextField
                        id="outlined-secondary"
                        type="text"
                        // disabled
                        onChange={() => { }}
                        value={data.endDate}
                        variant="outlined"
                        label="End Date"
                        className="w-full mb-24"
                    />

                    {
                        viewer && viewer.toLowerCase() === "hr manager" ? // must be an hr to view
                            <>
                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    // disabled
                                    onChange={() => { }}
                                    value={data?.department}
                                    variant="outlined"
                                    label="Department"
                                    className="w-full mb-24"
                                />

                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    // disabled
                                    onChange={() => { }}
                                    value={data?.entity}
                                    variant="outlined"
                                    label="Entity"
                                    className="w-full mb-24"
                                />

                                {data?.industrySenority &&
                                    <TextField
                                        id="outlined-secondary"
                                        type="text"
                                        // disabled
                                        onChange={() => { }}
                                        value={data?.industrySenority}
                                        variant="outlined"
                                        label="Industry Senority"
                                        className="w-full mb-24"
                                    />}

                                <TextField
                                    id="outlined-secondary"
                                    type="text"
                                    // disbaled
                                    onChange={() => { }}
                                    value={data?.companySeniority}
                                    variant="outlined"
                                    label="Company Senority"
                                    className="w-full mb-24"
                                />


                            </>
                            : <></>
                    }

                    {
                        data.certification ?
                            <TextField
                                id="outlined-secondary"
                                type="text"
                                // disabled
                                onChange={() => { }}
                                value={data.certification}
                                variant="outlined"
                                label="Certification"
                                className="w-full mb-24"
                            />
                            : <></>
                    }

                </DialogContent>
                {
                    data?.status?.toLowerCase() === "pending" &&
                    <DialogActions className="justify-between m-10 px-24 pb-12 sm:px-16 m-20">
                        <Button variant="contained" color="primary" onClick={handleApprove}>
                            Approve
                    </Button>
                        <Button variant="contained" color="info" onClick={handleReject}>
                            Reject
                    </Button>
                        <Button variant="contained" color="danger" onClick={handleClose}>
                            Close
                    </Button>
                    </DialogActions>
                }
            </form>
        </Dialog>
    )
}

export default ViewTrainings
