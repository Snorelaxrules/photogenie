import { Row, Col } from "react-bootstrap";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from "react-compare-slider";
import BrushIcon from "@mui/icons-material/Brush";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import TuneIcon from "@mui/icons-material/Tune";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import FileUpload from "./upload";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const RemoveBackgroundPage = () => {
    const [baseImage, setBaseImage] = useState("");
    const [resultImage, setResultImage] = useState("");
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const APIKey =
        "e7ec294e78cf50e095ceb342ea56c651861b605c403897b123463d7320c87896c5aa365b8c4e3c47d9e4646d125ae1b5";
    const uploadSuccess = (imgItem: string) => {
        setResultImage(imgItem);
    };

    const fileSelected = (acceptedFile: File) => {
        setFile(acceptedFile);
        const url = URL.createObjectURL(acceptedFile);
        setBaseImage(url);
        alert(url);
    };

    const generate = () => {
        const form = new FormData();
        if (file === null) return;
        form.append("image_file", file);
        alert("Dropped");
        //if (1 === 1) return;
        setLoading(true);
        fetch("https://clipdrop-api.co/remove-background/v1", {
            method: "POST",
            headers: {
                "x-api-key": APIKey,
            },
            body: form,
        })
            .then((response) => {
                alert("Buffer" + response.status + " " + response.statusText);
                return response.arrayBuffer();
            })
            .then((buffer) => {
                const blob = new Blob([buffer], { type: "image/jpeg" }); // Adjust the type accordingly

                // Create a URL for the Blob
                const result = URL.createObjectURL(blob);
                uploadSuccess(result);
                setLoading(false);
                // Now you can use the `imageUrl` to display the image
                /*const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            document.body.appendChild(imageElement);*/
            });
    };

    const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value);
    };

    return (
        <div
            style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    width: "90%",
                    minHeight: "310px",
                    padding: "30px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #3498db, #f39c12)",
                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Row
                    style={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: "390px",
                    }}
                >
                    <Col style={{ flex: 1 }}>
                        <h2
                            style={{
                                textAlign: "center",
                                fontSize: "48px",
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "white",
                            }}
                        >
                            Background Removal!
                        </h2>
                        <h3
                            style={{
                                textAlign: "center",
                                fontSize: "24px",
                                marginBottom: "20px",
                                color: "white",
                            }}
                        >
                            Remove the background of images with the use of our
                            AI!
                        </h3>
                    </Col>
                    <Col
                        style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    width: "500px",
                                    maxHeight: "600px",
                                    marginBottom: "50px",
                                }}
                            >
                                <FileUpload onFileSelected={fileSelected} />
                            </div>
                            <LoadingButton
                                loading={loading}
                                style={{
                                    backgroundColor:
                                        file === null || loading
                                            ? "#ccc"
                                            : "#007bff", // Change colors as needed
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    border: "none",
                                    outline: "none",
                                    marginTop: "10px",
                                    marginLeft: "180px",
                                }}
                                onClick={generate}
                                disabled={file === null || loading}
                            >
                                Generate
                            </LoadingButton>
                        </div>
                    </Col>
                </Row>
            </div>
            <div
                style={{
                    maxWidth: "1200px",
                    width: "95%",
                    padding: "10px",
                    borderRadius: "10px",
                    borderLeft: "20px",
                }}
            >
                {baseImage.length > 0 && (
                    <div>
                        <h1 style={{ marginTop: "30px" }}>Initial vs Result</h1>
                        <Row>
                            <Col>
                                <img
                                    src={baseImage}
                                    style={{
                                        width: "512px",
                                        height: "512px",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "20px",
                                    }}
                                />
                            </Col>
                            <Col>
                                <ReactCompareSlider
                                    style={{
                                        width: "512px",
                                        height: "512px",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "20px",
                                    }}
                                    itemOne={
                                        <ReactCompareSliderImage
                                            src={baseImage}
                                            alt="Sketch"
                                        />
                                    }
                                    itemTwo={
                                        <ReactCompareSliderImage
                                            src={resultImage}
                                            alt="Result"
                                        />
                                    }
                                />
                            </Col>
                        </Row>
                    </div>
                )}
                <Row>
                    <Col md={4}>
                        <CheckCircleOutlineIcon
                            style={{ width: "60px", height: "60px" }}
                        />
                        <h2>Effortless Background Removal</h2>
                        <p>
                            Easily remove backgrounds from your images with just
                            a few clicks. Our intuitive tool streamlines the
                            process for you.
                        </p>
                    </Col>
                    <Col md={4}>
                        <BrushIcon style={{ width: "60px", height: "60px" }} />
                        <h2>Precision Editing Control</h2>
                        <p>
                            Take full control over your image editing. Use
                            manual tools to fine-tune selections and ensure
                            perfect background removal.
                        </p>
                    </Col>
                    <Col md={4}>
                        <TuneIcon style={{ width: "60px", height: "60px" }} />
                        <h2>AI-Powered</h2>
                        <p>
                            Our AI models ensure that your new image is exactly
                            as you want it, without any blemishes, compared to
                            normal background removal models.
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default RemoveBackgroundPage;
