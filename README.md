Razorpay Checkout Integration
This project integrates Razorpay's Checkout to securely collect payments from users.

⚡ Problem Faced
During the initial setup, the following error occurred:

Copy
Edit
401 Unauthorized - key_id=your_razorpay_key_id
Reason:
The placeholder your_razorpay_key_id was not replaced with the actual Razorpay Key ID. Razorpay API requires a valid Key ID for authorization.

✅ Solution
Get your Razorpay API Key:

Login to Razorpay Dashboard.

Navigate to Settings → API Keys.

Generate a Test Key (for sandbox testing) or use your Live Key (for production).

Copy the Key ID.

Update your code:

In your integration code (JavaScript/HTML), replace the placeholder:

diff
Copy
Edit
- key_id: "your_razorpay_key_id"
+ key_id: "rzp_test_ABC1234567890" // Replace with your actual Key ID
Or if you're using Razorpay's Checkout script:

html
Copy
Edit
<script src="https://checkout.razorpay.com/v1/checkout.js"
    data-key="rzp_test_ABC1234567890"
    data-amount="50000"
    data-currency="INR"
    ...
></script>
🚀 Quick Setup Example
HTML + JavaScript:

html
Copy
Edit
<button id="payBtn">Pay Now</button>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
  document.getElementById('payBtn').onclick = function (e) {
    var options = {
      key: "rzp_test_ABC1234567890", // Your Razorpay Key ID
      amount: 50000, // Amount is in currency subunits. 50000 = ₹500.00
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: "order_9A33XWu170gUtm", // Optional if you created order in backend
      handler: function (response){
          alert("Payment Successful. Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
      },
      theme: {
          color: "#3399cc"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
  }
</script>
📌 Important Points
Only Key ID is exposed on frontend. Key Secret must be kept safe in backend server only.

Always verify payment signature on your backend server.

Use Test keys while testing to avoid real transactions.

🔗 Helpful Links
Razorpay API Documentation

Checkout Integration Docs

Generate API Keys

Note: If you see Canvas2D willReadFrequently warnings in the console, they are only performance optimization suggestions for HTML canvas elements and can be ignored unless optimizing complex graphics.

