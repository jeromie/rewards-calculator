import { useState } from "react";
import Dialog from "./Dialog";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LiaFilterSolid } from "react-icons/lia";

const Filters = ({ cards, onFilterChange, filters }) => {
	const [showFilters, setShowFilters] = useState(false);

	return (
		<>
			<FiltersBtn
				onClick={() => setShowFilters(true)}
				className='btn rounded px-4 py-1'
			>
				<LiaFilterSolid size='1.5rem' />
			</FiltersBtn>

			{showFilters && (
				<Dialog
					title='Filter cards'
					desc='Select the cards you want to view'
					top='0'
					maxHeight='100%'
					maxWidth='400px'
					isDrawer
					onClose={() => setShowFilters(false)}
				>
					<form id='filtersForm'>
						<FiltersList>
							{cards.map((data) => {
								return (
									<li className="relative" key={data.id}>
										<Checkbox
											type='checkbox'
											onChange={() => onFilterChange(data.id)}
											checked={filters[data.id]}
											id={data.id}
										/>
										<label htmlFor={data.id}>
											{data.bank} {data.name}
										</label>
									</li>
								);
							})}
						</FiltersList>
					</form>
				</Dialog>
			)}
		</>
	);
};

Filters.propTypes = {
	cards: PropTypes.array,
	onFilterChange: PropTypes.func,
	filters: PropTypes.object,
};

export default Filters;

const FiltersBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	right: 0;
	top: 25%;
	padding: 10px 10px;
	border-radius: 20px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
`;

const FiltersList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 16px
`;

const Checkbox = styled.input`
	position: absolute;
	height: 1px;
	width: 1px;
	overflow: hidden;
	clip: rect(1px, 1px, 1px, 1px);

	& + label {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		line-height: 1;
		cursor: pointer;

		&:before {
			content: '';
			position: relative;
			display: inline-block;
			margin-right: 0.5rem;
			width: 20px;
			height: 20px;
			border-radius: 4px;
			background: transparent;
			border: 1px solid var(--brand);
			transition: all 0.2s ease-in-out;
			top: -1px;
		}

		&:after {
			content: '';
			position: absolute;
			border-left: 0 solid white;
			border-bottom: 0 solid white;
			height: 6px;
			width: 13px;
			transform: rotate(-60deg) scale(0);
			top: 5px;
			left: 4px;
			transition: all 0.2s ease-in-out;
			opacity: 0;
		}
	}

	&:checked + label{
		&:before{
			background-color: var(--brand);
		}
		&:after {
			border-left-width: 1px;
			border-bottom-width: 1px;
			transform: rotate(-45deg) scale(1);
			opacity: 1;
		}
	}

	&:focus {
		& + label {
			&:before {
				outline: var(--brand-2) solid 1px;
  				box-shadow: 0 0px 8px var(--brand-2);
			}
		}
	}
`;