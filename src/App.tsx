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
import { Profile } from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { Homepage } from "./pages/Homepage";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [userAuth, loading, error] = useAuthState(auth);

  return (
    <div className="App flex h-[100vh] overflow-hidden text-slate-800">
      <Toaster />
      <Router>
        {/* <Navbar /> */}
        {userAuth && <Sidebar />}
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/user/:id" element={<Profile />} />
          </Route>
          <Route path="/home" element={<Homepage />} />
        </Routes>
        {userAuth && <Suggestions />}
      </Router>
    </div>
  );
}

export default App;
