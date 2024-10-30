import { useState, useEffect } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Hotline() {
    const [displayedText, setDisplayedText] = useState("");
    const [showMessage, setShowMessage] = useState(true);
    const message = "Ada yang bisa kami bantu?...";

    useEffect(() => {
        let index = 0;
        setDisplayedText(""); // Reset teks sebelum memulai efek pengetikan
        const typingSpeed = 100; // Kecepatan mengetik dalam ms

        const typingEffect = setInterval(() => {
            if (index < message.length) {
                setDisplayedText((prev) => prev + message.charAt(index));
                index++;
            } else {
                clearInterval(typingEffect);
                // Sembunyikan pesan setelah 3 detik
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000); // 3000ms = 3 detik
            }
        }, typingSpeed);

        return () => clearInterval(typingEffect); // Bersihkan interval saat komponen di-unmount
    }, []);

    return (
        <div className="fixed bottom-14 right-2 z-50 flex items-center space-x-2">
            {showMessage && (
                <div className="bg-green-700 text-white rounded-lg shadow-lg w-4/5 text-left p-2">
                    {displayedText}
                </div>
            )}
            <a 
                href="https://wa.link/oiw3fz" 
                target="_blank" 
                rel="noopener noreferrer">

                <div
                    className="fixed w-12 h-12 bottom-6 right-4 z-50 bg-green-700 border border-slate-200 text-white rounded-full drop-shadow-2xl shadow-2xl shadow-black cursor-pointer flex items-center justify-center hover:bg-black hover:text-green-500 hover:border-green-500"
                    title="Hotline"
                    >
                    <IoChatbubbleOutline size={37} className="absolute hover:text-green-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BsFillTelephoneFill size={18} />
                    </div>
                </div>
            </a>

        </div>
    )
}