// import Image from "next/image";
// import Link from "next/link";

// export function Footer() {
//   return (
//     <footer>
//       <div className="bg-primary text-white px-16">
//         <div className="app-container  flex py-12 items-start max-wl:flex-col gap-y-14">
//           <div className="flex-[1.5] xl:flex-1">
//             <Image
//               width={256}
//               height={128}
//               src="/pitchside-logo-white.png"
//               alt="PitchSide logo"
//               className="h-14 w-auto"
//             />
//           </div>
//           <div className="flex-1 grid lg:grid-cols-2 gap-y-6 text-xl font-semibold hover:[&_a]:underline">
//             <ul className="space-y-4">
//               <li>
//                 <Link href="/create">
//                   <span className="font-bold font-display italic">
//                     PITCHSIDE
//                   </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/create">
//                   <span className="text-lg font-sans">
//                     Create
//                     <span className="font-bold font-display italic">
//                       PITCHSIDE
//                     </span>
//                   </span>
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/play">
//                   <span className="text-lg font-sans">
//                     Play
//                     <span className="font-bold font-display italic">
//                       PITCHSIDE
//                     </span>
//                   </span>
//                 </Link>
//               </li>
//             </ul>
//             <ul className="space-y-4">
//               <li>
//                 <a href="#">News</a>
//               </li>
//               <li>
//                 <a href="#">FAQs</a>
//               </li>
//               <li>
//                 <a href="#">Who we are</a>
//               </li>
//             </ul>
//           </div>
//           <div className="flex-1">
//             {/* IconBrandApple */}
//             <h1 className="text-xl font-medium">Get the app</h1>

//             <div className="mt-8 flex items-center gap-x-7">
//               <button className="tc rounded-full bg-[#2E2E2E] p-3 hover:bg-[#4A4A4A]">
//                 <img
//                   src="/mig/icons/apple.svg"
//                   className="relative -top-0.5 w-7"
//                 />
//               </button>
//               <button className="tc rounded-full bg-[#2E2E2E] p-2 hover:bg-[#4A4A4A]">
//                 <img src="/mig/icons/playstore.svg" className="relative w-9" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-primary text-white px-16">
//         <div className="app-container flex py-8 items-start max-wl:flex-col gap-y-14">
//           <div className="flex-[1.5]  xl:flex-1 text-fine ">
//             © Copyright 2024{" "}
//             <span className="uppercase font-display italic font-bold">
//               PitchSide
//             </span>
//           </div>
//           <div className="flex-1">
//             <p className="">
//               <a href="#">Terms of use</a> • <a href="#">Cookie policy</a> •{" "}
//               <a href="#">Privacy policy</a>
//             </p>
//             <p className="mt-3 text-sm  max-w-sm">
//               The use of automatic services (robots, crawler, indexing etc.) as
//               well as other methods for systematic or regular use is not
//               permitted.
//             </p>
//           </div>
//           <div className="flex-1 flex items-center gap-x-3.5">
//             <p className="mr-7">Follow us</p>
//             <a href="#" className="hover:opacity-50 ta p-1.5">
//               <img src="/mig/icons/footer/instagram.svg" className="w-6" />
//             </a>
//             <a href="#" className="hover:opacity-50 ta p-1.5">
//               <img src="/mig/icons/footer/facebook.svg" className="w-6" />
//             </a>
//             <a href="#" className="hover:opacity-50 ta p-1.5">
//               <img src="/mig/icons/footer/linkedin.svg" className="w-6" />
//             </a>
//             <a href="#" className="hover:opacity-50 ta p-1.5">
//               <img src="/mig/icons/footer/twitter.svg" className="w-6" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="">
      <div className="bg-primary text-white px-6 lg:px-16">
        {" "}
        {/* ✅ UPDATED: Responsive padding */}
        <div className="app-container flex flex-col lg:flex-row py-12 gap-y-10 gap-x-10">
          {" "}
          {/* ✅ UPDATED */}
          <div className="flex-[1.5] xl:flex-1">
            <Image
              width={256}
              height={128}
              src="/pitchside-logo-white.png"
              alt="PitchSide logo"
              className="h-14 w-auto"
            />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-lg font-semibold hover:[&_a]:underline">
            {" "}
            {/* ✅ UPDATED: grid responsive */}
            <ul className="space-y-4">
              <li>
                <Link href="/">
                  <span className="font-bold font-display italic">
                    PITCHSIDE
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/create">
                  <span className="text-base font-sans">
                    create
                    <span className="font-bold font-display italic">
                      PITCHSIDE
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/play">
                  <span className="text-base font-sans">
                    play
                    <span className="font-bold font-display italic">
                      PITCHSIDE
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
            <ul className="space-y-4">
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Who we are</a>
              </li>
            </ul>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium">Get the app</h1>{" "}
            {/* ✅ UPDATED: Responsive text size */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {" "}
              {/* ✅ UPDATED: Responsive gap */}
              <button className="tc rounded-full bg-[#2E2E2E] p-3 hover:bg-[#4A4A4A]">
                <img
                  src="/mig/icons/apple.svg"
                  className="relative -top-0.5 w-7"
                  alt="App Store"
                />
              </button>
              <button className="tc rounded-full bg-[#2E2E2E] p-2 hover:bg-[#4A4A4A]">
                <img
                  src="/mig/icons/playstore.svg"
                  className="relative w-9"
                  alt="Play Store"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white px-6 lg:px-16">
        {" "}
        <div className="app-container flex flex-col lg:flex-row py-8 gap-y-10 gap-x-10">
          {" "}
          <div className="flex-[1.5] xl:flex-1 text-sm lg:text-base text-fine">
            {" "}
            © Copyright 2024{" "}
            <span className="uppercase font-display italic font-bold">
              PitchSide
            </span>
          </div>
          <div className="flex-1 text-sm max-w-xl">
            <p>
              <Link href="/terms-condition">Terms of use</Link> •{" "}
              <Link href="/cookies">Cookie policy</Link> •{" "}
              <Link href="/privacy-policy">Privacy policy</Link>
            </p>
            {/* <p className="mt-3 text-xs lg:text-sm max-w-sm">
              The use of automatic services (robots, crawler, indexing etc.) as
              well as other methods for systematic or regular use is not
              permitted.
            </p> */}
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
            {" "}
            <p className="mr-4 text-sm">Follow us</p>
            <a
              href="https://www.instagram.com/pitchside.app"
              className="hover:opacity-50 ta p-1.5"
              target="_blank"
            >
              <img
                src="/mig/icons/footer/instagram.svg"
                className="w-6"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.facebook.com/pitchsideapp"
              className="hover:opacity-50 ta p-1.5"
              target="_blank"
            >
              <img
                src="/mig/icons/footer/facebook.svg"
                className="w-6"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/pitchsideapp"
              className="hover:opacity-50 ta p-1.5"
              target="_blank"
            >
              <img
                src="/mig/icons/footer/linkedin.svg"
                className="w-6"
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.x.com/pitchside_app"
              className="hover:opacity-50 ta p-1.5"
              target="_blank"
            >
              <img
                src="/mig/icons/footer/twitter.svg"
                className="w-6"
                alt="Twitter"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
