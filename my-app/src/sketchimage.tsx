import { Row, Col } from "react-bootstrap";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from "react-compare-slider";
import BrushIcon from "@mui/icons-material/Brush";
import SearchIcon from "@mui/icons-material/Search";
import LockIcon from "@mui/icons-material/Lock";
import TuneIcon from "@mui/icons-material/Tune";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import FileUpload from "./upload";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SketchToImagePage = () => {
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
        form.append("sketch_file", file);
        form.append("prompt", prompt);
        alert(baseImage + " " + prompt);
        alert("Dropped");
        //if (1 === 1) return;
        setLoading(true);
        fetch("https://clipdrop-api.co/sketch-to-image/v1/sketch-to-image", {
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
                            Turn sketches into drawings for free!
                        </h2>
                        <h3
                            style={{
                                textAlign: "center",
                                fontSize: "24px",
                                marginBottom: "20px",
                                color: "white",
                            }}
                        >
                            Create images from sketches using our ControlNet
                            CannyEdge
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
                                    maxHeight: "400px",
                                    marginBottom: "100px",
                                }}
                            >
                                <FileUpload onFileSelected={fileSelected} />
                            </div>
                            <TextField
                                style={{
                                    width: "565px",
                                    background: "rgb(255,255,255)",
                                }}
                                id="filled-helperText"
                                variant="filled"
                                label="Enter your prompt"
                                value={prompt}
                                onChange={handlePromptChange}
                            />
                            <LoadingButton
                                loading={loading}
                                style={{
                                    backgroundColor:
                                        prompt.length < 5 ||
                                        file === null ||
                                        loading
                                            ? "#ccc"
                                            : "#007bff", // Change colors as needed
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    border: "none",
                                    outline: "none",
                                    marginTop: "10px",
                                }}
                                onClick={generate}
                                disabled={
                                    prompt.length < 5 ||
                                    file === null ||
                                    loading
                                }
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
                        <h1 style={{ marginTop: "30px" }}>Sketch vs Result</h1>
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
                        <BrushIcon style={{ width: "60px", height: "60px" }} />
                        <h2>Convert Sketches</h2>
                        <p>
                            Transform your rough sketches into detailed images
                            effortlessly using advanced AI technologies like
                            ControlNet.
                        </p>
                    </Col>
                    <Col md={4}>
                        <SearchIcon style={{ width: "60px", height: "60px" }} />
                        <h2>Enhance Edges</h2>
                        <p>
                            Utilize Canny Edge detection algorithms to enhance
                            the edges and contours of your sketches, giving them
                            a professional look.
                        </p>
                    </Col>
                    <Col md={4}>
                        <LockIcon style={{ width: "60px", height: "60px" }} />
                        <h2>Privacy Assurance</h2>
                        <p>
                            Your sketches are treated with utmost privacy. We do
                            not store or use your artwork for any other
                            purposes, ensuring your creative work remains
                            confidential.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <TuneIcon style={{ width: "60px", height: "60px" }} />
                        <h2>AI-Powered Enhancement</h2>
                        <p>
                            Our AI models go beyond simple conversions. They
                            enhance the quality and details of your
                            sketch-to-image transformations, resulting in
                            stunning visual output.
                        </p>
                    </Col>
                    <Col md={4}>
                        <HighlightOffIcon
                            style={{ width: "60px", height: "60px" }}
                        />
                        <h2>Artifact Removal</h2>
                        <p>
                            Remove unwanted artifacts and imperfections from
                            your converted images. Our AI technology ensures
                            your artwork looks clean and professional.
                        </p>
                    </Col>
                    <Col md={4}>
                        <HighQualityIcon
                            style={{ width: "60px", height: "60px" }}
                        />
                        <h2>High-Resolution Output</h2>
                        <p>
                            Unlike traditional methods, our AI-driven solution
                            can produce high-resolution sketch-to-image
                            conversions with stunning clarity and detail.
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default SketchToImagePage;
