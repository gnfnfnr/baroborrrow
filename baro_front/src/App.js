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
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<RouteMain />}>
          <Route path="/main" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/filtersearch" element={<Option />} />
          <Route path="/enroll" element={<ProductEnroll />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path={"/mypage/profile"} element={<Profile />} />
          <Route path={"/mypage/profileedit"} element={<ProfileEdit />} />
          <Route path={"/mypage/content"} element={<ContentList />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
