import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home";
import { Clock } from "../pages/Clock";
import { ClockConfig } from "../pages/ClockConfig";

export function Router () {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/clock" element={<Clock/>}/>
            <Route path="/clockConfig" element={<ClockConfig/>}/>
        </Routes>
        </BrowserRouter>
    )
}