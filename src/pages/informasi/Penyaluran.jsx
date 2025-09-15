import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/navbar&footer/Header";
import Footer from "../../components/navbar&footer/Footer";
import { getDetailSummary } from "../../redux/actions/informasiAction";

export default function Penyaluran() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.informasi);

  useEffect(() => {
    dispatch(getDetailSummary("penyaluran"));
  }, [dispatch]);

  const formatNumber = (number) => {
    return number.toLocaleString("id-ID");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const penyaluranData = data.penyaluran || [];
  const totalAmount = penyaluranData.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  return (
    <div className="font-Inter">
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Penyaluran Dana
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Distribusi dana zakat, infak, sedekah, dan wakaf kepada mustahik
                dengan prinsip keadilan dan kemaslahatan
              </p>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Statistik Penyaluran
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      Rp {formatNumber(totalAmount)}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Total Disalurkan
                    </div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {penyaluranData.length}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Program Penyaluran
                    </div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      100%
                    </div>
                    <div className="text-gray-600 text-sm">Transparansi</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      95%
                    </div>
                    <div className="text-gray-600 text-sm">Efisiensi</div>
                  </div>
                </div>
              )}
            </div>

            {/* Asnaf Zakat
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                8 Asnaf Penerima Zakat
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-blue-800 mb-2">
                    Fakir
                  </div>
                  <div className="text-sm text-gray-600">
                    Orang yang tidak memiliki harta
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-green-800 mb-2">
                    Miskin
                  </div>
                  <div className="text-sm text-gray-600">
                    Orang yang memiliki harta sedikit
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-purple-800 mb-2">
                    Amil
                  </div>
                  <div className="text-sm text-gray-600">Pengurus zakat</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-orange-800 mb-2">
                    Muallaf
                  </div>
                  <div className="text-sm text-gray-600">
                    Orang yang baru masuk Islam
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-red-800 mb-2">
                    Riqab
                  </div>
                  <div className="text-sm text-gray-600">
                    Budak yang ingin merdeka
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-indigo-800 mb-2">
                    Gharim
                  </div>
                  <div className="text-sm text-gray-600">
                    Orang yang berhutang
                  </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-pink-800 mb-2">
                    Fi Sabilillah
                  </div>
                  <div className="text-sm text-gray-600">
                    Berjuang di jalan Allah
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-teal-800 mb-2">
                    Ibnu Sabil
                  </div>
                  <div className="text-sm text-gray-600">
                    Musafir yang kehabisan bekal
                  </div>
                </div>
              </div>
            </div> */}

            {/* Data Penyaluran */}
            {!loading && !error && penyaluranData.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Data Penyaluran
                </h2>
                <div className="space-y-6">
                  {penyaluranData.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex flex-col md:flex-row gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full md:w-48 h-48 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <div
                            className="text-gray-600 mb-4 prose prose-sm max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-3 prose-strong:text-blue-600 prose-strong:font-semibold prose-ul:text-gray-600 prose-li:text-gray-600 prose-ol:text-gray-600 prose-li:leading-relaxed prose-li:mb-1 prose-ul:pl-4 prose-ol:pl-4 prose-ul:mb-3 prose-ol:mb-3"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Jumlah Penyaluran
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                Rp {formatNumber(item.amount)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Tanggal Penyaluran
                              </p>
                              <p className="text-lg font-semibold text-gray-800">
                                {formatDate(item.distributionDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
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
