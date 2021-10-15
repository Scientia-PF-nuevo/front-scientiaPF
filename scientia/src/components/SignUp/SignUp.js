import React, { useState} from 'react';
import {Form, ContainerButtonSubmit, Button, MessageSuccess, MessageError} from './StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Input from './Components';
import './SignUp.css'


export default function SignUp () {
	const [firstName, setFirstName] = useState({camp: '', valid: null});
	const [lastName, setLastName] = useState({camp: '', valid: null});
	const [password, setPassword] = useState({camp: '', valid: null});
	const [password2, setPassword2] = useState({camp: '', valid: null});
	const [email, setEmail] = useState({camp: '', valid: null});
	const [phone, setPhone] = useState({camp: '', valid: null});
	const [validForm, setValidForm] = useState(null);
	const [country, setCountry] = useState({camp: ''});
	const [city, setCity] = useState({camp: ''});
	const [province, setProvince] = useState({camp: ''});
	const [address, setAddress] = useState({camp: ''});
	const [postal, setPostal] = useState({camp: ''});
	const [code, setCode] = useState({camp: ''});

	const expressions = {
		firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		phone: /^\d{7,14}$/ // 7 a 14 numeros.
	}

	const validatePassword2 = () => {
		if(password.camp.length > 0){
			if(password.camp !== password2.camp){
				setPassword2((prevState) => {
					return {...prevState, valid: 'false'}
				});
			} else {
				setPassword2((prevState) => {
					return {...prevState, valid: 'true'}
				});
			}
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if(
			firstName.valid === 'true' &&
			lastName.valid === 'true' &&
			password.valid === 'true' &&
			password2.valid === 'true' &&
			email.valid === 'true' &&
			phone.valid === 'true'
		){
			setValidForm(true);
			setFirstName({camp: '', valid: ''});
			setLastName({camp: '', valid: null});
			setEmail({camp: '', valid: null});
			setPhone({camp: '', valid: null});
			setPassword({camp: '', valid: null});
			setPassword2({camp: '', valid: 'null'});
			setCountry({camp: '', valid: null});
			setCity({camp: '', valid: null});
			setProvince({camp: '', valid: null});
			setAddress({camp: '', valid: null});
			setPostal({camp: '', valid: null});
			setCode({camp: '', valid: null});

		} else {
			setValidForm(false);
		}

		axios.post('http://localhost:3001/register', Form);
        alert(`Post created succesfully`); //Temporal, debe agregarse el redireccionamiento.
	}

	return (
		<main>
			<Form action="" onSubmit={onSubmit}>
			<h1>{<FontAwesomeIcon icon={faUserPlus}/>} Sign Up</h1>
			<h1></h1>
				<Input
					state={firstName}
					setState={setFirstName}
					type="text"
					label="*First Name"
					placeholder="Henry"
					name="first-name"
					legendError="The first name must only contain letters and spaces."
					regularExpression={expressions.firstName}
				/>
				<Input
					state={lastName}
					setState={setLastName}
					type="text"
					label="*Last Name"
					placeholder="Boom"
					name="last-name"
					legendError="The last name must only contain letters and spaces."
					regularExpression={expressions.lastName}
				/>
				<Input
					state={email}
					setState={setEmail}
					type="email"
					label="*Email"
					placeholder="henry@mail.com"
					name="email"
					legendError="The email must only contain letters, numbers, periods, hyphens and underscore."
					regularExpression={expressions.email}
				/>
				<Input
					state={phone}
					setState={setPhone}
					type="text"
					label="*Phone"
					placeholder="4491234567"
					name="phone"
					legendError="The phone must only contain numbers and the maximum is 14 digits."
					regularExpression={expressions.phone}
				/>
				<Input
					state={password}
					setState={setPassword}
					type="password"
					label="*Password"
					placeholder="**********"
					name="password1"
					legendError="The password must be 4 to 12 digits."
					regularExpression={expressions.password}
				/>
				<Input
					state={password2}
					setState={setPassword2}
					type="password"
					label="*Repeat password"
					placeholder="**********"
					name="password2"
					legendError="Both passwords must be the same."
					functionPassword={validatePassword2}
				/>
				<Input
					state={country}
					setState={setCountry}
					type="text"
					label="Country"
					placeholder="World wide "
					name="country"
				/>
				<Input
					state={city}
					setState={setCity}
					type="text"
					label="City"
					placeholder="Buenos Aires"
					name="city"
				/>
				<Input
					state={province}
					setState={setProvince}
					type="text"
					label="Province"
					placeholder="Atlantico"
					name="province"
				/>
				<Input
					state={address}
					setState={setAddress}
					type="text"
					label="Address"
					placeholder="Street..."
					name="address"
				/>
				<Input
					state={postal}
					setState={setPostal}
					type="text"
					label="Postal"
					placeholder="S...."
					name="postal"
				/>
				<Input
					state={code}
					setState={setCode}
					type="text"
					label="Code"
					placeholder="122312"
					name="code"
				/>
				
				{validForm === false && 
				<MessageError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Please fill in the form correctly.
					</p>
				</MessageError>
				}
				<ContainerButtonSubmit>
					<Button type="submit">Submit</Button>
					{validForm === true && <MessageSuccess>Form sent successfully!</MessageSuccess>}
					<p><b>Do you already have an account? <a href="#">Log in</a></b></p>
				</ContainerButtonSubmit>
			</Form>
		</main>
	);
}


// const SignUp = () => {
// 	const [firstName, setFirstName] = useState({camp: '', valid: null});
// 	const [lastName, setLastName] = useState({camp: '', valid: null});
// 	const [password, setPassword] = useState({camp: '', valid: null});
// 	const [password2, setPassword2] = useState({camp: '', valid: null});
// 	const [email, setEmail] = useState({camp: '', valid: null});
// 	const [phone, setPhone] = useState({camp: '', valid: null});
// 	const [validForm, setValidForm] = useState(null);
// 	const [country, setCountry] = useState({camp: ''});
// 	const [city, setCity] = useState({camp: ''});
// 	const [province, setProvince] = useState({camp: ''});
// 	const [address, setAddress] = useState({camp: ''});
// 	const [postal, setPostal] = useState({camp: ''});
// 	const [code, setCode] = useState({camp: ''});

// 	const expressions = {
// 		firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
// 		lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
// 		password: /^.{4,12}$/, // 4 a 12 digitos.
// 		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
// 		phone: /^\d{7,14}$/ // 7 a 14 numeros.
// 	}

// 	const validatePassword2 = () => {
// 		if(password.camp.length > 0){
// 			if(password.camp !== password2.camp){
// 				setPassword2((prevState) => {
// 					return {...prevState, valid: 'false'}
// 				});
// 			} else {
// 				setPassword2((prevState) => {
// 					return {...prevState, valid: 'true'}
// 				});
// 			}
// 		}
// 	}

// 	const onSubmit = (e) => {
// 		e.preventDefault();

// 		if(
// 			firstName.valid === 'true' &&
// 			lastName.valid === 'true' &&
// 			password.valid === 'true' &&
// 			password2.valid === 'true' &&
// 			email.valid === 'true' &&
// 			phone.valid === 'true'
// 		){
// 			setValidForm(true);
// 			setFirstName({camp: '', valid: ''});
// 			setLastName({camp: '', valid: null});
// 			setEmail({camp: '', valid: null});
// 			setPhone({camp: '', valid: null});
// 			setPassword({camp: '', valid: null});
// 			setPassword2({camp: '', valid: 'null'});
// 			setCountry({camp: '', valid: null});
// 			setCity({camp: '', valid: null});
// 			setProvince({camp: '', valid: null});
// 			setAddress({camp: '', valid: null});
// 			setPostal({camp: '', valid: null});
// 			setCode({camp: '', valid: null});

// 		} else {
// 			setValidForm(false);
// 		}

// 		axios.post('http://localhost:3001/register', Form);
//         alert(`Post created succesfully`); //Temporal, debe agregarse el redireccionamiento.
// 	}

// 	return (
// 		<main>
// 			<Form action="" onSubmit={onSubmit}>
// 			<h1>{<FontAwesomeIcon icon={faUserPlus}/>} Sign Up</h1>
// 			<h1></h1>
// 				<Input
// 					state={firstName}
// 					setState={setFirstName}
// 					type="text"
// 					label="*First Name"
// 					placeholder="Henry"
// 					name="first-name"
// 					legendError="The first name must only contain letters and spaces."
// 					regularExpression={expressions.firstName}
// 				/>
// 				<Input
// 					state={lastName}
// 					setState={setLastName}
// 					type="text"
// 					label="*Last Name"
// 					placeholder="Boom"
// 					name="last-name"
// 					legendError="The last name must only contain letters and spaces."
// 					regularExpression={expressions.lastName}
// 				/>
// 				<Input
// 					state={email}
// 					setState={setEmail}
// 					type="email"
// 					label="*Email"
// 					placeholder="henry@mail.com"
// 					name="email"
// 					legendError="The email must only contain letters, numbers, periods, hyphens and underscore."
// 					regularExpression={expressions.email}
// 				/>
// 				<Input
// 					state={phone}
// 					setState={setPhone}
// 					type="text"
// 					label="*Phone"
// 					placeholder="4491234567"
// 					name="phone"
// 					legendError="The phone must only contain numbers and the maximum is 14 digits."
// 					regularExpression={expressions.phone}
// 				/>
// 				<Input
// 					state={password}
// 					setState={setPassword}
// 					type="password"
// 					label="*Password"
// 					placeholder="**********"
// 					name="password1"
// 					legendError="The password must be 4 to 12 digits."
// 					regularExpression={expressions.password}
// 				/>
// 				<Input
// 					state={password2}
// 					setState={setPassword2}
// 					type="password"
// 					label="*Repeat password"
// 					placeholder="**********"
// 					name="password2"
// 					legendError="Both passwords must be the same."
// 					functionPassword={validatePassword2}
// 				/>
// 				<Input
// 					state={country}
// 					setState={setCountry}
// 					type="text"
// 					label="Country"
// 					placeholder="World wide "
// 					name="country"
// 				/>
// 				<Input
// 					state={city}
// 					setState={setCity}
// 					type="text"
// 					label="City"
// 					placeholder="Buenos Aires"
// 					name="city"
// 				/>
// 				<Input
// 					state={province}
// 					setState={setProvince}
// 					type="text"
// 					label="Province"
// 					placeholder="Atlantico"
// 					name="province"
// 				/>
// 				<Input
// 					state={address}
// 					setState={setAddress}
// 					type="text"
// 					label="Address"
// 					placeholder="Street..."
// 					name="address"
// 				/>
// 				<Input
// 					state={postal}
// 					setState={setPostal}
// 					type="text"
// 					label="Postal"
// 					placeholder="S...."
// 					name="postal"
// 				/>
// 				<Input
// 					state={code}
// 					setState={setCode}
// 					type="text"
// 					label="Code"
// 					placeholder="122312"
// 					name="code"
// 				/>
				
// 				{validForm === false && 
// 				<MessageError>
// 					<p>
// 						<FontAwesomeIcon icon={faExclamationTriangle}/>
// 						<b>Error:</b> Please fill in the form correctly.
// 					</p>
// 				</MessageError>
// 				}
// 				<ContainerButtonSubmit>
// 					<Button type="submit">Submit</Button>
// 					{validForm === true && <MessageSuccess>Form sent successfully!</MessageSuccess>}
// 					<p><b>Do you already have an account? <a href="#">Log in</a></b></p>
// 				</ContainerButtonSubmit>
// 			</Form>
// 		</main>
// 	);
// }
 
// export default SignUp;