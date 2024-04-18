import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import SketchToImagePage from "./sketchimage";
import RemoveBackgroundPage from "./removebg";
import ReplaceBackgroundPage from "./replacebg";
import { Remove } from "@mui/icons-material";

export function App() {
    return (
        <div className="wsmenucontainer">
            <Routes>
                <Route path="/" element={<ReplaceBackgroundPage />} />
                <Route path="/removebg" element={<RemoveBackgroundPage />} />
                <Route path="/sketchtoimage" element={<SketchToImagePage />} />
            </Routes>
        </div>
    );
}
export default App;
