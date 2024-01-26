import ClientOnly from "@/app/components/clientonly";
import PageError from "@/app/components/pageerror";

const SaveCodePage = async () => {
	return (
		<ClientOnly>
			<PageError message={"Empty field or invalid URL parameters."} />
		</ClientOnly>
	);
};

export default SaveCodePage;
