import React from 'react';
import {Input, Label, InputGroup, LegendError, IconValidation} from './StyledComponents';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ComponentInput = ({state, setState, type, label, placeholder, name, legendError, regularExpression, functionPassword}) => {
	const onChange = (e) => {
		setState({...state, camp: e.target.value});
	}

	const validation = () => {
		if(regularExpression){
			if(regularExpression.test(state.camp)){
				setState({...state, valid: 'true'});
			} else {
				setState({...state, valid: 'false'});
			}
		}

		if(functionPassword){
			functionPassword();
		}
	}

	return (
		<div>
			<Label htmlFor={name} valid={state.valid}>{label}</Label>
			<InputGroup>
				<Input 
					type={type}
					placeholder={placeholder} 
					id={name}
					value={state.camp}
					onChange={onChange}
					onKeyUp={validation}
					onBlur={validation}
					valid={state.valid}
				/>
				<IconValidation 
					icon={state.valid === 'true' ? faCheckCircle : faTimesCircle}
					valido={state.valid}
				/>
			</InputGroup>
			<LegendError valid={state.valid}>{legendError}</LegendError>
		</div>
	);
}
 
export default ComponentInput;