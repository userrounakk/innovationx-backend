const mailSender = require("../controller/mail-controller")

module.exports = async function sendOTP(to,otp){
    html = `<center>
    <img src="https://userrounakk.com/event-yatra.png" alt="logo" />
      <div class="card" style="background-color: white">
        <h1>Email Verification</h1>
        <p>
          It seems you are registering at Event Yatra and trying to verify your
          email.
        </p>
        <p>
          Here is the verificaiton code. Please copy it and verify your email
        </p>
        <div
          class="code"
          style="
            background-color: rgba(0, 0, 0, 0.05);
            margin: 0 10%;
            padding: 2px;
          "
        >
          <h2>Code: ${otp}</h2>
        </div>
        <p>
          If this email is not entended to you please ignore and delete it.
          Thank you.
        </p>
      </div>
    </center>`
    mailSender(to,"Email Verification",html)
}