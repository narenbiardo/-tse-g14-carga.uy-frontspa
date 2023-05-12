import axios from "axios";
import React from "react";
import { Routes } from "./Oidc";

const baseURL = "https://auth-testing.iduruguay.gub.uy/oidc/v1/authorize";

export const AxiosPrueba = () => {
	const [post, setPost] = React.useState(null);

	React.useEffect(() => {
		axios
			.get(baseURL, {
				params: {
					authority: "https://auth-testing.iduruguay.gub.uy/oidc/v1/authorize",
					clientId: "890192",
					redirectUri: "https://openidconnect.net/callback",
					responseType: "code",
					state: "STRING_RANDOM",
				},
			})
			.then(response => {
				setPost(response.data);
			});
	}, []);

	if (!post) return null;

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	);
};
