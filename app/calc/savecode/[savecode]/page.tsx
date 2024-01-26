import ClientOnly from '@/app/components/clientonly';
import PageError from '@/app/components/pageerror';

import SaveCodeClient from './savecodeclient';

interface IParams {
	savecode?: string;
}

const SaveCodePage = async ({ params }: { params: IParams }) => {
	const { savecode } = params;

	if (!savecode) {
		return (
			<ClientOnly>
				<PageError message={"Invalid URL parameters."} />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<SaveCodeClient saveCode={savecode} />
		</ClientOnly>
	);
};

export default SaveCodePage;
