import {
  signWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signWithGooglePopup();
    createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>sign In page</h1>
      <button onClick={logGoogleUser}>sign in with google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
