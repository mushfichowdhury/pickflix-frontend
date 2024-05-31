import { useState } from "react";

export async function getPopularMovies() {
	const [popularMovies, setPopularMovies] = useState([]);
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
		.then((res) => res.json())
		.then((data) => {
			setPopularMovies(() => ({ ...data.results }));
		});

	return popularMovies;
}
