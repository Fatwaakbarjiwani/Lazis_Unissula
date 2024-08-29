import header from "../../assets/header.svg";
import contoh from "../../assets/contoh.jpg";
import lengkung from "../../assets/lengkung.svg";
import lengkung2 from "../../assets/lengkung2.svg";
import lengkung1 from "../../assets/lengkung1.svg";
import iconnavbar from "../../assets/iconnavbar.svg";
import Information from "../../components/bar/Information";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../../components/card/Card";
import data from "./data";
import doaData from "./doa";
import CardDoa from "../../components/card/CardDoa";
import Footer from "../../components/navbar&footer/Footer";

export default function HomePage() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsive2 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="font-Inter">
      {/* Header */}
      <div
        className="flex justify-center pb-12 lg:h-[80vh] "
        style={{
          backgroundImage: `url(${header})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <div className="flex justify-center w-5/6 items-center gap-5">
          <div className="w-1/2">
            <img src={iconnavbar} alt="" className="w-full md:w-[90%]" />
          </div>
          <div className="w-full md:w-3/4">
            <h1
              className="font-Montserrat mt-2 sm:mt-0 text-white font-[900] text-xs sm:text-xl md:text-2xl lg:text-4xl text-stroke lg:text-stroke2"
            >
              Lorem ipsum dolor sit amet consectetur. Volutpat et ut scelerisque
              nunc aliquam.
            </h1>
            <p className="text-white text-[10px] md:text-xl w-5/6 md:mt-4 mt-1 sm:mt-2">
              Lorem ipsum dolor sit amet consectetur. Volutpat et ut scelerisque
              nunc aliquam.
            </p>
            <button className="m:w-3/6 w-2/6 h-4 mt-1 sm:mt-2 bg-white rounded-full md:h-8 md:mt-4"></button>
          </div>
        </div>
      </div>
      {/* information */}
      <Information />
      <div className="mx-[80px]">
        {/* slider */}
        <div className="mt-36 font-bold text-gray-600 text-4xl space-y-4">
          <h1>Donasi Darurat</h1>
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1500}
            autoPlay
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="z-20"
          >
            <div className="flex justify-center">
              <div className="realtive w-5/6">
                <div>
                  <img className="absolute h-80 " src={lengkung} alt="" />
                  <img className="absolute h-80 z-20" src={lengkung1} alt="" />
                  <img className="absolute h-80 z-10" src={lengkung2} alt="" />
                  <div className="absolute z-30 p-4 w-2/6 h-full">
                    <div className="flex h-full flex-col justify-between">
                      <h5 className="text-3xl text-white">
                        Ratusan Juta Rupiah Disalurkan NU Peduli pada Tahap
                        Kedua Bantuan ke Daerah Terdampak Banjir Demak
                      </h5>
                      <button className="bg-white p-1 px-4 text-lg rounded-full w-4/6">
                        Bantu Sekarang
                      </button>
                    </div>
                  </div>
                </div>
                <img
                  src="https://www.shutterstock.com/image-photo/young-adult-female-campaigner-shouting-600nw-2334195193.jpg"
                  className="h-80 w-full rounded-2xl object-cover object-center"
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="realtive w-5/6">
                <div>
                  <img className="absolute h-80 " src={lengkung} alt="" />
                  <img className="absolute h-80 z-20" src={lengkung1} alt="" />
                  <img className="absolute h-80 z-10" src={lengkung2} alt="" />
                  <div className="absolute z-30 p-4 w-2/6 h-full">
                    <div className="flex h-full flex-col justify-between">
                      <h5 className="text-3xl text-white">
                        Bantuan bahan logistik telah tersalurkan kepada korban
                        bencana banjir di demak
                      </h5>
                      <button className="bg-white p-1 px-4 text-lg rounded-full w-4/6">
                        Bantu Sekarang
                      </button>
                    </div>
                  </div>
                </div>
                <img
                  src={contoh}
                  className="h-80 w-full rounded-2xl object-cover object-center"
                  alt=""
                />
              </div>
            </div>
          </Carousel>
        </div>
        {/* Campaign */}
        <h1 className="font-bold text-4xl text-gray-600 mt-8 mb-4">
          Rekomendasi Kegiatan
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {data.slice(0, 6).map((item) => (
            <>
              <Card key={item.campaignCode} item={item} />
            </>
          ))}
        </div>
        {/* doa doa */}
        <div>
          <h1 className="font-bold text-4xl text-gray-600 mt-8">
            Doa-Doa Orang Baik
          </h1>
          <Carousel responsive={responsive2} className="py-4 z-10">
            {doaData.map((item) => (
              <>
                <CardDoa
                  key={item.nama}
                  nama={item.nama}
                  judul={item.judul}
                  waktu={item.waktu}
                  ucapan={item.ucapan}
                />
              </>
            ))}
          </Carousel>
        </div>
      </div>
      <Footer />
    </div>
  );
}
