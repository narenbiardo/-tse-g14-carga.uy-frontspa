import { AuthProvider } from "oidc-react";

const oidcConfig = {
	onSignIn: () => {
		// Redirect?
	},
	authority: "https://auth-testing.iduruguay.gub.uy/oidc/v1/authorize",
	clientId: "890192",
	redirectUri: "https://openidconnect.net/callback",
	responseType: "code",
	state: "STRING_RANDOM",
};

export const Routes = () => {
	return (
		<AuthProvider {...oidcConfig}>
			<h1>Llegué hasta aqui...</h1>
		</AuthProvider>
	);
};
