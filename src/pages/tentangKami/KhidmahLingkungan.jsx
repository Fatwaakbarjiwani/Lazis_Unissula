import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function KhidmahLingkungan() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setButtonPage("tentangkami"));
    }, []);
  return (
    <>
      <h1 className="font-bold text-3xl mt-10 text-center text-gray-600 mb-6">
        Khidmah Bidang <span className="text-[#69C53E]">Lingkungan</span>
      </h1>
      <div className="flex items-center justify-center sm:w-10/12 md:w-3/4 lg:w-4/5 mx-auto">
        <p className="text-justify px-5 py-5 leading-8 font-Inter">
          Program Khidmah Kelestarian Lingkungan dilakukan melalui Program
          Pengelolaan limbah terpadu, bantuan tempat sampah dan sedekah tanaman
          di daerah rawan bencana.
        </p>
      </div>
    </>
  );
}
