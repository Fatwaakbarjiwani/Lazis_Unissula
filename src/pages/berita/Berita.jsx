import berita from "../../assets/berita.jpg";
export default function Berita() {
  return (
    <div>
      <div
        className="h-[70vh] relative flex items-end"
        style={{
          backgroundImage: `url(${berita})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent h-[50vh] w-full"></div>
        <h1 className="relative font-bold text-white text-4xl mb-20 z-50 mx-20">
          Ratusan Juta Rupiah Disalurkan Peduli pada Tahap Kedua Bantuan ke
          Daerah Terdampak Banjir Demak
          <div className="z-20 absolute top-0 w-2/6 h-10 bg-gradient-to-r from-orange-500 to-transparent"></div>
        </h1>
      </div>
    </div>
  );
}
