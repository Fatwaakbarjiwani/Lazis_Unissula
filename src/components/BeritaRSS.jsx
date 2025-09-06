import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function BeritaRSS() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const fetchRSSFeed = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try multiple CORS proxies in case one fails
      const proxies = [
        "https://api.allorigins.win/raw?url=",
        "https://cors-anywhere.herokuapp.com/",
        "https://thingproxy.freeboard.io/fetch/",
      ];

      const rssUrl = "https://sadar.co.id/feed/";
      let response = null;
      let xmlText = null;

      // Try each proxy until one works
      for (const proxy of proxies) {
        try {
          const fullUrl =
            proxy === "https://cors-anywhere.herokuapp.com/"
              ? proxy + rssUrl
              : proxy + encodeURIComponent(rssUrl);

          response = await fetch(fullUrl, {
            headers: {
              Origin: window.location.origin,
            },
          });

          if (response.ok) {
            xmlText = await response.text();
            break;
          }
        } catch (err) {
          console.log(`Proxy ${proxy} failed:`, err);
          continue;
        }
      }

      if (!xmlText) {
        throw new Error("Semua proxy CORS gagal. Silakan coba lagi nanti.");
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      // Check for parsing errors
      const parseError = xmlDoc.querySelector("parsererror");
      if (parseError) {
        throw new Error("Gagal memparse RSS feed. Format tidak valid.");
      }

      // Try different RSS item selectors
      let items = xmlDoc.querySelectorAll("item");
      if (items.length === 0) {
        // Try alternative selectors for different RSS formats
        items =
          xmlDoc.querySelectorAll("entry") ||
          xmlDoc.querySelectorAll("article");
      }

      if (items.length === 0) {
        throw new Error("Tidak ada item berita yang ditemukan dalam RSS feed.");
      }

      const parsedNews = Array.from(items).map((item, index) => {
        // Try multiple selectors for different RSS formats
        const title =
          item.querySelector("title")?.textContent ||
          item.querySelector("name")?.textContent ||
          "No Title";

        const description =
          item.querySelector("description")?.textContent ||
          item.querySelector("summary")?.textContent ||
          item.querySelector("content")?.textContent ||
          "No Description";

        const link =
          item.querySelector("link")?.textContent ||
          item.querySelector("url")?.textContent ||
          "#";

        const pubDate =
          item.querySelector("pubDate")?.textContent ||
          item.querySelector("published")?.textContent ||
          item.querySelector("updated")?.textContent ||
          "";

        const category = item.querySelector("category")?.textContent || "News";

        // Clean description (remove HTML tags)
        const cleanDescription = description
          ? description.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
          : "Tidak ada deskripsi tersedia.";

        // Format date
        let formattedDate = "";
        if (pubDate) {
          try {
            const date = new Date(pubDate);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            }
          } catch (err) {
            console.log("Date parsing error:", err);
          }
        }

        return {
          id: index,
          title: title.trim(),
          description: cleanDescription,
          link: link.trim(),
          pubDate: formattedDate,
          category: category.trim(),
        };
      });

      setNews(parsedNews);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error("Error fetching RSS feed:", err);

      // If it's a CORS or network error and we haven't retried too many times
      if (
        retryCount < 2 &&
        (err.message.includes("CORS") || err.message.includes("fetch"))
      ) {
        setRetryCount((prev) => prev + 1);
        setError("Gagal memuat berita. Mencoba lagi dalam 5 detik...");

        // Auto-retry after 5 seconds
        setTimeout(() => {
          fetchRSSFeed();
        }, 5000);

        return;
      }

      setError(err.message || "Gagal memuat berita. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRetryCount(0);
    fetchRSSFeed();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="ml-3 text-gray-600">
          {retryCount > 0
            ? `Mencoba lagi... (${retryCount}/3)`
            : "Memuat berita..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4 max-w-md mx-auto">{error}</div>
        <button
          onClick={handleRefresh}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-gray-600 sm:mt-8 text-left">
            BERITA TERKINI
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Berita dari Sadar.co.id • Total: {news.length} berita
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleRefresh}
            className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Tidak ada berita yang tersedia saat ini.
        </div>
      ) : (
        <div className="mt-8">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="news-swiper"
          >
            {news.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {item.category}
                      </span>
                      {item.pubDate && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {item.pubDate}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 flex-grow">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {item.description}
                    </p>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:underline mt-auto"
                    >
                      Baca Selengkapnya
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
