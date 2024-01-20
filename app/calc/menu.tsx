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
}

const Menu: React.FC<MenuProps> = ({
	zoom,
	setZoom,
	resetField,
	setLatencyChangeView,
	debugStates,
	setSelectedBoreHole,
	setTool,
	latencySelection,
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
						<MenubarSeparator />
						<MenubarItem>Analyze</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarItem>Print</MenubarItem>
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
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem
							onClick={() => {
								setLatencyChangeView(true);
							}}
						>
							Configure Latency Selection
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Select</MenubarTrigger>
					<MenubarContent>
						<MenubarSub>
							<MenubarSubTrigger>Tool</MenubarSubTrigger>
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
						<MenubarItem onClick={() => setTool("cursor")}>
							Clear tool selection
						</MenubarItem>
						<MenubarItem
							onClick={() => {
								setSelectedBoreHole(null);
							}}
						>
							Clear borehole selection
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
