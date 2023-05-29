import React, { useState, useEffect } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import ErrorAlert from "./ErrorAlert";
import {
	authorizationUrl,
	responseType,
	scope,
	clientId,
	state,
	redirectUri,
	appServerUrl,
	oauthServerUrl,
} from "./settings-code.js";

export const AuthorizationCodeExample = () => {
	const [accessToken, setAccessToken] = useState(null);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	// You can test this with a GitHub OAuth2 app (provided test server supports GitHub and Spotify)
	const onSuccess = ({ code }) => console.log(code);

	return (
		<div className="column">
			{error && <ErrorAlert error={error} />}
			<OAuth2Login
				id="auth-code-login-btn"
				authorizationUrl={authorizationUrl}
				responseType={responseType}
				scope={scope}
				clientId={clientId}
				state={state}
				redirectUri={redirectUri}
				isCrossOrigin={true}
				buttonText="Auth code login"
				onSuccess={onSuccess}
				onFailure={setError}
			/>
			{accessToken && <p>Access token: {accessToken}</p>}
			{user && (
				<div>
					<h3>User data</h3>
					<p>Obtained from token-protected API</p>
					<p>
						{user.name} {user.email}
					</p>
					<img src={user.picture} alt={user.name} />
				</div>
			)}
		</div>
	);
};
