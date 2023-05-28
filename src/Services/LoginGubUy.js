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
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

export const Login = () => {
	const [error, setError] = useState(null);
	const { login } = useAuth();
	const navigate = useNavigate();

	const onSuccess = ({ code }) => {
		login(code);
		navigate("/");
	};

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
				buttonText="Ingresar"
				onSuccess={onSuccess}
				onFailure={setError}
			/>
		</div>
	);
};
