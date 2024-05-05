import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Footer, Header, NextUser } from "@jecfe/react-design-system";
import "@jecfe/react-design-system/src/tailwind.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Auth0 Client",
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="font-poppins flex min-h-screen flex-col bg-white">
          <Header title="JeCFe - Template" user={<NextUser />} />
          <div className="container mx-auto flex-1">{children}</div>
          <Footer>JeCFe - Template</Footer>
        </body>
      </UserProvider>
    </html>
  );
}
