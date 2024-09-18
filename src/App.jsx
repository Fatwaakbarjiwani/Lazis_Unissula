import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import DetailCampaign from "./pages/detailCampaign/DetailCampaign";
import ModalRegister from "./components/modal/ModalRegister";
import ModalLogin from "./components/modal/ModalLogin";
import DaftarCampaign from "./pages/daftarCampaign/DaftarCampaign";
import Berita from "./pages/berita/Berita";
import FiqihZiswaf from "./pages/ziswaf/FiqihZiswaf";
import { Toaster } from "react-hot-toast";
import PembayaranCampaign from "./pages/pembayaran/PembayanCampaign";
import DetailBerita from "./pages/berita/DetailBerita";
import Navbar from "./components/navbar&footer/Navbar";
import SearchCampaign from "./pages/daftarCampaign/SearchCampaign";
import Profile from "./pages/profile/Profile";
import KonfirmasiPembayaran from "./pages/pembayaran/KonfirmasiPembayaran";
import MetodePembayaran from "./pages/pembayaran/MetodePembayaran";
import ZakatZiswaf from "./pages/tentangKami/ZakatZiswaf";
import InfaqZiswaf from "./pages/tentangKami/InfaqZiswaf";
import WakafZiswaf from "./pages/tentangKami/WakafZiswaf";
import ModalResetPassword from "./components/modal/ModalResetPassword";
function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="relative top-16 ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/berita/:page/:number" element={<Berita />} />
          <Route path="/detailBerita/:id" element={<DetailBerita />} />
          <Route path="/detailCampaign/:id" element={<DetailCampaign />} />
          <Route path="/searchCampaign/:name" element={<SearchCampaign />} />
          <Route
            path="/daftarCampaign/:page/:number"
            element={<DaftarCampaign />}
          />
          <Route path="/fiqihZiswaf/:page" element={<FiqihZiswaf />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/pembayaranCampaign/:id"
            element={<PembayaranCampaign />}
          />
          <Route
            path="/konfirmasiPembayaran/:id"
            element={<KonfirmasiPembayaran />}
          />
          <Route path="/metodePembayaran/:id" element={<MetodePembayaran />} />
          <Route path="/penjelasan/zakat" element={<ZakatZiswaf />} />
          <Route path="/penjelasan/infak" element={<InfaqZiswaf />} />
          <Route path="/penjelasan/wakaf" element={<WakafZiswaf />} />
        </Routes>
      </div>
      <ModalRegister />
      <ModalLogin />
      <ModalResetPassword />
    </Router>
  );
}

export default App;
