//"use client"
import Navbar from "@components/Navbar";
import Feed from "@components/Feed";
import Footer from "@components/Footer";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Ecoton
        <br className="max-md:hidden" />
        <span className="eco_green_gradient text-center">
          Inventory Management
        </span>
      </h1>
      <p className="desc text-center">
        Efficient RFID Solution
      </p>
      <Feed />
    </section>
  );
};

export default Home;
