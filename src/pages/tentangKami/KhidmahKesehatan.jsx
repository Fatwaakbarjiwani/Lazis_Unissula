import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import { getLiteraturByName } from "../../redux/actions/literaturAction";
import { Commet } from "react-loading-indicators";

export default function KhidmahKesehatan() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.literatur);

  useEffect(() => {
    dispatch(setButtonPage("tentangkami"));
    dispatch(getLiteraturByName("khidmah kesehatan"));
  }, [dispatch]);

  // Ambil data pertama dari array response
  const literaturData = data && data.length > 0 ? data[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#69C53E] to-green-600 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h1 className="font-bold text-4xl md:text-5xl text-gray-800 mb-4">
              Khidmah Bidang <span className="text-[#69C53E]">Kesehatan</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pelayanan kesehatan yang komprehensif untuk kesejahteraan umat
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="loader mb-4">
                <Commet
                  color="#69C53E"
                  size="medium"
                  text="Memuat data..."
                  textColor="#69C53E"
                />
              </div>
              <p className="text-gray-600">
                Sedang memuat informasi Khidmah Kesehatan...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(getLiteraturByName("khidmah kesehatan"))}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : literaturData ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Content Header */}
            <div className="bg-gradient-to-r from-[#69C53E] to-green-600 px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {literaturData.literaturName}
                  </h2>
                  <p className="text-green-100">
                    Informasi lengkap tentang program kesehatan
                  </p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8">
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-[#69C53E] prose-ul:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: literaturData.text }}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Terakhir diperbarui
                </div>
                <div className="flex items-center gap-2 text-sm text-[#69C53E] font-medium">
                  <svg
                    className="w-4 h-4"
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
                  Data Terverifikasi
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Data Tidak Tersedia
            </h3>
            <p className="text-yellow-600">
              Informasi tentang Khidmah Kesehatan belum tersedia saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
