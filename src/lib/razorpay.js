
const loadRazorpay = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const handlePayment = async (amount, planName, userEmail, onSuccess, onFailure) => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
    }

    // In a real app, you would create an order on your backend first
    // const result = await axios.post('/payment/orders');

    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Enter the Key ID generated from the Dashboard
        amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'V 19+ OTT',
        description: `Subscription for ${planName}`,
        image: 'https://example.com/your_logo',
        // order_id: result.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            onSuccess(response);
        },
        prefill: {
            name: 'User Name',
            email: userEmail,
            contact: '9999999999'
        },
        notes: {
            address: 'V 19+ Corporate Office'
        },
        theme: {
            color: '#ff6a00'
        }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
        if (onFailure) onFailure(response);
    });
}
