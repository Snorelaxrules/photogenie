import { Row, Col } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import BrushIcon from '@mui/icons-material/Brush';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import TuneIcon from '@mui/icons-material/Tune';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import FileUpload from "./upload";

const MainPage = () => {
    const [baseImage, setBaseImage] = useState("");
    const [resultImage, setResultImage] = useState("");
    const uploadSuccess = (imgItem: string) => {
        setResultImage(imgItem);
    }

    const fileSelected = (imgItem: string) => {
        setBaseImage(imgItem);
        alert(imgItem);
    }    

    return (
        <div style={{
            marginTop: '20px', display: 'flex',
            justifyContent: 'center', flexWrap: 'wrap',
        }}>
            <div style={{
                maxWidth: '1200px',
                width: '90%',
                minHeight: '310px',
                padding: '30px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3498db, #f39c12)',
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
            }}
            >
                <Row style={{ display: 'flex', alignItems: 'center', minHeight: '390px' }}>
                    <Col style={{ flex: 1 }}>
                        <h2 style={{ textAlign: 'center', fontSize: '48px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>
                            Turn sketches into drawings for free!
                        </h2>
                        <h3 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: 'white' }}>
                            Create images from sketches using our ControlNet CannyEdge
                        </h3>
                    </Col>
                    <Col style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div
                            style={{
                                width: '400px',
                                maxHeight: '500px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <FileUpload onUploadSuccess={uploadSuccess} onFileSelected={fileSelected}/>
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{
                maxWidth: '1200px',
                width: '95%',
                padding: '10px',
                borderRadius: '10px',
                borderLeft: '20px'
            }}>
                <h1 style={{ marginTop: '30px' }}>Canny Edge Examples</h1>
                {baseImage.length > 0 && 
                <Row>
                    <Col xl="6" className="d-flex justify-content-center">
                        <ReactCompareSlider
                            style={{ width: '512px', height: '512px', display: "flex", alignItems: "center", margin: '20px' }}
                            itemOne={<ReactCompareSliderImage src={baseImage} alt="Sketch" />}
                            itemTwo={<ReactCompareSliderImage src={resultImage} alt="Result" />}
                        />
                    </Col>
                </Row>
                }
                <Row>
                    <Col lg={4}>
                        <BrushIcon style={{ width: '60px', height: '60px' }} />
                        <h2>Convert Sketches</h2>
                        <p>Transform your rough sketches into detailed images effortlessly using advanced AI technologies like ControlNet.</p>
                    </Col>
                    <Col lg={4}>
                        <SearchIcon style={{ width: '60px', height: '60px' }} />
                        <h2>Enhance Edges</h2>
                        <p>Utilize Canny Edge detection algorithms to enhance the edges and contours of your sketches, giving them a professional look.</p>
                    </Col>
                    <Col lg={4}>
                        <LockIcon style={{ width: '60px', height: '60px' }} />
                        <h2>Privacy Assurance</h2>
                        <p>Your sketches are treated with utmost privacy. We do not store or use your artwork for any other purposes, ensuring your creative work remains confidential.</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <TuneIcon style={{ width: '60px', height: '60px' }} />
                        <h2>AI-Powered Enhancement</h2>
                        <p>Our AI models go beyond simple conversions. They enhance the quality and details of your sketch-to-image transformations, resulting in stunning visual output.</p>
                    </Col>
                    <Col lg={4}>
                        <HighlightOffIcon style={{ width: '60px', height: '60px' }} />
                        <h2>Artifact Removal</h2>
                        <p>Remove unwanted artifacts and imperfections from your converted images. Our AI technology ensures your artwork looks clean and professional.</p>
                    </Col>
                    <Col lg={4}>
                        <HighQualityIcon style={{ width: '60px', height: '60px' }} />
                        <h2>High-Resolution Output</h2>
                        <p>Unlike traditional methods, our AI-driven solution can produce high-resolution sketch-to-image conversions with stunning clarity and detail.</p>
                    </Col>
                </Row>
            </div>
        </div>
    )
};
export default MainPage;