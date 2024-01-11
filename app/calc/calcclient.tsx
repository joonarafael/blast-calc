"use client";

import Container from "../components/container";

const CalcClient = () => {
	return (
		<Container>
			<div className="border border-red flex flex-row p-4 gap-4">
				<div className="border border-red w-4/5 overflow-x-scroll">
					<div className="w-max">
						Quisque ultrices libero velit, at elementum enim egestas eget. Sed
						diam ex, tincidunt sit amet ultricies id, scelerisque et tortor.
						Praesent elementum lobortis nibh, a sollicitudin risus dignissim id.
						Praesent sem nunc, semper at dui quis, ullamcorper accumsan arcu.
						Phasellus et auctor orci, in venenatis arcu. Donec ultricies augue
						eget ligula lobortis auctor. Phasellus ut dui lobortis, fermentum
						ligula vitae, congue felis. Sed dictum libero sit amet magna congue
						dignissim. Proin aliquam ligula ante, ut sagittis arcu molestie
						eget. Phasellus consectetur arcu ex, non condimentum augue
						ullamcorper vitae. Praesent convallis mauris quis est mattis
						tincidunt.
					</div>
				</div>
				<div className="border border-red w-1/5 overflow-y-scroll">
					<div>mites täällä toimii</div>
				</div>
			</div>
		</Container>
	);
};

export default CalcClient;
