import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar&Footer/Navbar";
import HomePage from "./pages/homePage/HomePage";
import DetailCampaign from "./pages/detailCampaign/DetailCampaign";
import ModalRegister from "./components/modal/ModalRegister";
import ModalLogin from "./components/modal/ModalLogin";
import DaftarCampaign from "./pages/daftarCampaign/DaftarCampaign";
import Berita from "./pages/berita/Berita";
function App() {
  return (
    <Router>
      <Navbar/>
      <div className="relative top-16 h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/detailCampaign/:code" element={<DetailCampaign />} />
          <Route path="/daftarCampaign" element={<DaftarCampaign />} />
        </Routes>
      </div>
      <ModalRegister/>
      <ModalLogin/>
    </Router>
  );
}

export default App;
