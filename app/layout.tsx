import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import ClientOnly from "./components/clientonly";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Blast Calc",
	description: "Delay calculator for blasting",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="py-4">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
