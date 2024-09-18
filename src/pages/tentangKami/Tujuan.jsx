import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function Tujuan() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setButtonPage("tentangkami"));
    }, []);
  return (
    <>
      <h1 className="font-bold text-3xl mt-10 text-center text-primary mb-6">Tujuan</h1>
      <div className="flex items-center justify-center sm:w-10/12 md:w-3/4 lg:w-4/5 mx-auto">
        <ul className="sm:w-9/12 lg:w-4/5 list-decimal ml-5 list-outside text-justify px-3 pb-3 leading-8 font-Inter">
          <li>
            Terciptanya kemandirian kaum Dhuafa melalui program pemberdayaan.
          </li>
          <li>Tergugahnya kesadaran kaum agniya untuk peduli dengan Dhuafa.</li>
          <li>
            Berkembangnya manfaat ZIS secara maksimal melalui program-program
            strategis.
          </li>
          <li>
            Terwujudnya masyarakat berkasih sayang yang penuh ampunan Allah dan
            mengembangkan kehidupan sosial yang berkeadilan, bermartabat, dan
            mulia yang diridai Allah, melalui peran solutif dalam mendayagunakan
            zakat, infaq, dan shodaqah sesuai ketentuan syariah Islam secara
            amanah dan profesional.
          </li>
        </ul>
      </div>
    </>
  );
}
