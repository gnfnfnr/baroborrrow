import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { GlobalStyle } from "./style";
import Home from "./main/Home";
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
import SendMessage from "./personal/SendMessage";
import Message from "./personal/Message";
import Chating from "./personal/Chating";
import Search from "./main/Search";
import LenderDetail from "./personal/LenderDetail";
import Payment from "./pay/Payment";
import PaymentApprove from "./pay/PaymentApprove";
import PaymentType from "./pay/PaymentType";
import Service from "./customer/Service";
import Report from "./customer/Report";
import ReportDetail from "./customer/ReportDetail";
import ProductOwner from "./product/ProductOwner";

function App() {
  const user = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<RouteMain />}>
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route path="/main" element={<Home />} />
            <Route element={<ProductDetail />} path={"/detail:id"} />
            <Route
              path="/search"
              element={user ? <Search /> : <Navigate replace to="/login" />}
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
            <Route path={`/detail/:owner`} element={<ProductOwner />} />
            {/* 마이페이지 */}
            <Route
              path="/mypage"
              element={user ? <Mypage /> : <Navigate replace to="/login" />}
            />
            <Route path="/mypage/service" element={<Service />} />
            <Route
              path="/mypage/service/report"
              element={user ? <Report /> : <Navigate replace to="/login" />}
            />
            <Route path="/mypage/service/:id" element={<ReportDetail />} />
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
              <Route path="/mypage/content/lend" element={<Lend />}>
                <Route
                  path="/mypage/content/lend/:id"
                  element={<LenderDetail />}
                />
              </Route>
            </Route>
            <Route
              path="/mypage/sendMessage/receiver=:nickname&&member=:int&&roomId=:id"
              element={
                user ? <SendMessage /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/mypage/message"
              element={user ? <Message /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/mypage/chatting/nickname=:nickname&&item=:item&&roomId=:roomId&&member=:member"
              element={user ? <Chating /> : <Navigate replace to="/login" />}
            />
            {/* 로그인 */}
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Route>
          <Route path="/payment" element={<Payment />}>
            <Route path="/payment/type" element={<PaymentType />} />
            <Route path="/payment/approve" element={<PaymentApprove />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
