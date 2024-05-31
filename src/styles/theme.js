import { createTheme } from "@mui/material/styles";
import "@fontsource/bebas-neue";

export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#ffffff",
		},
		secondary: {
			main: "#ffffff",
		},
		success: {
			main: "#2e7d32",
		},
		divider: "rgba(125,125,125,0.12)",
		background: {
			paper: "#000039",
			default: "#000000",
		},
	},
	typography: {
		fontFamily: "Roboto",
		h1: {
			fontFamily: "Bebas Neue",
		},
		h2: {
			fontFamily: "Bebas Neue",
		},
		h3: {
			fontFamily: "Bebas Neue",
		},
	},
});
