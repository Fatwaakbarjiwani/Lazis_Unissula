import { useDispatch } from "react-redux";
import Struktur from "../../assets/SOTK.jpg";
import { useEffect } from "react";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function StrukturOrganisasi() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setButtonPage("tentangkami"));
    }, []);
  return (
    <div className="my-6">
      <h1 className="flex items-center text-gray-600 justify-center mb-4 font-Inter text-3xl font-bold">
        Struktur <span className="text-[#69C53E]">Organisasi</span>
      </h1>
      <div className="flex items-center justify-center">
        <img
          className="cursor-pointer w-[80%]"
          src={Struktur}
          alt="StrukturOrganisasi"
        />
      </div>
    </div>
  );
}
