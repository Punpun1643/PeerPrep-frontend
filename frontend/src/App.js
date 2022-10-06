import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import SelectionView from './components/MatchingService/SelectionView';
import CountdownView from './components/MatchingService/CountdownView';
import RoomPage from './components/MatchingService/RoomPage'
import {SocketContext} from './components/MatchingService/SocketContext';
import {Box} from "@mui/material";

function App() {

    const [socket, setSocket] = useState();

    return (
        <div className="App">
            <SocketContext.Provider value={[socket, setSocket]}>
                {/* <Box display={"flex"} flexDirection={"column"} padding={"4rem"}> */}
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                            <Route path="/selectquestiondifficulty" element={<SelectionView/>}></Route>
                            <Route path="/findingmatch" element={<CountdownView/>}></Route>
                            <Route path="/roompage" element={<RoomPage/>}></Route>
                    </Routes>
                </Router>
            {/* </Box> */}
            </SocketContext.Provider>
        </div>
    );
}

export default App;
