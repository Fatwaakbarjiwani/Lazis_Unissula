import fb from "../../assets/facebook.svg";
import yt from "../../assets/youtube.png";
import tt from "../../assets/tik-tok.png";
import twit from "../../assets/twitter.svg";
import ig from "../../assets/instagram.svg";
// import li from "../../assets/linkedin.svg";
import pesan from "../../assets/pesan.svg";
import browser from "../../assets/browser.svg";
import footer from "../../assets/footer.svg";
import logo from "../../assets/logoYBWSA.png";
import logo2 from "../../assets/logo2.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      style={{ backgroundImage: `url(${footer})` }}
      className="flex flex-col md:flex-row md:flex-wrap gap-y-4 justify-around md:justify-between lg:p-16 p-5 bg-GREENDARK text-white font-Inter md:mt-10 w-full h-auto"
    >
      <div className="md:w-1/4 w-full flex flex-col gap-2 xl:gap-5 items-start">
        <div className="bg-white p-1 rounded flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-12" />
          <img src={logo2} alt="Logo" className="h-12" />
        </div>
        <p className="text-sm md:text-base">
          Jl.Raya Kaligawe,Km.4,Sambirejo,Genuk,Terboyo Wetan,Kec.Genuk,Kota
          Semarang,Jawa Tengah 50112
        </p>
        <div className="flex gap-3 md:gap-4">
          <a
            href="https://web.facebook.com/lazissultanagung.agung"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:scale-110 transition-transform duration-300 group"
          >
            <img
              src={fb}
              alt="Facebook"
              className="w-6 h-6 md:w-7 md:h-7 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-lg transition-all duration-300"
            />
          </a>
          <a
            href="https://youtube.com/@lazissultanagung?si=807X3lYECMeMBOvr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:scale-110 transition-transform duration-300 group"
          >
            <img
              src={yt}
              alt="Youtube"
              className="w-6 h-6 md:w-7 md:h-7 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-lg transition-all duration-300"
            />
          </a>
          <a
            href="https://www.tiktok.com/@lazissultanagung?_t=ZS-8zdEC18cV1T&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:scale-110 transition-transform duration-300 group"
          >
            <img
              src={tt}
              alt="Tiktok"
              className="w-6 h-6 md:w-7 md:h-7 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-lg transition-all duration-300"
            />
          </a>
          <a
            href="https://x.com/lazissultanagu1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:scale-110 transition-transform duration-300 group"
          >
            <img
              src={twit}
              alt="Twitter"
              className="w-6 h-6 md:w-7 md:h-7 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-lg transition-all duration-300"
            />
          </a>
          <a
            href="https://www.instagram.com/lazissultanagung/?hl=id"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:scale-110 transition-transform duration-300 group"
          >
            <img
              src={ig}
              alt="Instagram"
              className="w-6 h-6 md:w-7 md:h-7 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-lg transition-all duration-300"
            />
          </a>
          {/* <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:scale-110 transition-transform duration-300 group"
          >
            <img 
              src={li} 
              alt="LinkedIn" 
              className="w-6 h-6 md:w-7 md:h-7 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-lg transition-all duration-300" 
            />
          </a> */}
        </div>
      </div>

      <div className="md:w-1/6 w-full flex flex-col gap-2 md:gap-4">
        <p className="font-bold text-lg md:text-xl">Program</p>
        <div className="text-sm md:text-base w-1/2 sm:w-full">
          <div className="flex justify-between gap-2">
            <Link to="/fiqihZiswaf/Ziswaf" className="hover:underline">
              Zakat
            </Link>
            <Link to="/daftarCampaign/Campaign/1" className="hover:underline">
              Campaign
            </Link>
          </div>
          <div className="flex justify-between gap-2">
            <Link to="/fiqihZiswaf/Ziswaf" className="hover:underline">
              Ziswaf
            </Link>
            <Link to="/berita/Berita/1" className="hover:underline">
              Berita
            </Link>
          </div>
          <div className="flex justify-between gap-2">
            <Link to="/daftarCampaign/Campaign/1" className="hover:underline">
              Donasi
            </Link>
            <Link to="/fiqihZiswaf/Ziswaf" className="hover:underline">
              Infak
            </Link>
          </div>
        </div>
      </div>

      <div className="md:w-1/6 w-full flex flex-col gap-2 md:gap-4">
        <p className="font-bold text-lg md:text-xl">Lainnya</p>
        <div className="flex flex-col gap-1 text-sm md:text-base">
          <Link to="/fiqihZiswaf/Ziswaf" className="hover:underline">
            Zakat
          </Link>
          <Link to="/fiqihZiswaf/Ziswaf" className="hover:underline">
            Apa itu Ziswaf?
          </Link>
          <Link to="/penjelasan/Tujuan" className="hover:underline">
            Tujuan
          </Link>
          <Link to="/penjelasan/Tentang-Kami" className="hover:underline">
            Tentang Kami
          </Link>
          {/* <Link to="/refund-policy" className="hover:underline">
            Refund Policy
          </Link> */}
        </div>
      </div>

      <div className="md:w-1/6 w-full flex flex-col gap-2 md:gap-4">
        <p className="font-bold text-lg md:text-xl">Tentang Kami</p>
        <div className="flex flex-col gap-2 text-sm md:text-base">
          <a
            href="https://ybw-sa.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <div className="flex gap-2 items-center">
              <img src={browser} className="w-5 md:w-6" alt="Website" />
              <p>https://ybw-sa.org/</p>
            </div>
          </a>
          <a
            href="https://lazis-ds.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <div className="flex gap-2 items-center">
              <img src={pesan} className="w-5 md:w-6" alt="Contact" />
              <p>https://lazis-ds.org/</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
