import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Workflos",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, overflowY: "scroll" }}>
        <Header />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
      {/* <Footer /> */}
    </html>
  );
}
