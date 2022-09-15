import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./style";

import Home from "./main/Home";
import Footer from "./nav/Footer";
import Header from "./nav/Header";
import RouteMain from "./RouteMain";
import Search from "./main/Search";
import Option from "./main/Option";
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
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<RouteMain />}>
            <Route path="/main" element={<Home />} />
            <Route element={<ProductDetail />} path={"/detail:id"} />
            <Route path="/search" element={<Search />} />

            <Route path="/enroll" element={<ProductEnroll />} />
            <Route path="/basket" element={<Basket />} />
            <Route path={`/detail:id/result`} element={<ProductResult />} />

            {/* 마이페이지 */}
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/profile" element={<Profile />} />
            <Route path="/mypage/profileedit" element={<ProfileEdit />} />
            <Route path="/mypage/content" element={<ContentList />}>
              <Route path="/mypage/content/borrow" element={<Borrow />} />
              <Route path="/mypage/content/lend" element={<Lend />} />
            </Route>
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
