import React from 'react';

// settings: {
//     layout: {
//         config: {
//             navbar: {
//                 display: false
//             },
//             toolbar: {
//                 display: false
//             },
//             footer: {
//                 display: false
//             },
//             leftSidePanel: {
//                 display: false
//             },
//             rightSidePanel: {
//                 display: false
//             }
//         }
//     }
// },

const SiteConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/onboarding',
			component: React.lazy(() => import('./onboarding/OnboardingStepperMain'))
		}
	]
};

export default SiteConfig;
