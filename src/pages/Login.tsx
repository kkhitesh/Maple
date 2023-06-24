import { auth, db, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const chars = [
  {
    username: "Ted Mosby",
    userId: "ted.mosby",
    userImg:
      "https://static.wikia.nocookie.net/p__/images/e/e0/Ted_Mosby.jpg/revision/latest?cb=20121009145019&path-prefix=protagonist",
    bio: 'Architect, hopeless romantic, in search of true love. Believer in destiny and serendipity. On a never-ending quest for "The One." #HopelessRomantic #Architecture',
    followers: [],
    following: [],
  },
  {
    username: "Barney Stinson",
    userId: "barney.stinson",
    userImg:
      "https://static.wikia.nocookie.net/p__/images/0/04/BarneyMain.jpg/revision/latest?cb=20121009173430&path-prefix=protagonist",
    bio: "Suit up! Bro, I'm a master of suits, bro code, and picking up chicks. No commitments, just good times and legen...wait for it...dary adventures. #SuitUp #Legendary",
    followers: [],
    following: [],
  },
  {
    username: "Robin Sparkles",
    userId: "robin.scherbatsky",
    userImg:
      "[https://static.wikia.nocookie.net/p__/images/7/73/Cobie-smulders-joue-robin.jpg/revision/latest?cb=20121016132118&path-prefix=protagonist",
    bio: "Canadian journalist, news anchor, and occasional pop star. A tough, independent woman with a love for guns, hockey, and scotch. #Journalist #CanadianPride",
    followers: [],
    following: [],
  },
  {
    username: "Marshmallow",
    userId: "marshall.eriksen",
    userImg: "https://home.adelphi.edu/~br21822/Marshall.jpg",
    bio: "Environmental lawyer, loving husband, and proud dad. Passionate about the environment, board games, and sandwiches. #Lawyer #FamilyMan",
    followers: [],
    following: [],
  },
  {
    username: "ArtisticLily",
    userId: "lily.aldrin",
    userImg:
      "https://static.wikia.nocookie.net/p__/images/a/a1/LilyAldrin.jpg/revision/latest?cb=20130201001620&path-prefix=protagonist",
    bio: "Artist, kindergarten teacher, and mediator of the gang. Balancing love, career, and friendship. Lover of art, wine, and her awesome husband. #Artist #Teacher",
    followers: [],
    following: [],
  },
];

const socialMediaPosts = [
  {
    caption:
      "Reporting live from the hockey rink! Go team! #HockeyLife #SportsReporter",
    img: "https://images1.fanpop.com/images/image_uploads/Robin-Scherbatsky-cobie-smulders-1035820_1008_549.jpg",
    userId: "Ng5AWrzGHQPHoKpivpGa",
    userImg:
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Robin-Scherbatsky.How-I-Met-Your-Mother.webp",
    username: "Robin Scherbatsky",
    timestamp: serverTimestamp(),
  },
  {
    caption:
      "Throwback to my days as a teenage pop star. Rocking the stage and living my dreams. #PopStarLife #ThrowbackThursday",
    img: "https://cdn.theatlantic.com/media/mt/culture_test/HIMYM9_post.jpg",
    userId: "Ng5AWrzGHQPHoKpivpGa",
    userImg:
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Robin-Scherbatsky.How-I-Met-Your-Mother.webp",
    username: "Robin Scherbatsky",
    timestamp: serverTimestamp(),
  },
  {
    caption:
      "Exploring the beautiful landscapes of Canada. Nature at its finest. #ExploreCanada #NatureLover",
    img: "https://cdn.theatlantic.com/media/mt/culture_test/HIMYM9_post.jpg",
    userId: "Ng5AWrzGHQPHoKpivpGa",
    userImg:
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Robin-Scherbatsky.How-I-Met-Your-Mother.webp",
    username: "Robin Scherbatsky",
    timestamp: serverTimestamp(),
  },
  {
    caption:
      "Delving into breaking news stories, seeking the truth. The world needs to know. #JournalistLife #TruthSeeker",
    img: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/09/How-I-Met-Your-Mother-Robin-Jobs.jpg",
    userId: "Ng5AWrzGHQPHoKpivpGa",
    userImg:
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Robin-Scherbatsky.How-I-Met-Your-Mother.webp",
    username: "Robin Scherbatsky",
    timestamp: serverTimestamp(),
  },
  {
    caption:
      "Cheers to a great night with friends, good music, and a glass of scotch. #NightOut #ScotchLover",
    img: "https://www.giantfreakinrobot.com/wp-content/uploads/2022/03/how-i-met-your-mother-cast.jpg",
    userId: "Ng5AWrzGHQPHoKpivpGa",
    userImg:
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Robin-Scherbatsky.How-I-Met-Your-Mother.webp",
    username: "Robin Scherbatsky",
    timestamp: serverTimestamp(),
  },
];

export const Login = () => {
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

  const addData = () => {
    socialMediaPosts.forEach((c) => {
      addDoc(collection(db, "posts"), c);
    });
  };

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={addData}>Add Data</button>
    </div>
  );
};
