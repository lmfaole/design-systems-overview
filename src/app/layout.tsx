import { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Jøkul Blog",
  description: "A blog created with Jøkul designsystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
