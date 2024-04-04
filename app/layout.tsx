// APPLICATION ROOT LAYOUT

import type { Metadata } from "next";
import './globals.css';

import { Inter } from 'next/font/google';

import Footer from './components/footer';
import { ThemeProvider } from './components/themeprovider';
import { Toaster } from './components/ui/sonner';

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
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="py-4">{children}</div>
					<Footer />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
