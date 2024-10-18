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

export const fetchFromLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const saveToLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const defaultData = {
	cardName: "My Awesome Card",
	points: "1",
	spent: "100",
	reward: "1",
	rewardPoint: "2",
	accelerator: "3",
	acceleratedType: "Bonus",
	isCustom: true,
};
