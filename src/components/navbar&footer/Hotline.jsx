import wa from "../../assets/wapng.png";

export default function Hotline() {
  return (
    <div className="fixed bottom-6 right-4 z-50">
      <a
        href="https://api.whatsapp.com/send?phone=6281328538005&text=Assalamualaikum%2C%20Admin.%20Saya%20%5Bnama%20user%5D%20ingin%20meminta%20bantuan%20terkait%20%5Bsebutkan%20masalah%20atau%20permintaan%5D.%20Mohon%20arahannya%20agar%20dapat%20segera%20terselesaikan.%20Terima%20kasih%20sebelumnya."
        target="_blank"
        rel="noopener noreferrer"
        title="Hubungi via WhatsApp"
        className="group"
      >
        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center hover:bg-green-100 transition-all duration-300">
          <img
            src={wa}
            alt="WhatsApp Icon"
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </a>
    </div>
  );
}
