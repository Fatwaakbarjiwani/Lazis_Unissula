import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function KhidmahDakwah() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setButtonPage("tentangkami"));
    }, []);
  return (
    <>
      <h1 className="font-bold text-3xl mt-10 text-center text-gray-600 mb-6">
        Khidmah Bidang <span className="text-[#69C53E]">Dakwah</span>
      </h1>
      <div className="flex items-center justify-center sm:w-10/12 md:w-3/4 lg:w-4/5 mx-auto">
        <p className="text-justify px-5 py-5 leading-8 font-Inter">
          Pelayanan Dakwah dilakukan dengan mengembangkan program syiar dakwah
          yang memudahkan masyarakat untuk memperoleh pengetahuan, bekal dan
          pelayanan terbaik tentang keislaman dan keagamaan. Bentuk Program
          Pelayanan Dakwah diantaranya Bantuan Muallaf, zakat fitrah, safari
          dakwah, pemakmuran masjid, jumat berkah, terbar Al-Quran, tebar
          Kurban, Program Ramadhan, dakwah multimedia/virtual, Sponsorship
          kegiatan dakwah, Bantuan Sarana Prasarana Dakwah, Majelis Taklim
          Sehati Pondok Boro, dll.
        </p>
      </div>
    </>
  );
}
