import styled from "styled-components";

export const FlexDiv = styled.div`
	display: flex;
`;

export const generateRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
