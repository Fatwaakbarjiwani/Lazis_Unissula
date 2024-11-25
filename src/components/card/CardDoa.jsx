import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import user from "../../assets/user.svg";

// CardDoa component
function CardDoa({ nama, waktu, judul, ucapan }) {
  return (
    <div
      className={`${
        ucapan == "" ? "hidden" : "flex"
      } bg-second p-2 shadow-md rounded-2xl h-full   flex-col justify-between m-1 min-w-[250px]`}
    >
      <div className="flex items-center gap-2">
        <img src={user} alt="User" />
        <div>
          <h3 className="text-xs sm:text-base font-semibold text-gray-800">
            {nama}
          </h3>
          <p className="text-[10px] sm:text-xs">{waktu}</p>
        </div>
      </div>
      <p className="text-xs sm:text-base font-semibold text-gray-700">{ucapan}</p>
      <p className="text-xs font-medium sm:text-xs text-green-800 line-clamp-1">
        {judul}
      </p>
    </div>
  );
}

CardDoa.propTypes = {
  nama: PropTypes.string,
  waktu: PropTypes.string,
  judul: PropTypes.string,
  ucapan: PropTypes.string,
  aamiin: PropTypes.number,
};

// DoaList component with auto-scrolling and infinite loop
function DoaList({ allMessage }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  // Adjust the scroll speed as needed
  const scrollSpeed = 1;

  // Duplicate the messages array to simulate infinite scrolling
  const messagesToRender = [...allMessage, ...allMessage];

  useEffect(() => {
    const scroll = () => {
      setScrollPosition((prev) => prev + scrollSpeed);
    };

    const interval = setInterval(scroll, 16); // 16ms for smooth 60fps scrolling

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalWidth = scrollRef.current?.scrollWidth / 2; // half of the duplicated list

    // Reset position to the start of the list once it has scrolled halfway through
    if (scrollPosition >= totalWidth) {
      setScrollPosition(0);
    }
  }, [scrollPosition]);

  return (
    <div className="overflow-hidden w-full flex items-center">
      <div
        ref={scrollRef}
        className="flex"
        style={{
          transform: `translateX(-${scrollPosition}px)`,
          whiteSpace: "nowrap",
        }}
      >
        {messagesToRender.map((item, index) => (
          <CardDoa
            key={`${item?.id}-${index}`}
            nama={item?.username}
            judul={item?.campaign?.campaignName}
            waktu={item?.messagesDate}
            ucapan={item?.messages}
          />
        ))}
      </div>
    </div>
  );
}

DoaList.propTypes = {
  allMessage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      campaign: PropTypes.shape({
        campaignName: PropTypes.string,
      }),
      messagesDate: PropTypes.string,
      messages: PropTypes.string,
      aamiin: PropTypes.number,
    })
  ),
};

export default DoaList;
