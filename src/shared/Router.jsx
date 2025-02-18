import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Mypage from "../pages/Mypage";
import Detail from "../pages/Detail";
import Layout from "../layout/Layout";
import FeedEdit from "../pages/FeedEdit";
import Error from "../pages/Error";

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
          <Route path="/detail" element={<Detail />} />
          <Route path="/edit" element={<FeedEdit />} />
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
