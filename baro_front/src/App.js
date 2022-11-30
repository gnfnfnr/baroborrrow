import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { GlobalStyle } from "./style";

import Home from "./main/Home";
import Footer from "./nav/Footer";
import Header from "./nav/Header";
import RouteMain from "./RouteMain";
import ProductEnroll from "./product/ProductEnroll";
import Basket from "./main/Basket";
import Mypage from "./personal/Mypage";
import Profile from "./personal/Profile";
import ProfileEdit from "./personal/ProfileEdit";
import ContentList from "./personal/ContentList";
import Login from "./start/Login";
import Borrow from "./personal/Borrow";
import Lend from "./personal/Lend";
import Join from "./start/Join";
import ProductDetail from "./product/ProductDetail";
import ProductResult from "./product/ProductResult";
import { UserContextProvider } from "./Context";
import IsSearch from "./main/IsSearch";
import SendMessage from "./personal/SendMessage";

function App() {
  const user = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<RouteMain />}>
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route path="/main" element={<Home />} />
            <Route element={<ProductDetail />} path={"/detail:id"} />
            <Route
              path="/search"
              element={user ? <IsSearch /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/enroll"
              element={
                user ? <ProductEnroll /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/basket"
              element={user ? <Basket /> : <Navigate replace to="/login" />}
            />
            <Route path={`/detail:id/result`} element={<ProductResult />} />
            {/* 마이페이지 */}
            <Route
              path="/mypage"
              element={user ? <Mypage /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/mypage/profile"
              element={user ? <Profile /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/mypage/profileedit"
              element={
                user ? <ProfileEdit /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/mypage/content"
              element={
                user ? <ContentList /> : <Navigate replace to="/login" />
              }
            >
              <Route path="/mypage/content/borrow" element={<Borrow />} />
              <Route path="/mypage/content/lend" element={<Lend />} />
            </Route>
            <Route path="/mypage/sendMessage" element={<SendMessage />} />
            {/* 로그인 */}
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Route>
        </Routes>
        <Footer />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
