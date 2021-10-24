import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "./formConfig.js";
import { useSelector } from 'react-redux'

export default function useMercadoPago(carrito, correo) {
    const [resultPayment, setResultPayment] = useState(undefined);
    const [error, setError] = useState({ status: 0 })

    let total = 0
    carrito ? carrito.forEach(el => total += el.price) : total = 0

    const { MercadoPago } = useScript(
        "https://sdk.mercadopago.com/js/v2",
        "MercadoPago"
    );
    useEffect(() => {
        if (MercadoPago) {
            const mp = new MercadoPago('TEST-9f4d92e0-d422-4df9-b9e1-fdee86585688');
            const cardForm = mp.cardForm({
                amount: total.toString(),
                autoMount: true,
                form: formConfig,
                callbacks: {
                    onFormUnmounted: error => {
                        if (error) return setError(error)
                    },
                    onIdentificationTypesReceived: (error) => {
                        if (error) return setError(error)
                    },
                    onPaymentMethodsReceived: (error) => {
                        if (error) return setError(error)
                    },
                    onIssuersReceived: (error) => {
                        if (error) return setError(error)
                    },
                    onInstallmentsReceived: (error) => {
                        if (error) return setError(error)
                    },
                    onCardTokenReceived: (error) => {
                        if (error) return setError(error)
                    },
                    onFormMounted: (error) => {
                        if (error) return setError(error)
                    },

                    onSubmit: (event) => {
                        event.preventDefault();
                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            token,
                            installments,
                            identificationNumber,
                            identificationType,
                        } = cardForm.getCardFormData();

                        fetch(`http://localhost:3001/purchase/${correo}`,
                            {
                                // entry point backend
                                method: "POST",
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Request-Method":
                                        "GET, POST, DELETE, PUT, OPTIONS",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    transaction_amount: 1000,
                                    installments: Number(installments),
                                    description: "Descripción del producto",
                                    payer: {
                                        email: correo,
                                        identification: {
                                            type: identificationType,
                                            number: identificationNumber,
                                        },
                                    },
                                }),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => setResultPayment(data))
                            .catch((err) => setResultPayment(err));
                    },
                },
            });
        }
    }, [MercadoPago]);
    if (error.status !== 0) return error
    return resultPayment;
}