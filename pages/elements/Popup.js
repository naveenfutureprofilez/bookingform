import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(5),
    }
}));
 
export default function Popup(props) {

    const [open, setOpen] = React.useState(props.status);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    return <>
        <div>
            {props.text ? <>
                <Button variant="outlined" className='mainbtn' onClick={handleClickOpen}>
                    {props.text}
                </Button>
            </> : null}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open} > 
                   {props.children}
                    <Button className='thankyouBtn mainbtn sm' autoFocus onClick={handleClose}>
                        Done
                    </Button>
            </BootstrapDialog>
        </div>
    </>
}


