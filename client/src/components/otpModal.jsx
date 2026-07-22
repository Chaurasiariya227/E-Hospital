import "../styles/otpModal.css";

function OTPModal({isOpen,onClose}){

if(!isOpen)return null;

return(

<div className="modal-overlay">

<div className="modal-box">

<button
className="close-btn"
onClick={onClose}
>
✕

</button>

<h2>Verify OTP</h2>

<p>

Enter the 6-digit OTP sent to your mobile.

</p>

<input

type="text"

placeholder="Enter OTP"

/>

<button

className="submit-btn"

>

Verify OTP

</button>

</div>

</div>

);

}

export default OTPModal;