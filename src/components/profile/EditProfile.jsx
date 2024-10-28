import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { editProfileUser } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";
import { OrbitProgress } from "react-loading-indicators";

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const { ps } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [kalimat, setKalimat] = useState("Masukkan password lama anda");
  const [profilePicture, setProfilePicture] = useState(null);
  const [toLogin, setToLogin] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [passwordChecking, setPasswordChecking] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePP = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSave = () => {
    setLoading(true);
    dispatch(
      editProfileUser(
        name,
        phoneNumber,
        email,
        null,
        profilePicture,
        address,
        setEdit,
        toLogin,
        navigate
      )
    ).finally(() => setLoading(false));
  };
  const handleCheck = () => {
    if (password == ps) {
      toast.success("Konfirmasi password berhasil");
      setKalimat("Masukkan password yang baru");
      setPasswordChecking(true);
      setPassword("");
    } else {
      toast.error("konfirmasi password salah");
      setPasswordChecking(false);
    }
  };
  const handleCreate = () => {
    {
      passwordChecking == true &&
        dispatch(
          editProfileUser(
            name,
            phoneNumber,
            email,
            password,
            profilePicture,
            address,
            setEdit,
            toLogin,
            navigate
          )
        );
    }
  };

  useEffect(() => {
    if (edit === true) {
      setPhoneNumber(user?.phoneNumber);
      setEmail(user?.email);
      setAddress(user?.address);
      setName(user?.username);
    } else {
      setProfilePicture(null);
      setEditPassword(false);
    }
  }, [user, edit]);
  useEffect(() => {
    if (
      email !== user?.email ||
      phoneNumber !== user?.phoneNumber ||
      password !== ""
    ) {
      setToLogin(true);
    } else {
      setToLogin(false);
    }
  }, [email, phoneNumber, password]);

  return (
    <div className="w-full md:w-5/6 lg:w-4/6 flex flex-col gap-4">
      <h1 className="font-bold text-xl text-gray-600">Ubah Profil</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative md:w-1/6">
          <img
            src={
              profilePicture ? URL.createObjectURL(profilePicture) : user?.image
            }
            className="bg-gray-200 rounded-full w-32 h-32 md:w-full md:h-20 object-cover border-2 border-gray-300"
            alt=""
          />
          {edit && (
            <label
              htmlFor="dropzone-file"
              className="absolute bottom-0 right-0"
            >
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handlePP}
              />
              <BiEdit className="text-3xl text-white bg-primary rounded-full p-1 hover:scale-105 duration-200" />
            </label>
          )}
        </div>
        <label className="w-full">
          <p className="text-sm">Nama</p>
          {edit ? (
            <input
              type="text"
              className="rounded-full border-2 p-2 w-full border-gray-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <p className="p-2 w-full border-b-2 border-gray-400">
              {user?.username}
            </p>
          )}
        </label>
      </div>
      <label className="w-full">
        <p className="text-sm">Nomor Handphone</p>
        {edit ? (
          <input
            type="text"
            className="rounded-full border-2 p-2 w-full border-gray-400 outline-none"
            value={phoneNumber}
            onChange={(e) => {
              // let inputValue = e.target.value.replace(/[^\d]/g, "");
              setPhoneNumber(e.target.value);
            }}
          />
        ) : (
          <p className="p-2 w-full border-b-2 border-gray-400">
            {user?.phoneNumber}
          </p>
        )}
      </label>
      <label className="w-full">
        <p className="text-sm">Email</p>
        {edit ? (
          <input
            type="email"
            className="rounded-full border-2 p-2 w-full border-gray-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p className="p-2 w-full border-b-2 border-gray-400">{user?.email}</p>
        )}
      </label>
      <label className="w-full">
        <p className="text-sm">Alamat</p>
        {edit ? (
          <input
            type="text"
            className="rounded-full border-2 p-2 w-full border-gray-400 outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        ) : (
          <p className="p-2 w-full border-b-2 border-gray-400">
            {user?.address ? user.address : "Belum diisi"}
          </p>
        )}
      </label>
      {edit && !editPassword && (
        <button
          onClick={() => setEditPassword(true)}
          className="rounded-full border-2 p-2 w-full border-primary font-bold text-primary outline-none mt-4 shadow hover:-translate-y-1 duration-300"
        >
          Edit Password
        </button>
      )}
      {edit && editPassword && (
        <label className="w-full">
          <p className="text-sm">{kalimat}</p>
          <div className="flex gap-1">
            <input
              type="text"
              className="rounded-full border-2 p-2 w-full border-gray-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => {
                passwordChecking === true ? handleCreate() : handleCheck();
              }}
            >
              <FaCheck className="p-2 text-3xl p-2 bg-primary font-bold text-white rounded-full shadow hover:scale-110 duration-200" />
            </button>
          </div>
        </label>
      )}
      {edit ? (
        <div className="flex flex-col items-center md:flex-row gap-2 mt-4">
          <button
            onClick={() => setEdit(false)}
            className="rounded-full border-2 p-2 w-full md:w-1/2 border-gray-500 font-bold text-white bg-gray-500 outline-none shadow hover:-translate-y-1 duration-300"
          >
            Batal
          </button>
          {isLoading ? (
            <div className="md:w-1/2 w-full flex justify-center">
              <OrbitProgress
                variant="dotted"
                color="#69c53e"
                text=""
                style={{ fontSize: "8px" }}
                textColor=""
              />
            </div>
          ) : (
            <button
              onClick={handleSave}
              className="rounded-full border-2 p-2 w-full md:w-1/2 border-primary font-bold text-white bg-primary outline-none shadow hover:-translate-y-1 duration-300"
            >
              Simpan
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => setEdit(true)}
          className="rounded-full border-2 p-2 w-full border-primary font-bold text-white bg-primary outline-none mt-4 shadow hover:-translate-y-1 duration-300"
        >
          Edit
        </button>
      )}
    </div>
  );
}
