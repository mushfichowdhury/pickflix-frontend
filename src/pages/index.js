import { Box, ListItem, ThemeProvider, Typography } from "@mui/material";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import Image from "next/image";
import PosterCarosel from "@/components/PosterCarosel";

export default function Home() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const url =
			"https://api.themoviedb.org/3/movie/now_playing?language=en-US&region=us&page=1";
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Y5NmU2ZTUyNTA1YWE3NjEzMzcyOTk5OTQ3NDk1YSIsInN1YiI6IjYwMTdhZTQ0NzEzZWQ0MDAzZmU2MTdlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.COeS9RsgBtp8HQRmMH5kP8i69SkKE4tVTuL5nuUOefM",
			},
		};
		fetch(url, options)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setMovies(data.results);
			})
			.catch((error) => {
				console.error("There was a problem fetching the data:", error);
			});
		console.log(movies);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
				<Typography variant='h1'>PickFlix</Typography>
				<Typography variant='h4'>
					An app to decide what movie to watch tonight!
				</Typography>
				<PosterCarosel movies={movies} />
			</Box>
		</ThemeProvider>
	);
}
