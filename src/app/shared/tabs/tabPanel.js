import { Box, Typography } from '@material-ui/core'
import React from 'react'

const TabPanels = ( { children, value, index, text,Comp, ...other } ) => {
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Comp className="bg-pink-500 w-1/2">
                        {text}
                    </Comp>
                </Box>
            )}
        </div>
    )
}

export default TabPanels
