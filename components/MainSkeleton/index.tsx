
const MainSkeleton = () => {
	return (
		<div className="p-10 max-w-3xl mx-auto">
			<ul className="space-y-2 list-decimal">
				{[...Array(5).keys()].map((i) => (
					<li key={i} className="space-y-2">
						<div
							className="animate-pulse h-7 w-1/2 bg-slate-200 rounded duration-1000"
							style={{
								animationDelay: `${i * 0.05}s`,
							}}
						></div>
						<div
							className="animate-pulse h-5 w-full bg-slate-200 rounded duration-1000"
							style={{
								animationDelay: `${i * 0.05}s`,
							}}
						></div>
						<div
							className="animate-pulse h-5 w-3/4 bg-slate-200 rounded duration-1000"
							style={{
								animationDelay: `${i * 0.05}s`,
							}}
						></div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MainSkeleton;