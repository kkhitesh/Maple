import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiPlus, BiPlusCircle } from "react-icons/bi";
import { db } from "../config/firebase";

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onClose: () => void;
  user: any;
}

const EditProfileModal = (props: Props) => {
  const { showModal, setShowModal, onClose, user } = props;
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const postsRef = collection(db, "posts");
  const userRef = doc(db, "users", user?.uid);

  // const uploadPost = async () => {
  //   setLoading(true);
  //   const res = await addDoc(postsRef, {
  //     caption: caption,
  //     username: user?.displayName,
  //     userId: user?.uid,
  //     userImg: user?.photoURL,
  //     timestamp: serverTimestamp(),
  //     likes: [],
  //     comments: [],
  //   });
  //   console.log("Posted Successfully", res.id);
  //   setCaption("");
  //   setLoading(false);
  //   setShowModal(false);
  // };

  const updateBio = async () => {
    await updateDoc(userRef, {
      bio: bio,
    }).then(() => setShowModal(false));
  };

  return (
    <>
      {showModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.5)] outline-none focus:outline-none"
          onClick={onClose}
        >
          <div
            className="relative my-6 mx-auto w-auto max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex w-[40vw] flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 ">
                <button
                  className="float-right border-0 bg-transparent text-black"
                  onClick={() => setShowModal(false)}
                >
                  <BiPlus size={24} className="rotate-45" />
                </button>
              </div>
              <div className="relative flex gap-5 px-6 py-1">
                <img
                  className="h-12 w-12 rounded-full"
                  src={user?.photoURL || ""}
                  alt="img"
                />
                <input
                  type="text"
                  placeholder={`What's on your mind, ${user?.displayName}?`}
                  className="w-full border-transparent caret-brand/60 focus:border-transparent focus:outline-none focus:ring-0"
                  autoFocus={true}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between p-6">
                <input type="file" className="hidden" id="ip" />
                <label htmlFor="ip">
                  <BiPlusCircle
                    size={32}
                    className="text-brand/70 hover:text-brand"
                  />
                </label>
                <button
                  className="mr-1 mb-1 rounded-full bg-brand px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-yellow-700"
                  type="button"
                  onClick={updateBio}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditProfileModal;
