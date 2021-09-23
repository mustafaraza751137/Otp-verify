import React from 'react';
import firebase from './firebase';
import classes from './App.module.css';

class App extends React.Component {
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }
  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          alert("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
  }
  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      window.location.reload();
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  render() {
    return (
      <div>
        <div className={classes.heading}>
          <h1>Phone Verification</h1>
        </div>
        <div className={classes.otpForm}>
          <form className={classes.mobile} onSubmit={this.onSignInSubmit}>
            <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
            <button type="submit">Send OTP</button>
          </form>

          <p>Enter the OTP you received on your mobile no.</p>
          <form className={classes.otp} onSubmit={this.onSubmitOTP}>
            <div className={classes.divOuter}>
              <div className={classes.divInner}>
                <input 
                  className={classes.partitioned} 
                  name="otp"
                  onChange={this.handleChange}
                  type="text" 
                  maxlength="6" 
                  onKeyPress="if(this.value.length==6) return false;"
                />
              </div>
            </div>
            <div className={classes.otpVerifyBtn}>
              <button type="submit">Verify Phone Number</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default App