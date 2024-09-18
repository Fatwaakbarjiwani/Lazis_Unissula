import fb from "../../assets/facebook.svg";
import twit from "../../assets/twitter.svg";
import ig from "../../assets/instagram.svg";
import li from "../../assets/linkedin.svg";
import pesan from "../../assets/pesan.svg";
import browser from "../../assets/browser.svg";
import footer from "../../assets/footer.svg";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div
      style={{ backgroundImage: `url(${footer})` }}
      className="flex flex-col md:flex-row md:flex-wrap gap-y-4 justify-around md:justify-between lg:p-16 p-5 bg-GREENDARK text-white font-Inter mt-10 w-full h-auto"
    >
      <div className="md:w-1/4 w-full flex flex-col gap-2 xl:gap-5 items-start">
        <div className="bg-white p-1 rounded">
          <img src={logo} alt="Logo" className="w-24 md:w-32" />
        </div>
        <p className="text-sm md:text-base">
          Jl.Raya Kaligawe,Km.4,Sambirejo,Genuk,Terboyo Wetan,Kec.Genuk,Kota Semarang,Jawa Tengah 50112
        </p>
        <div className="flex gap-2 md:gap-4">
          <button className="bg-GREENDARK2 rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center hover:scale-110">
            <img src={fb} alt="Facebook" />
          </button>
          <button className="bg-GREENDARK2 rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center hover:scale-110">
            <img src={twit} alt="Twitter" />
          </button>
          <button className="bg-GREENDARK2 rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center hover:scale-110">
            <img src={ig} alt="Instagram" />
          </button>
          <button className="bg-GREENDARK2 rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center hover:scale-110">
            <img src={li} alt="LinkedIn" />
          </button>
        </div>
      </div>

      <div className="md:w-1/6 w-full flex flex-col gap-2 md:gap-4">
        <p className="font-bold text-lg md:text-xl">Program</p>
        <div className="text-sm md:text-base w-1/2 sm:w-full">
          <div className="flex justify-between gap-2">
            <p>Zakat</p>
            <p>Campaign</p>
          </div>
          <div className="flex justify-between gap-2">
            <p>Ziswaf</p>
            <p>Berita</p>
          </div>
          <div className="flex justify-between gap-2">
            <p>Donasi</p>
            <p>Infak</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/6 w-full flex flex-col gap-2 md:gap-4">
        <p className="font-bold text-lg md:text-xl">Lainnya</p>
        <div className="flex flex-col gap-1 text-sm md:text-base">
          <p>Zakat</p>
          <p>Apa itu Ziswaf?</p>
          <p>Privacy Policy</p>
          <p>Syarat dan Ketentuan</p>
          <p>Refund Policy</p>
        </div>
      </div>

      <div className="md:w-1/6 w-full flex flex-col gap-2 md:gap-4">
        <p className="font-bold text-lg md:text-xl">Tentang Kami</p>
        <div className="flex flex-col gap-2 text-sm md:text-base">
          <Link to={"https://ybw-sa.org/"}>
            <div className="flex gap-2 items-center">
              <img src={browser} className="w-5 md:w-6" alt="Website" />
              <p>https://ybw-sa.org/</p>
            </div>
          </Link>
          <Link to>
          <div className="flex gap-2 items-center">
            <img src={pesan} className="w-5 md:w-6" alt="Contact" />
            <p>https://lazis-ds.org/</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
