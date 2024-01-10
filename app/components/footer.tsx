"use client";

import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
	return (
		<div
			className="
                flex
                flex-col
                gap-3
                items-center
                justify-center
                max-w-[2520px]
                md:px-10
                mx-auto
                p-4
                pb-12
                sm:px-2
                text-center
                xl:px-20
            "
		>
			<div>Blast Calc</div>
			<div className="flex flex-row text-neutral-500 items-center align-center gap-2">
				<span>MIT Licence</span>
			</div>
			<div className="flex flex-row text-neutral-500 items-center align-center gap-2">
				<AiOutlineCopyright size={16} />
				<span>2024 Joona Rafael Kettunen</span>
			</div>
		</div>
	);
};

export default Footer;
