import { IoChatbubbleOutline } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Hotline() {

    return (
        <div className="fixed bottom-14 right-2 z-50 flex items-center space-x-2">
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