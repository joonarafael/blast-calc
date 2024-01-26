"use client";

import { toast } from "sonner";

import Container from "@/app/components/container";
import { Button } from "@/app/components/ui/button";

interface SaveCodeClientProps {
	saveCode: string;
}

const SaveCodeClient: React.FC<SaveCodeClientProps> = ({ saveCode }) => {
	const handleClick = () => {
		navigator.clipboard.writeText(saveCode);
		toast("Code copied to clipboard!");
	};

	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center mt-16">
						<div className="font-bold text-6xl">SAVE CODE</div>
						<div className="font-light text-neutral-500">
							This is your save code for the current state of your plan.
						</div>
						<div className="font-light text-yellow-500 max-w-[1000px]">
							<p>
								BE CAREFUL NOT TO MODIFY THIS CODE IN ANY WAY. CORRUPTED CODE
								WILL NOT WORK.
							</p>
						</div>
						<hr />
						<div className="max-w-[1000px] overflow-x-scroll">
							<p>{saveCode}</p>
						</div>
						<hr />
						<Button variant={"secondary"} onClick={handleClick}>
							COPY CODE TO CLIPBOARD
						</Button>
						<Button
							variant={"outline"}
							onClick={() => {
								window.close();
							}}
						>
							CLOSE WINDOW
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default SaveCodeClient;
