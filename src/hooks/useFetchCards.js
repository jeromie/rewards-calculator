import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import {
	defaultData,
	fetchFromLocalStorage,
	saveToLocalStorage,
} from "../utils/helpers";
import { db } from "../config/firestore";
import { v4 as uuidv4 } from "uuid";

const useFetchCards = () => {
	const [defaultCards, setDefaultCards] = useState([]);
	const [customCards, setCustomCards] = useState([]);
	const [filters, setFilters] = useState({});
	const [customCardData, setCustomCardData] = useState(defaultData);
	const [showAddCard, setShowAddCard] = useState({
		show: false,
		isEdit: false,
	});

	const fetchCards = async () => {
		const storedFilters = fetchFromLocalStorage("filters");
		const storedCards = fetchFromLocalStorage("cardAdded");

		const querySnapshot = await getDocs(collection(db, "Cards_India"));
		const fetchedDefaultCards = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		setDefaultCards(fetchedDefaultCards);

		if (!storedFilters) {
			const initialFilters = fetchedDefaultCards.reduce((acc, item) => {
				acc[item.id] = true;
				return acc;
			}, {});
			setFilters(initialFilters);
		} else {
			setFilters(storedFilters);
		}

		if (storedCards) setCustomCards(storedCards);
	};

	useEffect(() => {
		fetchCards();
	}, []);

	const handleFilterChange = (id) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters, [id]: !prevFilters[id] };
			saveToLocalStorage("filters", updatedFilters);
			return updatedFilters;
		});
	};

	const onAddCard = () => {
		setShowAddCard({ show: true, isEdit: false });
		setCustomCardData(defaultData);
	};

	const onSaveCard = (data) => {
		const { cardName: name, id, ...rest } = data;
		let updatedCards;

		if (id) {
			const localData = fetchFromLocalStorage("cardAdded") || [];
			updatedCards = localData.map((x) =>
				x.id === id
					? { ...data, name, miles: data.reward / data.rewardPoint }
					: x
			);
		} else {
			const newId = uuidv4();
			const miles = data.reward / data.rewardPoint;
			const newCard = { id: newId, name, miles, ...rest };
			updatedCards = [newCard, ...customCards];
			setFilters((prevFilters) => {
				const updatedFilters = { ...prevFilters, [newId]: true };
				saveToLocalStorage("filters", updatedFilters);
				return updatedFilters;
			});
		}

		setCustomCards(updatedCards);
		saveToLocalStorage("cardAdded", updatedCards);
		setShowAddCard({ show: false, isEdit: false });
	};

	const onEdit = (id) => {
		const singleCard = customCards.find((item) => item.id === id);

		if (singleCard) {
			const updatedCard = {
				...singleCard,
				cardName: singleCard.name,
			};
			setCustomCardData(updatedCard);
			setShowAddCard({ show: true, isEdit: true });
		}
	};

	const onDelete = (id) => {
		const deleteCard = defaultCards.filter((card) => card.id !== id);
		setDefaultCards(deleteCard);
		saveToLocalStorage("cardAdded", deleteCard);
	};

	return {
		defaultCards,
		customCards,
		filters,
		customCardData,
		showAddCard,
		setFilters,
		handleFilterChange,
		onSaveCard,
		onEdit,
		onDelete,
		onAddCard,
		setShowAddCard,
	};
};

export default useFetchCards;
