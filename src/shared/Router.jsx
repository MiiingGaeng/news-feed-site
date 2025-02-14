import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Mypage from "../pages/Mypage";
import FindIdPw from "../pages/FindIdPw";
import Detail from "../pages/Detail";
import Layout from "../layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/findidpw" element={<FindIdPw />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
