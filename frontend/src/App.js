import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignupPage from './components/SignupPage';
import ChangePasswordPage from "./components/ChangePasswordPage";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import Home from "./components/Home";
import SelectionView from './components/MatchingService/SelectionView';
import CountdownView from './components/MatchingService/CountdownView';
import RoomPage from './components/MatchingService/RoomPage'
import NavBar from "./components/NavBar";

function WithNavBar() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
    
}


function App() {

    return (
        <div className="App">
            {/* <Box display={"flex"} flexDirection={"column"} padding={"4rem"}> */}
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    {/* Placeholder home for matching-service */}
                    <Route path="/" element={<WithNavBar />}>
                        <Route path="home" element={<Home />} />
                        <Route path="changePassword" element={<ChangePasswordPage/>}/>
                        <Route path="selectquestiondifficulty" element={<SelectionView/>}></Route>
                        <Route path="findingmatch" element={<CountdownView/>}></Route>
                        <Route path="roompage" element={<RoomPage/>}></Route>
                    </Route>
                    
                </Routes>
            </Router>
            {/* </Box> */}
        </div>
    );
}

export default App;
