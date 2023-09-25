import React, { Fragment, useCallback, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import DialogMessageBox from './DialogMessageBox';
import './css/main.css';
interface FileUploadProps {
    onUploadSuccess?: (imgItem: string) => void;

}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {

    const [fileUploading, setFileUploading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [progress, setProgress] = useState(0);
    const [dialogMessage, setDialogMessage] = useState({ title: "", message: "", meta: {}, action: "", confirm: "" });
    const navigate = useNavigate();
    const [activeFileId, setActiveFileId] = useState<string | null>(null);
    /*const onDrop = ((acceptedFiles: File[]) => {
        alert("DROP?");
        processDropFiles(acceptedFiles);
    })*/

    const onDrop = useCallback((acceptedFiles: File[]) => {
        alert("Droped");
      }, [])
    
    const processDropFiles = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            alert("AIRDROP INBOUND");
            handleSubmitFiles(acceptedFiles);
        }
    }

    const handleSubmitFiles = async (acceptedFiles: File[]) => {

        // There is no update asset so we just delete and reupload.
        const file = acceptedFiles[0];
        if (file === null) {
            return;
        }
        if (!file) {
            setFileUploading(false);
            return;
        }
        setProgress(1);
        setFileUploading(true);
        let filenum = acceptedFiles.length;
        try {
            // Using POST

            acceptedFiles.forEach((file) => {
                setSelectedFileName(file.name);
                const formData = new FormData();
                formData.append("file", file, file.name);
                formData.append("fileType", "image");
                axios.post("/uploadFile", formData, {
                    headers: {
                        "Authorization": "Bearer " + "TODO: to fill in",
                    },
                    onUploadProgress: data => {
                        //Set the progress value to show the progress bar
                        if (data.total) {
                        const percent = Math.round((100 * data.loaded) / data.total);
                        setProgress(percent);
                        }
                    },
                }).then(async (res) => {
                    if (res.data.fileIds && res.data.fileIds.length > 0) {
                        filenum--;
                    }
                    if (filenum === 0) {
                        setActiveFileId(res.data.fileIds[0]);
                        setFileUploading(false);

                    }
                }).catch((err) => {
                    setProgress(0);
                    setFileUploading(false);

                });
            })

        }

        catch (err: any) {
            setFileUploading(false);

        }

    };


    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: {
            'image/png': [],
            'image/jpeg': [],
        }, onDrop
    })
    const handleConfirm = () => {
        if (dialogMessage.action === "purchaseunit") {
            navigate("/plan");
        }
        setProgress(0);
        closeWindow();
    }

    const closeWindow = () => {
        setDialogMessage({ title: '', message: "", meta: {}, action: "", confirm: "" });
    }
    const [snackMessage, setSnackMessage] = useState("");

    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackMessage("");
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    function CircularProgressWithLabel(
        props: CircularProgressProps & { value: number },
    ) {
        return (
            <Fragment>

                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" {...props} />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                        >{`${Math.round(props.value)}%`}</Typography>
                    </Box>
                </Box>
            </Fragment>

        );
    }


    return (

        <div style={{ width: '100%', height: '190px' }}>
            <DialogMessageBox title={dialogMessage.title} message={dialogMessage.message} meta={dialogMessage.meta} confirm={dialogMessage.confirm ? "Confirm" : ""} cancel={dialogMessage.confirm ? "Cancel" : "Dismiss"} onCancel={closeWindow} onConfirm={handleConfirm} visible={dialogMessage.title.length > 0} />
            <Snackbar
                open={snackMessage.length > 0}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message={snackMessage}
                action={action}
            />
            {
                fileUploading ?
                    (progress === 100 ?
                        < div className='dropzone'>{selectedFileName} Upload completed.
                            <LinearProgress />
                        </div> :
                        <div className='dropzone'><CircularProgressWithLabel value={progress} />
                            <div>Uploading {selectedFileName}</div>
                        </div>) :

                    <div {...getRootProps({
                        className: isDragActive ? (isDragAccept ? 'dropzoneActive' : (isDragReject ? 'dropzoneReject' : 'dropzoneActive')) : 'dropzone',

                    })}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '& > *': {
                                    m: 1,
                                },
                                height: "100%"
                            }}
                        >
                            <input {...getInputProps()} />
                            {

                                isDragActive ?
                                    (isDragReject ? <p>File type not supported!</p> : <p>Drop the files here ...</p>) :
                                    <div>
                                        <WallpaperIcon style={{ fontSize: '60px', marginBottom: '20px' }} fontSize='inherit' />
                                        <p>Drag 'n' drop PNG or JPEG  image files here, or click to select files</p>
                                    </div>
                            }
                        </Box>
                    </div>


            }

        </div >



    )
};

export default FileUpload;
