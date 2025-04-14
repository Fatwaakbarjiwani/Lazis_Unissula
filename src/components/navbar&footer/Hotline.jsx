import { IoChatbubbleOutline } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Hotline() {
  return (
    <div className="fixed bottom-14 right-2 z-50 flex items-center space-x-2">
      <a
        href="https://api.whatsapp.com/send?phone=6281328538005&text=Assalamualaikum%2C%20Admin.%20Saya%20%5Bnama%20user%5D%20ingin%20meminta%20bantuan%20terkait%20%5Bsebutkan%20masalah%20atau%20permintaan%5D.%20Mohon%20arahannya%20agar%20dapat%20segera%20terselesaikan.%20Terima%20kasih%20sebelumnya."
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="fixed w-12 h-12 bottom-6 right-4 z-50 bg-green-700 border border-slate-200 text-white rounded-full drop-shadow-2xl shadow-2xl shadow-black cursor-pointer flex items-center justify-center hover:bg-black hover:text-green-500 hover:border-green-500"
          title="Hotline"
        >
          <IoChatbubbleOutline
            size={37}
            className="absolute hover:text-green-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BsFillTelephoneFill size={18} />
          </div>
        </div>
      </a>
    </div>
  );
}
