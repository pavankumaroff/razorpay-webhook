import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams, ,] = useSearchParams();

  return (
    <div className="payment-success">
      <h1>Payment successful!</h1>
      <p>
        Payment ID: <b>{searchParams.get("payment_id")}</b>
      </p>
    </div>
  );
}

export default PaymentSuccess;
