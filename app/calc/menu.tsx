"use client";

import { useState } from "react";

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
	setLatencyChangeView: (value: boolean) => void;
	debugStates: () => void;
	setSelectedBoreHole: (value: number | null) => void;
	latencySelection: number[];
	setTool: (tool: string) => void;
	isLinking: boolean;
	setIsLinking: (value: boolean) => void;
	requestCode: () => void;
	setReplacingToolView: (value: boolean) => void;
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
	requestCode,
	setReplacingToolView,
}) => {
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

	return (
		<div>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={() => window.open("/calc/new", "_blank")}>
							New Plan
						</MenubarItem>
						<MenubarItem disabled>Load Plan From Save Code</MenubarItem>
						<MenubarSeparator />
						<MenubarItem
							onClick={() => {
								setLatencyChangeView(true);
							}}
						>
							Configure Latency Selection
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem disabled>Analyze</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={requestCode}>Get Save Code</MenubarItem>
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
									setReplacingToolView(true);
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
						<MenubarItem onClick={zoomIn}>Zoom In</MenubarItem>
						<MenubarItem onClick={zoomOut}>Zoom Out</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={zoomMin}>Zoom Minimum</MenubarItem>
						<MenubarItem onClick={zoomMax}>Zoom Maximum</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={zoomDefault}>Reset Zoom</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={toggleFullscreen}>
							Toggle Fullscreen
						</MenubarItem>
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
