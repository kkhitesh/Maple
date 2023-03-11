import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { CreatePost } from "./pages/CreatePost";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { PostDetails } from "./components/PostDetails";
import { Suggestions } from "./components/Suggestions";
import { Bookmarks } from "./pages/Bookmarks";

function App() {
  return (
    <div className="App flex h-[100vh] overflow-hidden text-slate-800">
      <Router>
        {/* <Navbar /> */}
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
        <Suggestions />
      </Router>
    </div>
  );
}

export default App;
