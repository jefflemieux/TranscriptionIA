'use client'

export function Stepper({ children }: { activeStep: number, children: React.ReactNode[] }) {
	return (
		<div className="w-full max-w-96 mx-auto bg-primary p-3 rounded-full">
			<div className="flex justify-between">
				{children}
			</div>
		</div>
	)
}