import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { CreatePost } from "./pages/CreatePost";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App h-[100vh] flex text-slate-800">
      <Router>
        {/* <Navbar /> */}
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
