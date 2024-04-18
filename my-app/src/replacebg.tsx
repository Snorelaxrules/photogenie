import { Row, Col } from "react-bootstrap";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from "react-compare-slider";
import FilterHdrOutlinedIcon from "@mui/icons-material/PhotoCamera";
import WbSunnyOutlinedIcon from "@mui/icons-material/AutoFixHigh";
import MonochromePhotosOutlinedIcon from "@mui/icons-material/Security";
import CropFreeOutlinedIcon from "@mui/icons-material/AutoAwesome";
import Rotate90DegreesCcwOutlinedIcon from "@mui/icons-material/DeleteForever";
import BlurOnOutlinedIcon from "@mui/icons-material/ImageSearch";

import FileUpload from "./upload";
import { Paper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ReplaceBackgroundPage = () => {
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
        setResultImage("");
        setFile(acceptedFile);
        const url = URL.createObjectURL(acceptedFile);
        setBaseImage(url);
    };

    const generate = () => {
        const form = new FormData();
        if (file === null) return;
        form.append("image_file", file);
        form.append("prompt", prompt);
        //if (1 === 1) return;
        setLoading(true);
        fetch("https://clipdrop-api.co/replace-background/v1", {
            method: "POST",
            headers: {
                "x-api-key": APIKey,
            },
            body: form,
        })
            .then((response) => {
                if (response.status !== 200) {
                    if (response.status === 402) {
                        alert("Not enough credits");
                    } else {
                        alert(
                            "An error " +
                                response.status +
                                " occurred. Try another image."
                        );
                    }
                }
                return response.arrayBuffer();
            })
            .then((buffer) => {
                const blob = new Blob([buffer], { type: "image/jpeg" }); // Adjust the type accordingly
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
                textAlign: "center",
            }}
        >
            <Row>
                <Col>
                    <img
                        src={"./pp.png"}
                        style={{
                            width: "350px",
                            height: "70px",
                        }}
                    />
                </Col>
            </Row>

            <div
                style={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    textAlign: "center",
                    width: "90%",
                    minHeight: "310px",
                    padding: "30px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #315cdb, #d2cf12)",
                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Row>
                    <Col>
                        <h2
                            style={{
                                textAlign: "center",
                                fontSize: "48px",
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "white",
                            }}
                        >
                            Create your perfect product image with
                            PicturePerfect AI!
                        </h2>
                        <br />

                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "24px",
                                marginBottom: "20px",
                                color: "white",
                            }}
                        >
                            <b>
                                Re-imagine your images with different
                                backgrounds through the use of AI
                            </b>
                        </div>
                    </Col>
                </Row>
                <Row
                    style={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: "390px",
                    }}
                >
                    <Col
                        md={5}
                        style={{ textAlign: "center", alignItems: "center" }}
                    >
                        {resultImage.length > 0 ? (
                            <img
                                src={resultImage}
                                style={{
                                    width: "100%",
                                    maxWidth: "512px",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "20px",
                                }}
                            />
                        ) : baseImage.length > 0 ? (
                            <img
                                src={baseImage}
                                style={{
                                    width: "100%",
                                    maxWidth: "512px",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "20px",
                                }}
                            />
                        ) : (
                            <video
                                style={{
                                    maxWidth: "500px",
                                    maxHeight: "500px",
                                    textAlign: "center",
                                }}
                                width="100%"
                                height="100%"
                                autoPlay={true}
                                muted={true}
                                loop={true}
                            >
                                <source
                                    src="./pictureperfectdemo.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </Col>
                    <Col md={7}>
                        <div>
                            <div
                                style={{
                                    width: "95%",
                                    marginLeft: "20px",
                                    marginBottom: "20px",
                                }}
                            >
                                <FileUpload onFileSelected={fileSelected} />
                            </div>
                            <TextField
                                style={{
                                    width: "95%",
                                    background: "rgb(255,255,255)",
                                }}
                                id="filled-helperText"
                                variant="filled"
                                label="Describe the background for your product (eg. bag on a marble table)"
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
                    marginLeft: "5%",
                    marginRight: "5%",
                    width: "90%",
                    borderRadius: "10px",
                }}
            >
                {baseImage.length > 0 && resultImage.length ? (
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ marginTop: "30px" }}>
                            Original vs Result
                        </h1>
                        <Row>
                            <Col style={{ textAlign: "center" }}>
                                <img
                                    src={baseImage}
                                    style={{
                                        width: "100%",
                                        maxWidth: "512px",
                                    }}
                                />
                            </Col>
                            <Col style={{ textAlign: "center" }}>
                                <img
                                    src={resultImage}
                                    style={{
                                        width: "100%",
                                        maxWidth: "512px",
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                ) : (
                    ""
                )}
                <Paper
                    elevation={10}
                    style={{
                        padding: "20px",
                        width: "95%",
                        marginLeft: "5%",
                        marginRight: "5%",
                        marginTop: "20px",
                        backgroundColor: "#ffffff", // Lighter background color to increase contrast
                        borderRadius: "10px", // Rounded corners for a softer look
                    }}
                >
                    <h1>Features and Benefits</h1>
                    <br />
                    <br />
                    <Row>
                        <Col md={4}>
                            <FilterHdrOutlinedIcon
                                style={{ width: "60px", height: "60px" }}
                            />
                            <h2>Enhanced Visual Appeal</h2>
                            <p>
                                Elevate the visual appeal of your products with
                                AI-powered dynamic filters. Infuse vibrancy and
                                depth into your images effortlessly, creating
                                captivating visuals that attract and engage
                                customers.
                            </p>
                        </Col>
                        <Col md={4}>
                            <WbSunnyOutlinedIcon
                                style={{ width: "60px", height: "60px" }}
                            />
                            <h2>Consistent Quality</h2>
                            <p>
                                Ensure consistent quality across all product
                                photos with AI-driven lighting optimization.
                                Highlight product features to maximize
                                visibility and appeal to potential customers,
                                enhancing perceived value.
                            </p>
                        </Col>
                        <Col md={4}>
                            <MonochromePhotosOutlinedIcon
                                style={{ width: "60px", height: "60px" }}
                            />
                            <h2>Time Savings</h2>
                            <p>
                                Save valuable time by automating cropping with
                                AI product photography. Fit various platform
                                requirements seamlessly, ensuring consistency
                                across product listings and streamlining your
                                workflow.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <CropFreeOutlinedIcon
                                style={{ width: "60px", height: "60px" }}
                            />
                            <h2>Versatility</h2>
                            <p>
                                Enjoy the versatility of AI product photography
                                with adjustable angles. Showcase products from
                                their best perspectives, providing customers
                                with comprehensive views and detailed insights,
                                ultimately boosting engagement.
                            </p>
                        </Col>
                        <Col md={4}>
                            <Rotate90DegreesCcwOutlinedIcon
                                style={{ width: "60px", height: "60px" }}
                            />
                            <h2>Increased Sales</h2>
                            <p>
                                Drive sales with AI-powered background blur.
                                Emphasize product focus and draw attention to
                                key features, creating visually appealing images
                                that captivate customers and encourage
                                purchasing decisions.
                            </p>
                        </Col>
                        <Col md={4}>
                            <BlurOnOutlinedIcon
                                style={{ width: "60px", height: "60px" }}
                            />
                            <h2>Streamlined Workflow</h2>
                            <p>
                                Streamline your workflow with AI-powered
                                monochrome conversion. Transform product visuals
                                into timeless masterpieces that convey elegance
                                and style, enhancing brand reputation and appeal
                                effortlessly.
                            </p>
                        </Col>
                    </Row>
                </Paper>
            </div>
            <div
                style={{
                    width: "90%",
                    marginLeft: "5%",
                    marginRight: "5%",
                    padding: "10px",
                    borderRadius: "10px",
                    borderLeft: "20px",
                    marginTop: "20px",
                    marginBottom: "100px",
                }}
            >
                <h1>About Us</h1>
                <p>
                    PicturePerfect allows e-commerce merchants to create
                    beautiful product photos at low costs within seconds. Users
                    simply snap a photo of their product and describe their
                    preferred background in words. PicturePerfect’s generative
                    AI generates multiple product photo variations, saving
                    merchants valuable time and money compared to commercial
                    product photography.
                </p>
            </div>
        </div>
    );
};
export default ReplaceBackgroundPage;
