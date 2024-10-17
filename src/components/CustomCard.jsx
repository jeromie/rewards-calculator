import PropTypes from "prop-types";
import styled from "styled-components";

function CustomCard({ name, isListView, color }) {
	return (
		<CCWrapper $color={color} className="card-img" $isListView={isListView}>
			<Bg $color={color} />
			<Chip />

			<CCName>{name}</CCName>

			<CCNum>4234 7472 0947 2349</CCNum>

			<CCUser>John Doe</CCUser>

			<CCExpiry>01/31</CCExpiry>
		</CCWrapper>
	);
}

CustomCard.propTypes = {
	name: PropTypes.string,
	isListView: PropTypes.bool,
	color: PropTypes.object
}

export default CustomCard;

const CCName = styled.p`
	position: absolute;
	top: 6px;
	right: 8px;
	width: 70%;
	text-align: right;
	line-height: 1.3;
	font-family: Verdana, Arial, Helvetica, sans-serif;
`;

const CCNum = styled.p`
	position: absolute;
	bottom: 18px;
	left: 8px;
	filter: drop-shadow(1px 1px 0px rgba(0,0,0, 0.6));
`;

const CCUser = styled.p`
	position: absolute;
	bottom: 6px;
	left: 8px;
	filter: drop-shadow(1px 1px 0px rgba(0,0,0, 0.6));
`

const CCExpiry = styled.p`
	position: absolute;
	bottom: 6px;
	right: 8px;
	filter: drop-shadow(1px 1px 0px rgba(0,0,0, 0.6));
`;

const Bg = styled.div`
	position: absolute;
    top: -10px;
    right: -100px;
    width: 250px;
    height: 150px;
    background: ${({ $color }) => `linear-gradient(50deg, ${$color.color1} 0%, ${$color.color2} 92%)`} ;
    border-top-left-radius: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 10px;
      right: -10px;
      width: 230px;
      height: 210px;
	  background: ${({ $color }) => `linear-gradient(300deg, ${$color.color1} 0%, ${$color.color2} 92%)`} ;
      border-top-left-radius: 100%;
    }
`

const Chip = styled.div`
    position: absolute;
    top: 40%;
	transform: translateY(-50%);
    left: 10px;
    width: 14px;
    aspect-ratio: 1.25;
    border-radius: 2px;
    background-color: var(--yellow-1);
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      left: 49%;
      top: -7%;
      transform: translateX(-50%);
      background: var(--yellow-1);
      border: 1px solid var(--yellow-2);
      width: 25%;
      height: 110%;
      border-radius: 100%;
      z-index: 2;
    }

    &::after {
      content: "";
      position: absolute;
      top: 30%;
      left: -10%;
      background: transparent;
      border: 1px solid var(--yellow-2);
      width: 120%;
      height: 33%;
    }
`

const CCWrapper = styled.div`
	border-radius: 0.35rem;
	height: 70px;
	aspect-ratio: 1.58;
	position: relative;
	color: white;
	font-family: 'Courier New', Courier, monospace;
	font-size: 8px;
	overflow: hidden;
	backface-visibility: hidden;
    background: ${({ $color }) => `linear-gradient(5deg, ${$color.color1} 0%, ${$color.color2} 92%)`} ;

	@media (max-width: 767px) {
		${CCExpiry}, ${CCNum}, ${Chip}, ${CCUser} {
			display: none;
		}
	}

	${({ $isListView }) => $isListView && `
		${CCExpiry}, ${CCNum}, ${Chip}, ${CCUser} {
			display: none;
		}
		${CCName} {
			font-size: 6px;
			top: 4px;
		}
	`}
`;