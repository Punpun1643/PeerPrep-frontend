import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import SelectionView from './components/MatchingService/SelectionView';
import CountdownView from './components/MatchingService/CountdownView';
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/selectquestiondifficulty" element={<SelectionView/>}></Route>
                        <Route path="/findingmatch" element={<CountdownView/>}></Route>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
