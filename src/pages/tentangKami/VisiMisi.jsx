export default function VisiMisi() {
  return (
    <>
      <h1 className="font-bold text-3xl mt-16 text-gray-700 mb-6">
        Visi <span className="text-[#69C53E]">Misi</span>
      </h1>
      <div className="flex items-center justify-center sm:w-10/12 md:w-3/4 lg:w-4/5 mx-auto">
        <div className="flex-col">
          <h2 className="text-start text-md text-gray-700 ml-5 font-Inter font-semibold">
            Visi
          </h2>
          <p className="text-justify px-5 py-1 leading-8 font-Inter">
            Lembaga amil zakat yang amanah dan profesional dilandasi nilai-nilai
            Islam dalam rangka mewujudkan kesejahteraan dan kemandirian umat
            yang dirahmati Allah SWT.
          </p>
          <h2 className="text-start text-md text-gray-700 ml-5 mt-5 font-Inter font-semibold">
            Misi
          </h2>
          <ul className="list-decimal list-outside ml-5 text-justify px-5 py-1 leading-8 font-Inter">
            <li>
              Mengentaskan kaum dhuafa dari belenggu kemiskinan menuju
              kemandirian.
            </li>
            <li>
              Menggugah kesadaran kaum agniya untuk peduli dan mencintai saudara
              mereka yang lebih lemah dan tak berdaya.
            </li>
            <li>
              Mengembangkan manfaat ZIS secara maksimal melalui program-program
              strategis.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
