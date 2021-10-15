import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colors = {
	border: "#0075FF",
	error: "#bb2929",
	success: "#1ed12d"
}

const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 7%;
	background-color: #CFCFCF;
	gap: 20px;
	@media (max-width: 800px){
		grid-template-columns: 1fr;
	}
`;

const Label = styled.label`
	display: block;
	font-weight: 700;
	padding: 10px;
	min-height: 40px;
	cursor: pointer;
	${props => props.valid === 'false' && css`
		color: ${colors.error};
	`}
`;

const InputGroup = styled.div`
	position: relative;
	z-index: 90;
`;

const Input = styled.input`
	width: 100%;
	background: #fff;
	border-radius: 3px;
	height: 45px;
	line-height: 45px;
	padding: 0 40px 0 10px;
	transition: .3s ease all;
	border: 2px solid transparent;
	&:focus {
		border: 3px solid ${colors.border};
		outline: none;
		box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
	}
	${props => props.valid === 'true' && css`
		border: 2px solid green;
	`}
	${props => props.valid === 'false' && css`
		border: 3px solid ${colors.error} !important;
	`}
`;

const LegendError = styled.p`
	font-size: 12px;
	margin-bottom: 0;
	color: ${colors.error};
	display: none;
	${props => props.valid === 'true' && css`
		display: none;
	`}
	${props => props.valid === 'false' && css`
		display: block;
	`}
`;

const IconValidation = styled(FontAwesomeIcon)`
	position: absolute;
	right: 10px;
	bottom: 14px;
	z-index: 100;
	font-size: 16px;
	opacity: 0;
	${props => props.valid === 'false' && css`
		opacity: 1;
		color: ${colors.error};
	`}
	${props => props.valid === 'true' && css`
		opacity: 1;
		color: ${colors.success};
	`}
`;

const ContainerButtonSubmit = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	grid-column: span 2;
	@media (max-width: 800px){
		grid-column: span 1;
	}
`;

const Button = styled.button`
	height: 45px;
	line-height: 45px;
	width: 45%;
	background: #0154B2;
	color: #fff;
	font-weight: bold;
	font-size: 22px;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	transition: .1s ease all;
	&:hover {
		box-shadow: 3px 0px 30px rgba(163,163,163, 1);
	}
`;

const MessageSuccess = styled.p`
	font-size: 14px;
	color: ${colors.success};
`;

const MessageError = styled.div`
	height: 45px;
	line-height: 45px;
	background: #F66060;
	padding: 0px 15px;
	border-radius: 3px;
	grid-column: span 2;
	p {
		margin: 0;
	} 
	b {
		margin-left: 10px;
	}
`;

export {
	Form,
	InputGroup,
	Label,
	Input,
	LegendError,
	IconValidation,
	ContainerButtonSubmit,
	Button,
	MessageSuccess,
	MessageError
};