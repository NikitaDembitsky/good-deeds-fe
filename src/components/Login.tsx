import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styles from '../styles/Login.module.scss';
import Header from './Header';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import {loginUser} from '@/store/reducers/actions/AuthActionCreators';
import {useRouter} from 'next/router';

export default function Login() {
  const router = useRouter()
  const {users, error, isLoading} = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState: {errors}, watch, reset} = useForm({
    mode: 'onChange'
  });
  const [focusedField, setFocusedField] = useState('');
  const isSubmitButtonDisabled = !watch('email') || !watch('password') || !/\S+@\S+\.\S+/.test(watch('email'));

  const fields = [
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      required: true,
    },
    {
      type: 'password',
      label: 'Password',
      name: 'password',
      required: true,
    },
  ];

  const handleFocus = (fieldName: any) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const onSubmit = async ({email, password}: any) => {
    await dispatch(loginUser({email, password}))
    reset();
    if (!!localStorage.getItem('accessToken')) {
      router.replace('/profile')
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {isLoading ? <Loading /> : null}
      {error ? <Error message={error}/> : null}
      <Header/>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginWindow}>
            <h1 className={styles.title}>GoodDeed</h1>
            {fields.map((field) => (
              <div className={styles.field} key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  {...register(field.name, {required: field.required})}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={handleBlur}
                />
                {errors[field.name] && (
                  <div className={styles.error}>This field is required</div>
                )}
                {focusedField === field.name && (
                  <div className={styles.inputUnderline}/>
                )}
              </div>
            ))}
            <div className={styles.submitBtnWrapper}>
              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitButtonDisabled}
              >
                Login
                <span/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
