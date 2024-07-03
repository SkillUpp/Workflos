/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	output: "export",
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb',
		},
	},
	// images: {
	// 	remotePatterns: [
	// 		{
	// 			protocol: 'https',
	// 			hostname: 'directus.aiapex.asia',
	// 			port: '',
	// 			pathname: '/assets/**',
	// 		},
	// 	],
	// },
};
