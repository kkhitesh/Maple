import { FaCanadianMapleLeaf } from "react-icons/fa";
import hero from "../assets/hero.webp";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FeatureCard } from "../components/FeatureCard";
import { BiCrown, BiLineChart, BiLockAlt } from "react-icons/bi";
import {
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../config/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const [text, count] = useTypewriter({
    words: ["Network...", "Connect...", "Grow..."],
    loop: 0,
    delaySpeed: 2000,
  });

  const nav = useNavigate();
  const usersRef = collection(db, "users");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const docRef = doc(usersRef, result.user?.uid);
        const docSnap = getDoc(docRef).then((d) => {
          if (!d.exists()) {
            return setDoc(
              doc(usersRef, result.user?.uid),
              {
                username: result.user?.displayName,
                userId: result.user?.uid,
                userImg: result.user?.photoURL,
                bio: "Welcome to my Profile",
                bookmarks: [],
                followers: [],
                following: [],
              },
              { merge: true }
            );
          }
        });
      })
      .then(() => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const guestSignIn = () => {
    signInWithEmailAndPassword(auth, "guestuser@maple.com", "test1234")
      .then(() => {
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-[100vh] w-full overflow-y-auto">
      <header className="sticky top-0 flex h-[12%] items-center justify-between  bg-white p-5 pl-10">
        <h1 className="flex items-center gap-4 font-Montez text-4xl font-semibold md:mx-10">
          <FaCanadianMapleLeaf className="text-5xl text-brand" />
          <span className="block">Maple</span>
        </h1>
        <div className="text-md font-semibold md:mx-10">
          <button
            className="rounded-full border-2 border-brand bg-brand p-2 px-6 text-white duration-200 ease-in hover:border-brand/80 hover:bg-transparent hover:text-brand/80"
            onClick={signInWithGoogle}
          >
            Sign In
          </button>
          <button
            className="mx-5 hidden rounded-full border-2 border-brand/80 p-2 px-5 text-brand/80 duration-200 ease-in hover:bg-brand hover:text-white md:inline"
            onClick={guestSignIn}
          >
            Try Now
          </button>
        </div>
      </header>
      <section className="flex p-10 md:p-20 lg:mx-20">
        <div className="md:w-1/2">
          <div className="mb-10 hidden w-1/2 rounded-sm bg-black/80 p-4 text-3xl font-semibold text-white lg:block">
            {text}
            <Cursor cursorColor="white" />
          </div>
          <h1 className="text-3xl font-semibold md:text-5xl">
            Unlock the power of community.
          </h1>
          <p className="text-md mt-5 md:text-lg">
            Discover a vibrant social media experience with Maple. Connect with
            friends, share your passions, and explore a world of endless
            possibilities. Join our thriving community and let your voice be
            heard. Welcome to Maple, where connections grow and stories unfold.
          </p>
          <div className="text-md mt-8 font-semibold lg:mt-14">
            <button
              className="hidden rounded-sm border-2 border-brand bg-brand p-2 px-6 text-white duration-200 ease-in hover:border-brand/80 hover:bg-transparent hover:text-brand/80 md:inline"
              onClick={signInWithGoogle}
            >
              Sign In
            </button>
            <button
              className="mx-5 rounded-sm border-2 border-brand/80 p-2 px-5 text-brand/80 duration-200 ease-in hover:bg-brand hover:text-white"
              onClick={guestSignIn}
            >
              Try Now
            </button>
          </div>
        </div>
        <div className="ml-[25%] hidden w-1/2 md:block">
          <img src={hero} alt="hero" className="h-[60vh]" />
        </div>
      </section>
      <section>
        <h1 className="text-center text-3xl font-semibold md:text-5xl">
          Features
        </h1>
        <div className="flex h-full flex-wrap justify-between p-10 md:m-10 md:mx-20 md:px-20">
          <FeatureCard
            icon={<BiLockAlt />}
            title={"Secure Authentication"}
            desc={
              "Ensure Peace of Mind with Secure Authentication using Google Auth. Safeguard your digital identity and enjoy a worry-free login process with our state-of-the-art security features."
            }
            clr={0}
          />
          <FeatureCard
            icon={<BiCrown />}
            title={"Simple Interface"}
            desc={
              "Experience social media in its purest form, with a user-friendly design that keeps the focus on what matters most: connecting with friends, sharing moments, and discovering new experiences. "
            }
            clr={1}
          />
          <FeatureCard
            icon={<BiLineChart />}
            title={"Network"}
            desc={
              "The Ultimate Networking Experience. Connect, collaborate, and grow your network like never before."
            }
            clr={2}
          />
        </div>
      </section>
      <footer className="w-full bg-black/80 p-2 text-center text-white">
        Made with <span className="text-red-600">❤</span> by{" "}
        <a href="https://github.com/kkhitesh" className="decoration-none">
          Hitesh Kowdiki
        </a>
      </footer>
    </div>
  );
};
