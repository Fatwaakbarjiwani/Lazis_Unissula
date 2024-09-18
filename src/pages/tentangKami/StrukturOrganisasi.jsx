import Struktur from "../assets/struktur.svg";

export default function StrukturOrganisasi() {
  return (
    <div className="my-6">
      <h1 className="flex items-center justify-center mb-4 font-Inter text-3xl font-bold">
        Struktur <span className="text-[#69C53E]">Organisasi</span>
      </h1>
      <div className="flex items-center justify-center">
        <img
          className="cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
          src={Struktur}
          alt="StrukturOrganisasi"
        />
      </div>
    </div>
  );
}
