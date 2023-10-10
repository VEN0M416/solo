import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main-hello";
import { Profile } from "./pages/profile";
import { AboutUs } from "./pages/about-us";
import { Admin } from "./pages/admin";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
