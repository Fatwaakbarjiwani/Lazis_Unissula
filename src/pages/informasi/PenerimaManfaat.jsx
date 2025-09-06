import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/navbar&footer/Header";
import Footer from "../../components/navbar&footer/Footer";
import { getDetailSummary } from "../../redux/actions/informasiAction";

export default function PenerimaManfaat() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.informasi);

  useEffect(() => {
    dispatch(getDetailSummary("penerima-manfaat"));
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const penerimaData = data["penerima-manfaat"] || [];

  return (
    <div className="font-Inter">
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Penerima Manfaat
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Melihat dampak nyata dari setiap donasi yang telah disalurkan
                kepada mereka yang membutuhkan
              </p>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Statistik Penerima Manfaat
              </h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Memuat data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">Error: {error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {penerimaData.length}
                    </div>
                    <div className="text-gray-600">Total Penerima</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      100%
                    </div>
                    <div className="text-gray-600">Transparansi</div>
                  </div>
                </div>
              )}
            </div>

            {/* Data Penerima Manfaat */}
            {!loading && !error && penerimaData.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Data Penerima Manfaat
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {penerimaData.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.receiver}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.receiver}
                      </h3>
                      <p className="text-sm text-gray-600">
                        <strong>Tanggal Penyaluran:</strong>{" "}
                        {formatDate(item.distributionDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
