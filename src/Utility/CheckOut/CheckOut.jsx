import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CheckOut = ({ bookInfo }) => {
  const { consultation_Cost,_id,} = bookInfo;
  const cost = parseInt(consultation_Cost);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransaction] = useState("");
  const navigate = useNavigate();

//   const taka = 200;
  const postData = async () => {
    if(cost > 0){
        const {data} = await axios.post("http://localhost:5000/payment-intent",{cost});
        setClientSecret(data.clientSecret);
    }
  };
  useEffect(() => {
    postData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    }
    if (paymentMethod) {
      setError("");
    //   console.log("Show", paymentMethod);
    }

    //confirm payment
    const { err, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );
    if (err) {
      setError(error.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransaction(paymentIntent.id);
        // console.log("payment intend", paymentIntent);
        const paymentInfo = {
            transaction: paymentIntent?.id,
            paymentDate: new Date().toLocaleString(), //uct data convert. use moment js to
        };

        // after payment sent data to database
        try {
            const {data} =  await axios.patch(`http://localhost:5000/payment-update/${_id}`,paymentInfo)
            if(data.modifiedCount>0){
                Swal.fire({
                title: "Your Payment Successful.!",
                text:`Transaction ID: ${paymentIntent.id}`,
                icon: "success",
              });
            }
        //navigate to book from
        navigate('/Dashboard/Booked_Appointment');
        } catch (error) {
            setError(error.message);
            
        }
        // console.log(paymentInfo);
      }
    }
  };

  return (
    <div className="lg:p-5 shadow-md rounded-lg border-2"> 
      <form onSubmit={handleSubmit}>
        <CardElement
        className="border border-dashed p-5 rounded-lg"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex justify-center"><button className="btn w-full mt-5 bg-blue-300" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        </div>

        <p className="text-red-500">{error}</p>
        <div>
          {transactionID && (
            <span className="text-green-500">
              {" "}
              Your Transaction ID: {transactionID}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

CheckOut.propTypes = {
  bookInfo: PropTypes.object,
};

export default CheckOut;
