import "@styles/globals.css";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export const metadata = {
  title: "Ecoton Inventory Management",
  description: "RFID-Based Inventory Management System for Ecoton's Concrete Blocks",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      <div className="main">
          <div className="gradient" />
        </div>
        
        <main className="app">
        
          <Navbar/>
          <div className="flex flex-col h-screen justify-between">
          {children}
          <Footer/>
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;