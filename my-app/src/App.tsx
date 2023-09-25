
import { Routes, Route, useLocation } from "react-router-dom";
import React from 'react';
import { useEffect, useState } from "react";
import MainPage from "./main";

export function App() {

    return (

                <div className="wsmenucontainer">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                    </Routes >
                    </div>
    );
};
export default App;

