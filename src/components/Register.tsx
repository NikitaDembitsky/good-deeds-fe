import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styles from '../styles/Register.module.scss';
import Header from './Header';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import {registerUser} from '@/store/reducers/actions/UserActionCreators';
import {useRouter} from 'next/router';

export default function Register() {
  const {user, isLoading, error, registrationStatus} = useAppSelector(state => state.userReducer)
  const router = useRouter()
  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {errors}, watch, reset} = useForm({
    mode: 'onChange'
  });
  console.log(error)
  const [focusedField, setFocusedField] = useState('');
  const isSubmitButtonDisabled = !watch('name') || !watch('email') || !watch('tag') || !watch('password') || !/\S+@\S+\.\S+/.test(watch('email'));

  const fields = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      required: true,
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      required: true,
    },
    {
      type: 'text',
      label: 'Tag',
      name: 'tag',
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

  const onSubmit = async ({name, email, tag, password}: any) => {
    await dispatch(registerUser({
      name,
      email,
      tag,
      password
    }))
    reset();
  };

  return (
    <div className={styles.goodDeedWrapper}>
      {isLoading ? <Loading /> : null}
      {error ? <Error message={error}/> : null}
      <Header/>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.goodDeedWindow}>
            <h1 className={styles.title}>GoodDeed</h1>
            {fields.map((field) => (
              <div className={styles.field} key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  {...register(field.name, {required: field.required})}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={handleBlur}
                />
                {errors[field.name] && (
                  <span className={styles.error}>
                  This field is required
                </span>
                )}
                <div
                  className={`${styles.inputUnderline} ${
                    focusedField === field.name ? styles.inputUnderlineActive : ''
                  }`}
                ></div>
              </div>
            ))}
            {registrationStatus && <div className={styles.okRegister}>Registration was successful, now you can log in <span className={styles.registrationLink} onClick={() => router.push('/login')}>Log in</span></div>}
            <div className={styles.submitBtnWrapper}>
              <button
                className={styles.button}
                disabled={isSubmitButtonDisabled}
                type="submit"
              >
                Register
                <span></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
