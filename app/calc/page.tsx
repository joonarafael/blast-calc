// this is shit

import ClientOnly from "../components/clientonly";
import CalcClient from "./calcclient";

const CalcPage = () => {
	return (
		<ClientOnly>
			<CalcClient />
		</ClientOnly>
	);
};

export default CalcPage;
