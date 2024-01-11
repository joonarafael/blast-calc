import ClientOnly from "@/app/components/clientonly";
import { fieldSizeValidation } from "@/app/validations/fieldsizevalidation";

import NewPlanClient from "./newplanclient";

interface IParams {
	width?: number;
	height?: number;
}

const NewPlanPage = async ({ params }: { params: IParams }) => {
	const acceptedWidth = fieldSizeValidation(params.width);

	if (acceptedWidth !== 0) {
		return (
			<ClientOnly>
				<div>Invalid width provided.</div>
			</ClientOnly>
		);
	}

	const acceptedHeight = fieldSizeValidation(params.height);

	if (acceptedHeight !== 0) {
		return (
			<ClientOnly>
				<div>Invalid height provided.</div>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<NewPlanClient />
		</ClientOnly>
	);
};

export default NewPlanPage;
