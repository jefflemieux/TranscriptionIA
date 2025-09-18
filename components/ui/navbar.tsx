'use client'

import { BellDotIcon, CalendarDaysIcon, LogOutIcon, MessagesSquareIcon, UserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {

	const router = useRouter();

	return (
		<nav className="p-4 w-full">
			<div className="container flex mx-auto">
				<div className="w-fit ml-0 mr-auto">
					<a className="" onClick={() => {
						router.push("/")
					}}>
						<div className="p-3 rounded-full bg-primary">
							<LogOutIcon />
						</div>
					</a>
				</div>
				<div className="flex gap-4">
					<a onClick={(e) => { e.preventDefault(); }}>
						<div className="p-3 rounded-full bg-primary">
							<MessagesSquareIcon />
						</div>
					</a>
					<a onClick={(e) => e.preventDefault()} className="">
						<div className="p-3 rounded-full bg-primary">
							<CalendarDaysIcon />
						</div>
					</a>
					<a onClick={(e) => e.preventDefault()} className="">
						<div className="p-3 rounded-full bg-primary">
							<BellDotIcon />
						</div>
					</a>
					<a onClick={(e) => e.preventDefault()} className="">
						<div className="p-3 rounded-full bg-primary">
							<UserRoundIcon />
						</div>
					</a>
				</div>
			</div>
		</nav >
	);
}