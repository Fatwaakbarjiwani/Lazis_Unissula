import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/navbar&footer/Header";
import Footer from "../../components/navbar&footer/Footer";
import { getDetailSummary } from "../../redux/actions/informasiAction";

export default function Penghimpunan() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.informasi);

  useEffect(() => {
    dispatch(getDetailSummary("penghimpunan"));
  }, [dispatch]);

  const formatNumber = (number) => {
    return number.toLocaleString("id-ID");
  };

  const penghimpunanData = data.penghimpunan || [];
  const totalAmount = penghimpunanData.reduce(
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
                Penghimpunan Dana
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transparansi dalam pengumpulan dana zakat, infak, sedekah, dan
                wakaf untuk kemaslahatan umat
              </p>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Statistik Penghimpunan
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
                      Total Penghimpunan
                    </div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {penghimpunanData.length}
                    </div>
                    <div className="text-gray-600 text-sm">Program Aktif</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {
                        penghimpunanData.filter((item) => item.amount > 0)
                          .length
                      }
                    </div>
                    <div className="text-gray-600 text-sm">Program Berdana</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      100%
                    </div>
                    <div className="text-gray-600 text-sm">Transparansi</div>
                  </div>
                </div>
              )}
            </div>

            {/* Jenis Penghimpunan */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Jenis Penghimpunan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Zakat
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Zakat fitrah dan zakat mal yang dikumpulkan dari muzakki
                    untuk disalurkan kepada mustahik sesuai ketentuan syariah.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Infak
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sumbangan sukarela yang diberikan oleh umat Islam untuk
                    kepentingan umum dan kemaslahatan umat.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Sedekah
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pemberian sukarela yang dilakukan oleh seseorang kepada
                    orang lain, terutama kepada orang-orang miskin.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Wakaf
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pemberian harta benda yang tahan lama untuk kepentingan umum
                    dengan cara menahan pokoknya dan menggunakan hasilnya.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Program Penghimpunan */}
            {!loading && !error && penghimpunanData.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Program Penghimpunan
                </h2>
                <div className="space-y-4">
                  {penghimpunanData.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Program pengumpulan dana untuk berbagai kegiatan
                            sosial dan keagamaan
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">
                            Rp {formatNumber(item.amount)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.amount > 0 ? "Terkumpul" : "Belum ada dana"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transparansi */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Prinsip Transparansi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Akuntabel
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Setiap rupiah yang masuk dan keluar tercatat dengan detail
                    dan dapat dipertanggungjawabkan.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Transparan
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Laporan keuangan dan program disampaikan secara terbuka dan
                    mudah diakses publik.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Profesional
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pengelolaan dana dilakukan dengan standar profesional dan
                    sesuai prinsip syariah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
