import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './IwantPopupStyles.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhone, faMessage } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import { PopularCarsDataProps } from '@/data/PopularCarsData'

type ContactFormValues = {
  name: string
  email: string
  phone: string
  car: string
}

type IwantPopupProps = {
  openWantPopup: boolean
  setOpenWantPopup: (isOpenContact: boolean) => void
  selectedCar: PopularCarsDataProps | null
}

const IwantPopup = ({ openWantPopup, setOpenWantPopup, selectedCar }: IwantPopupProps) => {
  const [sendLoading, setSendLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    mode: 'onBlur',
  })

  const handleCloseContactPopup = () => {
    setOpenWantPopup(false)
    reset() // Очищення форми
    document.body.style.overflow = 'auto'
  }

  const onSubmit = async (data: ContactFormValues) => {
    setSendLoading(true)

    try {
      const response = await fetch('/api/sendWant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log('Email sent successfully!')
        reset() // Очищення форми
        setSendLoading(false)
        handleCloseContactPopup()
        toast.success('Сообщение отправилось успешно!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else {
        console.error('Error sending email:', response.statusText)
        // Опціонально: додати код для відображення повідомлення про помилку відправки форми
      }
    } catch (error) {
      console.error('Error sending email:', error)
      // Опціонально: додати код для відображення повідомлення про помилку відправки форми
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Задній план ============= */}
      <div
        className={clsx(styles.modal_holder, openWantPopup ? styles.show_holder : '')}
        onClick={handleCloseContactPopup}
      ></div>
      {/* Задній план ============= */}

      {/* Контентна частина ============= */}
      <div className={clsx(styles.modal_window, openWantPopup ? styles.show_window : '')}>
        <div className={styles.modal_header}>
          <button className={styles.modal_close} onClick={handleCloseContactPopup}>
            Закрыть
          </button>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.content_title}>
            <h2>Свяжитесь с нами</h2>
          </div>
          <div className={styles.inputs_inner}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs_form}>
              <div className={styles.input_block}>
                <input
                  {...register('car')}
                  type="text"
                  value={selectedCar?.name || ''}
                  readOnly
                  className={clsx(styles.input__field)}
                />
              </div>
              <div className={styles.input_block}>
                <label className={styles.input_label}>
                  <FontAwesomeIcon icon={faUser} />
                  Как к вам обращаться?
                </label>
                <input
                  {...register('name', { required: 'Поле обязательно' })}
                  type="text"
                  placeholder="Sonic"
                  className={clsx(styles.input__field, errors.name ? styles.input__field__fail : '')}
                />
                {errors.name && <span className={styles.error_message}>{errors.name.message}</span>}
              </div>
              <div className={styles.input_block}>
                <label className={styles.input_label}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  Емайл
                </label>
                <input
                  {...register('email', {
                    required: 'Введен неверный адрес эл. почты',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Введите корректную эл. почту',
                    },
                  })}
                  type="email"
                  placeholder="example@gmail.com"
                  className={clsx(styles.input__field, errors.email ? styles.input__field__fail : '')}
                />
                {errors.email && <span className={styles.error_message}>{errors.email.message}</span>}
              </div>
              <div className={styles.input_block}>
                <label className={styles.input_label}>
                  <FontAwesomeIcon icon={faPhone} />
                  Телефон
                </label>
                <input
                  {...register('phone', {
                    required: 'Введите номер мобильного телефона',
                    pattern: {
                      value: /((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/g,
                      message: 'Введите корректный номер мобильного телефона',
                    },
                  })}
                  type="tel"
                  placeholder="+380630000000"
                  className={clsx(styles.input__field, errors.phone ? styles.input__field__fail : '')}
                />
                {errors.phone && <span className={styles.error_message}>{errors.phone.message}</span>}
              </div>

              {sendLoading ? (
                <div className="loader__inner">
                  <div className="loader"></div>
                </div>
              ) : (
                <button type="submit" disabled={!isValid} className={styles.btn_contact}>
                  <span>Отправить</span>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* Контентна частина ============= */}
    </>
  )
}

export default IwantPopup
