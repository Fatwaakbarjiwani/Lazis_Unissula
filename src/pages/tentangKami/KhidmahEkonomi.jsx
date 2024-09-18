import { useDispatch } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { useEffect } from "react";

export default function KhidmahEkonomi() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setButtonPage("tentangkami"));
    }, []);
  return (
    <>
      <h1 className="font-bold text-3xl mt-10 text-gray-600 text-center mb-6">
        Khidmah Bidang <span className="text-[#69C53E]">Ekonomi</span>
      </h1>
      <div className="flex items-center justify-center sm:w-10/12 md:w-3/4 lg:w-4/5 mx-auto">
        <p className="text-justify px-5 py-5 leading-8 font-Inter">
          Pelayanan kesehatan dilakukan dengan memberikan bantuan langsung dan
          tak langsung berupa kebutuhan dasar dan layanan kesehatan kepada kaum
          dhuafa di daerah minus atau masyarakat korban bencana. Bentuk
          programnya seperti PKBM (Pelayanan Kesehatan Berbasis Masjid), Bantuan
          Pasien Dhuafa di RSI Sultan Agung, Bantuan Makanan keluarga Pasien
          Dhuafa, Bantuan Transportasi pasien Dhuafa, Hospitally Social
          Responsibility (HSR), Layanan Kesehatan Gratis dan jumat sehat, dll.
        </p>
      </div>
    </>
  );
}
