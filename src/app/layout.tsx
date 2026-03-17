import { Metadata } from "next";

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
