import React, { useEffect, useState } from "react";

export const PosterCarosel = ({ movies }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [moviePosters, setMoviePosters] = useState([]);

	useEffect(() => {
		setMoviePosters(getMoviePosters(movies));
	}, [movies]);

	function getMoviePosters(movies) {
		return movies.map((movie) => {
			if (movie.poster_path) {
				return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
			} else {
				// If no poster path is available, return a placeholder image or null
				return null;
			}
		});
	}

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	return (
		<div style={{ position: "relative", maxWidth: "500px", margin: "auto" }}>
			<img
				src={images[currentIndex]}
				alt={`Image ${currentIndex}`}
				style={{ width: "100%", height: "auto" }}
			/>
			<div
				style={{
					position: "absolute",
					top: "50%",
					transform: "translateY(-50%)",
					left: "10px",
					cursor: "pointer",
					opacity: "0.5",
				}}
				onClick={handlePrev}>
				&lt; Prev
			</div>
			<div
				style={{
					position: "absolute",
					top: "50%",
					transform: "translateY(-50%)",
					right: "10px",
					cursor: "pointer",
					opacity: "0.5",
				}}
				onClick={handleNext}>
				Next &gt;
			</div>
			<div style={{ textAlign: "center", marginTop: "10px" }}>
				{images.map((image, index) => (
					<span
						key={index}
						onClick={() => setCurrentIndex(index)}
						style={{
							display: "inline-block",
							width: "10px",
							height: "10px",
							borderRadius: "50%",
							backgroundColor: index === currentIndex ? "black" : "gray",
							margin: "0 5px",
							cursor: "pointer",
						}}></span>
				))}
			</div>
		</div>
	);
};
