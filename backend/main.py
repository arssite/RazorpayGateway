from fastapi import FastAPI, Request
import razorpay
from config import RAZORPAY_API_KEY, RAZORPAY_API_SECRET

app = FastAPI()

# Initialize Razorpay Client
client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))

@app.get("/")
def welcome():
    return {"message": "Welcome to Razorpay + FastAPI integration!"}

class AmountRequest(BaseModel):
    amount: int

@app.post("/create-order/")
async def create_order(amount_req: AmountRequest):
    amount = amount_req.amount
    payment = client_razorpay.order.create({
        "amount": amount * 100,
        "currency": "INR",
        "payment_capture": 1
    })
    return payment

@app.post("/verify-payment/")
async def verify_payment(request: Request):
    data = await request.json()
    # Razorpay sends you: razorpay_order_id, razorpay_payment_id, razorpay_signature
    try:
        params_dict = {
            'razorpay_order_id': data['razorpay_order_id'],
            'razorpay_payment_id': data['razorpay_payment_id'],
            'razorpay_signature': data['razorpay_signature']
        }

        # Verifying payment signature
        client.utility.verify_payment_signature(params_dict)
        return {"status": "Payment verified successfully."}
    except razorpay.errors.SignatureVerificationError:
        return {"status": "Payment verification failed."}
