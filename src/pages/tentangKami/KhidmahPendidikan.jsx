import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function KhidmahPendidikan() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setButtonPage("tentangkami"));
    }, []);
  return (
    <>
      <h1 className="font-bold text-3xl mt-10 text-center text-gray-600 mb-6">
        Khidmah Bidang <span className="text-[#69C53E]">Pendidikan</span>
      </h1>
      <div className="flex items-center justify-center sm:w-10/12 md:w-3/4 lg:w-4/5 mx-auto">
        <p className="text-justify px-5 py-5 leading-8 font-Inter">
          Pengembangan Pendidikan dilakukan dengan mengembangkan kualitas Bina
          insani pendidik dan anak didik serta memberikan bantuan pendidikan,
          baik anak didik yang bersekolah di sekolah umum maupun madrasah,
          Universitas dan TPQ. Bentuk programnya seperti Beasiswa Generasi
          Khaira Ummah (GKU) Anak Asuh Dikdasmen, Beasiswa Khaira Ummah
          Mahasiswa Unissula, Beasiswa putra putri pengabdi di lingkungan YBWSA,
          Bisyaroh Guru TPQ dan guru ngaji, dll.
        </p>
      </div>
    </>
  );
}
