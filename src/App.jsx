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
import Tujuan from "./pages/tentangKami/Tujuan";
import VisiMisi from "./pages/tentangKami/VisiMisi";
import TentangKami from "./pages/tentangKami/TentangKami";
import KhidmahDakwah from "./pages/tentangKami/KhidmahDakwah";
import KhidmahEkonomi from "./pages/tentangKami/KhidmahEkonomi";
import KhidmahKesehatan from "./pages/tentangKami/KhidmahKesehatan";
import KhidmahLingkungan from "./pages/tentangKami/KhidmahLingkungan";
import KhidmahPendidikan from "./pages/tentangKami/KhidmahPendidikan";
import KhidmahSosial from "./pages/tentangKami/KhidmahSosial";
import StrukturOrganisasi from "./pages/tentangKami/StrukturOrganisasi";
import Hotline from "./components/navbar&footer/Hotline";
import PembayaranZiswaf from "./pages/pembayaran/PembayanZiswaf";
import PembayaranVa from "./pages/pembayaran/PembayaranVa";
import PembayaranQris from "./pages/pembayaran/PembayaranQris";
function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="relative top-16">
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
            path="/pembayaranZiswaf/:category/:id"
            element={<PembayaranZiswaf />}
          />
          <Route
            path="/pembayaranVa/:id"
            element={<PembayaranVa />}
          />
          <Route
            path="/pembayaranQris/:id"
            element={<PembayaranQris />}
          />
          <Route
            path="/konfirmasiPembayaran/:id"
            element={<KonfirmasiPembayaran />}
          />
          <Route path="/metodePembayaran/:id" element={<MetodePembayaran />} />
          <Route path="/penjelasan/zakat" element={<ZakatZiswaf />} />
          <Route path="/penjelasan/infak" element={<InfaqZiswaf />} />
          <Route path="/penjelasan/wakaf" element={<WakafZiswaf />} />
          {/* tentang kami */}
          <Route path="/penjelasan/Tujuan" element={<Tujuan />} />
          <Route path="/penjelasan/VIsiMisi" element={<VisiMisi />} />
          <Route path="/penjelasan/TentangKami" element={<TentangKami />} />
          <Route path="/penjelasan/KhidmahDakwah" element={<KhidmahDakwah />} />
          <Route
            path="/penjelasan/KhidmahEkonomi"
            element={<KhidmahEkonomi />}
          />
          <Route
            path="/penjelasan/KhidmahKesehatan"
            element={<KhidmahKesehatan />}
          />
          <Route
            path="/penjelasan/KhidmahLingkungan"
            element={<KhidmahLingkungan />}
          />
          <Route
            path="/penjelasan/KhidmahPendidikan"
            element={<KhidmahPendidikan />}
          />
          <Route path="/penjelasan/KhidmahSosial" element={<KhidmahSosial />} />
          <Route
            path="/penjelasan/KhidmahOrganisasi"
            element={<StrukturOrganisasi />}
          />
        </Routes>
      </div>
      <ModalRegister />
      <ModalLogin />
      <ModalResetPassword />
      <Hotline />
    </Router>
  );
}

export default App;
