import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import { BiSolidRightArrow } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBerita,
  getDetailBerita,
} from "../../redux/actions/beritaAction";
import CardBerita from "../../components/card/CardBerita";
import Footer from "../../components/navbar&footer/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { setButtonPage } from "../../redux/reducers/pageReducer";

export default function DetailBerita() {
  const { id } = useParams();
  const { detailBerita } = useSelector((state) => state.berita);
  const { allBerita } = useSelector((state) => state.berita);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (id) {
      dispatch(getDetailBerita(id)).then(() => setLoading(false));
      dispatch(getAllBerita(0));
      window.scrollTo(0, 0);
    }
    dispatch(setButtonPage("detailBerita"));

  }, [id, dispatch]);

  return (
    <>
      <div className="m-4 sm:mx-8 flex flex-col items-center">
        {loading ? (
          <Skeleton
            height={300}
            width={600}
            direction="ltr"
            enableAnimation={true}
          />
        ) : (
          <div className="rounded-md drop-shadow-lg flex items-center justify-center">
            <img
              className="w-full sm:h-96 sm:w-5/6 rounded-md object-cover"
              src={detailBerita?.newsImage}
              alt="berita"
            />
          </div>
        )}

        <div className="mt-6 w-full">
          {loading ? (
            <Skeleton width={"75%"} height={40} />
          ) : (
            <h1 className="mx-auto sm:m-0 text-left text-gray-700 font-bold sm:w-3/4 text-xl md:text-3xl">
              {detailBerita?.title}
            </h1>
          )}

          {loading ? (
            <Skeleton width={"20%"} height={20} />
          ) : (
            <div className="flex mt-3">
              <p className="flex items-center text-slate-600">Bagikan berita</p>
              <a href="http://">
                <div className="ml-2 rounded-full w-8 h-8 bg-black hover:bg-white flex items-center justify-center cursor-pointer hover:text-black hover:border hover:border-black transform transition-transform duration-300 ease-in-out hover:scale-100">
                  <FaXTwitter className="text-white hover:text-black w-5 h-5 cursor-pointer" />
                </div>
              </a>
              <a href="http://">
                <div className="ml-2 rounded-full w-8 h-8 bg-black hover:bg-white flex items-center justify-center cursor-pointer hover:text-blue-800 hover:border hover:border-blue-800 transform transition-transform duration-300 ease-in-out hover:scale-100">
                  <FaFacebook className="text-white hover:text-blue-800 w-5 h-5 cursor-pointer" />
                </div>
              </a>
              <a href="http://">
                <div className="ml-2 rounded-full w-8 h-8 bg-black hover:bg-gradient-to-b from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center cursor-pointer hover:text-blue-800 transform transition-transform duration-300 ease-in-out hover:scale-100">
                  <FaInstagram className="text-white hover:text-white w-5 h-5 cursor-pointer" />
                </div>
              </a>
              <p className="flex items-center ml-2 font-semibold text-teal-800">
                {loading ? <Skeleton width={80} /> : "24/12/2023"}
              </p>
            </div>
          )}

          <div className="mt-5 w-full">
            {loading ? (
              <Skeleton count={3} />
            ) : (
              <p className="text-justify font-Inter text-gray-600">
                {detailBerita?.content}
              </p>
            )}
          </div>

          <div className="mt-5 w-full flex justify-between sm:text-lg">
            <Link to={"/berita/Berita/1"}>
              <p className="font-inter font-semibold text-teal-800 hover:translate-y-[-5px] duration-200 cursor-pointer">
                Berita Lainnya
              </p>
            </Link>
            {id < allBerita.length && (
              <Link to={`/detailBerita/${parseInt(id, 10) + 1}`}>
                <p className="font-semibold text-teal-800 hover:translate-y-[-5px] duration-200 cursor-pointer">
                  Selanjutnya <BiSolidRightArrow className="inline-block" />
                </p>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
            {loading
              ? Array(4)
                  .fill()
                  .map((_, index) => <Skeleton key={index} height={200} />)
              : allBerita.map((item) => (
                  <Link to={`/detailBerita/${item?.id}`} key={item?.id}>
                    <CardBerita
                      image={item?.newsImage}
                      judul={item?.title}
                      tanggal={item?.date}
                      content={item?.content}
                    />
                  </Link>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
