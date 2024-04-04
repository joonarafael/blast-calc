"use client";

// Client view for Home Page

import Container from './components/container';
import { Button } from './components/ui/button';

const HomeClient = () => {
	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center mt-16">
						<div className="font-bold text-6xl">BLAST CALC</div>
						<div className="font-light text-neutral-500">
							Joona Rafael Kettunen
						</div>
						<hr />
						<div className="font-light text-yellow-500 max-w-[500px]">
							<p>
								CALCULATIONS AND RENDERING IS LARGELY DONE ON CLIENT MACHINE BY
								THE CLIENT BROWSER.
							</p>
						</div>
						<div className="font-light text-neutral-500 max-w-[500px]">
							<p>
								MAKE SURE YOUR BROWSER IS RUNNING THE LATEST
								<br />
								AVAILABLE VERSION TO ENSURE THE BEST PERFORMANCE.
							</p>
						</div>
						<Button onClick={() => window.open("/calc/new", "_self")}>
							NEW PLAN
						</Button>
						<Button
							variant="secondary"
							onClick={() => window.open("/calc/load", "_self")}
						>
							LOAD PLAN FROM FILE
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default HomeClient;
