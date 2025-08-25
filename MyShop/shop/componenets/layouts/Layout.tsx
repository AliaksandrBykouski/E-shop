import React from "react";
import Header from "@/componenets/modules/Header/Header";
import Footer from "@/componenets/modules/Footer/Footer";

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
   <>
     <Header />
      <main>{children}</main>
     <Footer />
   </>
  );
};

export default Layout;
