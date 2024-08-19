import Image from "next/image";
import Bg from "@/images/bg.png";
const Layout = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-purple-600 text-white">
      <div className="absolute inset-0 z-0 left-[80%] translate-x-[-50%] top-[90px]">
        <Image
          src={Bg}
          alt="Background"
          objectFit="cover"
          quality={100}
          width={500}
          height={500}
        />
      </div>
      <header className="bg-white text-purple-600 p-4 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Google</div>
          <div>
            <a href="#" className="mx-2">
              Products
            </a>
            <a href="#" className="mx-2">
              About
            </a>
            <a href="#" className="mx-2">
              Contact
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 flex">
        <aside className="w-1/4 bg-white text-purple-600 p-4">
          <nav>
            <ul>
              <li className="pr-4">
                <a href="#">Overview</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">AI Stack</a>
              </li>
              <li>
                <a href="#">Funding</a>
              </li>
              <li>
                <a href="#">Core Team</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="w-3/4 p-4 bg-white text-purple-600">
          {children}
        </section>
      </main>
      <footer className="bg-white text-purple-600 text-center p-4">
        ©2024 by Fualex. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;
