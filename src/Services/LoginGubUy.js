import React, { useState } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import ErrorAlert from "./ErrorAlert";
import { useMediaQuery } from '@mui/material';
import {
	authorizationUrl,
	responseType,
	scope,
	clientId,
	state,
	redirectUri,
} from "./settings-code.js";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const [error, setError] = useState(null);
	const { login } = useAuth();
	const navigate = useNavigate();
	const isMobile = useMediaQuery("(max-width: 992px)");

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
				className={isMobile ? "nav-link mobile" : "btn-principal"}
				isCrossOrigin={true}
				buttonText="Ingresar"
				onSuccess={onSuccess}
				onFailure={setError}
			/>
		</div>
	);
};
