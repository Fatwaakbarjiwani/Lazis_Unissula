import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-xl mt-4">Maaf, halaman yang Anda cari tidak ada.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Kembali ke Halaman Utama
      </button>
    </div>
  );
};

export default PageNotFound;
