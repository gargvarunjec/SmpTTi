import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const handleChange = async ()=>{
            try {
                  const provider = new GoogleAuthProvider();
                  const auth = getAuth(app);

                  const result = await signInWithPopup(auth,provider);
                  
                  const res = await fetch('api/auth/google',{
                        method:'POST',
                        headers:{
                              'Content-type':'application/json',
                        },
                        body: JSON.stringify({
                              name: result.user.displayName,
                              email: result.user.email,
                              photo: result.user.photoURL,
                        })
                  });

                  const data = await res.json();
                  dispatch(signInSuccess(data));
                  navigate('/');
            } catch (error) {
                  console.log('Could not Sign in with google',error);
            }
      }
  return (
    <button onClick={handleChange} type='button'className='bg-red-700 p-3 rounded-lg text-white hover:opacity-95'>Continue With Google</button>
  )
}
