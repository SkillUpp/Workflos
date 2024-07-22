import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        style={{ margin: 0, overflowY: "scroll" }}
      >
        <Header />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
      {/* <Footer /> */}
    </html>
  );
}
