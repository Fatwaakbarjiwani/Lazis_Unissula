import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/navbar&footer/Header";
import Footer from "../../components/navbar&footer/Footer";
import { getDetailSummary } from "../../redux/actions/informasiAction";

export default function Donatur() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.informasi);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getDetailSummary("donatur"));
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

  const donaturData = data.donatur || [];
  const totalAmount = donaturData.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );
  const uniqueDonors = [...new Set(donaturData.map((item) => item.username))]
    .length;

  // Pagination logic
  const totalPages = Math.ceil(donaturData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = donaturData.slice(startIndex, endIndex);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  return (
    <div className="font-Inter">
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Donatur</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Para dermawan yang telah berpartisipasi dalam program zakat,
                infak, sedekah, dan wakaf
              </p>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Statistik Donatur
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
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {uniqueDonors}
                      </div>
                      <div className="text-gray-600">Total Donatur</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {donaturData.length}
                      </div>
                      <div className="text-gray-600">Total Transaksi</div>
                    </div>
                  </div>
                  <div className="text-center mt-4 p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      Rp {formatNumber(totalAmount)}
                    </div>
                    <div className="text-gray-600">Total Donasi</div>
                  </div>
                </>
              )}
            </div>

            {/* Kategori Donatur */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Donatur Individu
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Masyarakat umum
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Profesional dan karyawan
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Pengusaha dan wirausaha
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Mahasiswa dan pelajar
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Donatur Korporasi
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Perusahaan swasta
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    BUMN dan BUMD
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Bank dan lembaga keuangan
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Organisasi dan yayasan
                  </li>
                </ul>
              </div>
            </div>

            {/* Program Donatur */}
            {/* <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Program Khusus Donatur
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Donatur Rutin
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Program donasi berkala dengan kemudahan pembayaran otomatis.
                  </p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Donatur Korporasi
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Program khusus untuk perusahaan dengan benefit CSR dan
                    laporan khusus.
                  </p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Donatur VIP
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Program eksklusif untuk donatur dengan kontribusi besar dan
                    benefit khusus.
                  </p>
                </div>
              </div>
            </div> */}

            {/* Testimonial Donatur */}
            {/* <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Testimoni Donatur
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 italic mb-4">
                    "Alhamdulillah, dengan berdonasi melalui Lazis Sultan Agung,
                    saya merasa lebih tenang karena dana yang saya berikan
                    dikelola dengan transparan dan tepat sasaran."
                  </p>
                  <div className="text-sm text-gray-600">
                    <strong>Bapak Budi Santoso</strong> - Donatur Rutin
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 italic mb-4">
                    "Sebagai perusahaan, kami percaya dengan program CSR melalui
                    Lazis Sultan Agung. Laporan yang transparan dan dampak yang
                    nyata membuat kami yakin."
                  </p>
                  <div className="text-sm text-gray-600">
                    <strong>PT. Maju Jaya</strong> - Donatur Korporasi
                  </div>
                </div>
              </div>
            </div> */}

            {/* Data Donatur Terbaru */}
            {!loading && !error && donaturData.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                    Data Donatur Terbaru
                  </h2>

                  {/* Items per page selector */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Tampilkan:</label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) =>
                        handleItemsPerPageChange(Number(e.target.value))
                      }
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>
                    <span className="text-sm text-gray-600">per halaman</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentData.map((item, index) => (
                    <div
                      key={startIndex + index}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.username}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(item.transactionDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            Rp {formatNumber(item.amount)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-600 mb-4 md:mb-0">
                      Menampilkan {startIndex + 1} -{" "}
                      {Math.min(endIndex, donaturData.length)} dari{" "}
                      {donaturData.length} data
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Previous button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md text-sm ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        Sebelumnya
                      </button>

                      {/* Page numbers */}
                      <div className="flex space-x-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => {
                          // Show first page, last page, current page, and pages around current page
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 rounded-md text-sm ${
                                  currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2 text-gray-400">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Next button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md text-sm ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cara Bergabung */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Cara Bergabung Sebagai Donatur
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Daftar
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Registrasi sebagai donatur melalui website atau aplikasi.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Pilih Program
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Tentukan program donasi yang sesuai dengan keinginan Anda.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">
                      3
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Donasi
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Lakukan donasi melalui channel pembayaran yang tersedia.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      4
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Laporan
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Terima laporan penyaluran dan dampak donasi Anda.
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
