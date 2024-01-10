import { Button } from "@/app/components/ui/button";

import ClientOnly from "./components/clientonly";
import Container from "./components/container";

export default function Home() {
	return (
		<ClientOnly>
			<Container>
				<div>
					<Button>Click me</Button>
				</div>
			</Container>
		</ClientOnly>
	);
}
