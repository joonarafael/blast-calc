import ClientOnly from "@/app/components/clientonly";

import LoadPlanClient from "./loadplanclient";

const LoadPlanPage = () => {
	return (
		<ClientOnly>
			<LoadPlanClient />
		</ClientOnly>
	);
};

export default LoadPlanPage;
