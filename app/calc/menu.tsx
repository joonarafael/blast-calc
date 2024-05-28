"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/app/components/ui/menubar";

interface MenuProps {
	zoom: number;
	setZoom: (value: number) => void;
	resetField: () => void;
	setLatencyChangeView: (value: string) => void;
	debugStates: () => void;
	setSelectedBoreHole: (value: number | null) => void;
	latencySelection: number[];
	setTool: (tool: string) => void;
	isLinking: boolean;
	setIsLinking: (value: boolean) => void;
	replacingToolView: boolean;
	setReplacingToolView: (value: boolean) => void;
	savePlan: () => void;
	runAnalyze: () => void;
}

const Menu: React.FC<MenuProps> = ({
	zoom,
	setZoom,
	resetField,
	setLatencyChangeView,
	debugStates,
	setSelectedBoreHole,
	setTool,
	isLinking,
	setIsLinking,
	latencySelection,
	setReplacingToolView,
	replacingToolView,
	savePlan,
	runAnalyze,
}) => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, theme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const zoomIn = () => {
		if (zoom < 6) {
			setZoom(zoom + 1);
		}
	};

	const zoomOut = () => {
		if (zoom > 1) {
			setZoom(zoom - 1);
		}
	};

	const zoomMin = () => {
		setZoom(1);
	};

	const zoomDefault = () => {
		setZoom(4);
	};

	const zoomMax = () => {
		setZoom(6);
	};

	const toggleIsLinking = () => {
		setIsLinking(!isLinking);
	};

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};

	if (!mounted || typeof theme === "undefined") {
		return (
			<div className="flex justify-between gap-4 m-4">Loading menu...</div>
		);
	}

	return (
		<div>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={() => window.open("/calc/new", "_blank")}>
							New Plan
						</MenubarItem>
						<MenubarItem onClick={() => window.open("/calc/load", "_blank")}>
							Load Plan From File
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem
							onClick={() => {
								setLatencyChangeView("latencyChange");
							}}
						>
							Configure Delay Selection
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem
							onClick={() => {
								runAnalyze();
							}}
						>
							Analyze
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem
							onClick={() => {
								savePlan();
							}}
						>
							Save Plan
						</MenubarItem>
						<MenubarItem disabled>Print</MenubarItem>
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>Reset Field</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem
									onClick={() => {
										resetField();
									}}
								>
									Click to Confirm
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>Exit</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem onClick={() => window.open("/", "_self")}>
									Click to Confirm
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Select</MenubarTrigger>
					<MenubarContent>
						<MenubarSub>
							<MenubarSubTrigger>Tool</MenubarSubTrigger>
							<MenubarItem
								onClick={() => {
									setReplacingToolView(!replacingToolView);
								}}
							>
								Bulk Replace Tool
							</MenubarItem>
							<MenubarSubContent>
								<MenubarItem onClick={() => setTool("cursor")}>
									Cursor
								</MenubarItem>
								<MenubarItem onClick={() => setTool("entry")}>
									Entry
								</MenubarItem>
								<MenubarItem onClick={() => setTool("borehole")}>
									Borehole
								</MenubarItem>
								<MenubarItem onClick={() => setTool("eraser")}>
									Eraser
								</MenubarItem>
								{latencySelection.map((item, i) => (
									<MenubarItem key={i} onClick={() => setTool(`${item}`)}>
										{`${item} ms`}
									</MenubarItem>
								))}
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSeparator />
						<MenubarItem onClick={toggleIsLinking}>
							Toggle Borehole Linking
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={() => setTool("cursor")}>
							Clear Tool Selection
						</MenubarItem>
						<MenubarItem
							onClick={() => {
								setSelectedBoreHole(null);
							}}
						>
							Clear Borehole Selection
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={zoomIn}>
							Zoom In<MenubarShortcut>+</MenubarShortcut>
						</MenubarItem>
						<MenubarItem onClick={zoomOut}>
							Zoom Out<MenubarShortcut>-</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={zoomMin}>Zoom Minimum</MenubarItem>
						<MenubarItem onClick={zoomMax}>Zoom Maximum</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={zoomDefault}>Zoom Default</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={toggleFullscreen}>
							Toggle Fullscreen
						</MenubarItem>
						{theme === "light" ? (
							<MenubarItem
								onClick={() => {
									setTheme("dark");
								}}
							>
								Dark Mode
							</MenubarItem>
						) : (
							<MenubarItem
								onClick={() => {
									setTheme("light");
								}}
							>
								Light Mode
							</MenubarItem>
						)}
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Debug</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={debugStates}>
							Log state arrays to console
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
};

export default Menu;
