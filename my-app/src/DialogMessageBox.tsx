import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";


type ChildProps = {
    title: string,
    message: string,
    cancel: string,
    confirm: string,
    visible: boolean,
    meta?: any,
    onCancel?: () => void | null,
    onConfirm?: (value: any) => void | null,
}


export const DialogMessageBox: React.FC<ChildProps> = ({ title = "", message = "", meta = {}, confirm = "Yes", cancel = "Dismiss", visible = false, onCancel = () => { }, onConfirm = () => { } }) => {
    const handleCancel = () => {
        onCancel();
    }
    const handleConfirm = () => {
        onConfirm(meta);
    }
    return (
        <Dialog open={visible}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" >{title}</DialogTitle>
            < DialogContent >
                <DialogContentText id="alert-dialog-description" > {message}</DialogContentText>
            </DialogContent>
            <DialogActions>

                {confirm.length > 0 ?
                    <div>
                        <Button onClick={handleConfirm}>
                            {confirm}
                        </Button>
                        <Button onClick={handleCancel} autoFocus>
                            {cancel}
                        </Button>
                    </div> :
                    <div>
                        <Button onClick={handleCancel} autoFocus >
                            {cancel}
                        </Button>
                    </div>}
            </DialogActions></Dialog>);

}
export default DialogMessageBox
