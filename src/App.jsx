import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/navbar&footer/Navbar";
import Hotline from "./components/navbar&footer/Hotline";
import ModalRegister from "./components/modal/ModalRegister";
import ModalLogin from "./components/modal/ModalLogin";
import ModalResetPassword from "./components/modal/ModalResetPassword";
import { Commet } from "react-loading-indicators";
import PageNotFound from "./pages/homePage/PageNotFound";

// Lazy Loaded Pages
const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Berita = lazy(() => import("./pages/berita/Berita"));
const DetailBerita = lazy(() => import("./pages/berita/DetailBerita"));
const DaftarCampaign = lazy(() =>
  import("./pages/daftarCampaign/DaftarCampaign")
);
const SearchCampaign = lazy(() =>
  import("./pages/daftarCampaign/SearchCampaign")
);
const DetailCampaign = lazy(() =>
  import("./pages/detailCampaign/DetailCampaign")
);

// Pembayaran
const PembayaranCampaign = lazy(() =>
  import("./pages/pembayaran/PembayanCampaign")
);
const PembayaranZiswaf = lazy(() =>
  import("./pages/pembayaran/PembayanZiswaf")
);
const PembayaranVa = lazy(() => import("./pages/pembayaran/PembayaranVa"));
const PembayaranQris = lazy(() => import("./pages/pembayaran/PembayaranQris"));
const KonfirmasiPembayaran = lazy(() =>
  import("./pages/pembayaran/KonfirmasiPembayaran")
);
const MetodePembayaran = lazy(() =>
  import("./pages/pembayaran/MetodePembayaran")
);

// Ziswaf & Penjelasan
const FiqihZiswaf = lazy(() => import("./pages/ziswaf/FiqihZiswaf"));
const ZakatZiswaf = lazy(() => import("./pages/tentangKami/ZakatZiswaf"));
const InfaqZiswaf = lazy(() => import("./pages/tentangKami/InfaqZiswaf"));
const WakafZiswaf = lazy(() => import("./pages/tentangKami/WakafZiswaf"));

// Tentang Kami
const Tujuan = lazy(() => import("./pages/tentangKami/Tujuan"));
const VisiMisi = lazy(() => import("./pages/tentangKami/VisiMisi"));
const TentangKami = lazy(() => import("./pages/tentangKami/TentangKami"));
const KhidmahDakwah = lazy(() => import("./pages/tentangKami/KhidmahDakwah"));
const KhidmahEkonomi = lazy(() => import("./pages/tentangKami/KhidmahEkonomi"));
const KhidmahKesehatan = lazy(() =>
  import("./pages/tentangKami/KhidmahKesehatan")
);
const KhidmahLingkungan = lazy(() =>
  import("./pages/tentangKami/KhidmahLingkungan")
);
const KhidmahPendidikan = lazy(() =>
  import("./pages/tentangKami/KhidmahPendidikan")
);
const KhidmahSosial = lazy(() => import("./pages/tentangKami/KhidmahSosial"));
const StrukturOrganisasi = lazy(() =>
  import("./pages/tentangKami/StrukturOrganisasi")
);

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="relative top-16">
        <Suspense
          fallback={
            <div className="col-span-2 lg:col-span-3 flex justify-center h-[80vh] items-center">
              <div className="loader">
                <Commet
                  color="#69C53E"
                  size="medium"
                  text="Loading"
                  textColor="#69C53E"
                />
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />

            {/* Berita */}
            <Route path="/berita/:page/:number" element={<Berita />} />
            <Route path="/detailBerita/:id" element={<DetailBerita />} />

            {/* Campaign */}
            <Route
              path="/daftarCampaign/:page/:number"
              element={<DaftarCampaign />}
            />
            <Route path="/searchCampaign/:name" element={<SearchCampaign />} />
            <Route
              path="/detailCampaign/:campaignName/:id"
              element={<DetailCampaign />}
            />

            {/* Ziswaf */}
            <Route path="/fiqihZiswaf/:page" element={<FiqihZiswaf />} />
            <Route path="/penjelasan/zakat" element={<ZakatZiswaf />} />
            <Route path="/penjelasan/infak" element={<InfaqZiswaf />} />
            <Route path="/penjelasan/wakaf" element={<WakafZiswaf />} />

            {/* Pembayaran */}
            <Route
              path="/pembayaranCampaign/:id"
              element={<PembayaranCampaign />}
            />
            <Route
              path="/pembayaranZiswaf/:category/:id"
              element={<PembayaranZiswaf />}
            />
            <Route path="/pembayaranVa/:id" element={<PembayaranVa />} />
            <Route path="/pembayaranQris/:id" element={<PembayaranQris />} />
            <Route
              path="/konfirmasiPembayaran/:id"
              element={<KonfirmasiPembayaran />}
            />
            <Route
              path="/metodePembayaran/:id"
              element={<MetodePembayaran />}
            />

            {/* Tentang Kami */}
            <Route path="/penjelasan/tujuan" element={<Tujuan />} />
            <Route path="/penjelasan/visi-misi" element={<VisiMisi />} />
            <Route path="/penjelasan/tentang-kami" element={<TentangKami />} />
            <Route
              path="/penjelasan/khidmah-dakwah"
              element={<KhidmahDakwah />}
            />
            <Route
              path="/penjelasan/khidmah-ekonomi"
              element={<KhidmahEkonomi />}
            />
            <Route
              path="/penjelasan/khidmah-kesehatan"
              element={<KhidmahKesehatan />}
            />
            <Route
              path="/penjelasan/khidmah-lingkungan"
              element={<KhidmahLingkungan />}
            />
            <Route
              path="/penjelasan/khidmah-pendidikan"
              element={<KhidmahPendidikan />}
            />
            <Route
              path="/penjelasan/khidmah-sosial"
              element={<KhidmahSosial />}
            />
            <Route
              path="/penjelasan/khidmah-organisasi"
              element={<StrukturOrganisasi />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </div>

      {/* Global Modals */}
      <ModalRegister />
      <ModalLogin />
      <ModalResetPassword />
      <Hotline />
    </Router>
  );
}

export default App;
