"use client";

import Container from "@/app/components/container";
import { Button } from "@/app/components/ui/button";

const LoadPlanClient = () => {
	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center mt-16">
						<div className="font-bold text-4xl">LOAD PLAN FROM FILE</div>
						<div className="font-light text-neutral-500">
							Resume ongoing work by loading a previous plan from file.
						</div>
						<hr />
						<div>{`Upload your previous plan as a valid '.json' file.`}</div>
						<div className="text-neutral-500 font-light text-sm">
							JSON FILE MUST BE IN THE SAME FORMAT AS IT WAS
							<br />
							WHEN ORIGINALLY DOWNLOADED FROM THE APPLICATION.
						</div>
						<div className="text-yellow-500 border rounded-lg p-2 border-red-500">
							CORRUPTED JSON FILE WILL NOT WORK.
						</div>
						<Button variant={"secondary"} disabled onClick={() => {}}>
							CREATE
						</Button>
						<Button
							variant={"outline"}
							onClick={() => window.open("/", "_self")}
						>
							GO BACK
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default LoadPlanClient;
