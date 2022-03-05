import * as React from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../components/Modal';

export default function Home() {
  const [showModal, setShowModal] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    setSubmitting(true);

    sendEmail(formData)
      .then((res) => {
        console.log(res.status);
        if (res.status !== 200) {
          throw new Error('Error at fetch');
        } else {
          setShowModal(true);
          setModalMessage('Thank you very much!');
          setSubmitting(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowModal(true);
        setModalMessage('Sorry, something went wrong!');
        setSubmitting(false);
      });

    // with 7.22.0  reset here without useEffect
    // reset('', {
    //   keepValues: false,
    // });
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: '', email: '', address: '', phone: '', message: '' });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className='font-body mx-1 my-3 px-2 md:px-6 lg:mx-auto lg:my-6 lg:max-w-6xl lg:px-10'>
      {/* form start */}
      <div className={`mx-auto lg:max-w-3xl`}>
        <div className={` border-[2px] border-gray-800 bg-orange-100 p-10 text-base lg:text-lg`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className='mb-6 grid grid-cols-3 items-center'>
              <label htmlFor='name' className='col-span-1 xl:ml-12'>
                name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder=''
                {...register('name', { required: true })}
                className='col-span-2 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-orange-600 focus:outline-none'
              />
              <div className='col-start-1'></div>
              {errors.name?.type === 'required' && (
                <span className='col-span-2 py-2 text-xs text-red-500 lg:text-sm'>
                  input please
                </span>
              )}
            </div>
            {/* email */}
            <div className='mb-6 grid grid-cols-3 items-center'>
              <label
                htmlFor='email'
                className='col-span-1 text-sm text-gray-600 lg:text-lg xl:ml-12'
              >
                email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='info@info.com'
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className='col-span-2 border-[1px] border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-orange-600 focus:outline-none lg:text-lg'
              />
              <div className='col-start-1'></div>
              {errors.email?.type === 'required' && (
                <span className='col-span-2 py-2 text-sm text-red-500'>input please</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className='col-span-2 py-2 text-xs text-red-500 lg:text-sm'>wrong</span>
              )}
            </div>
            {/* phone number*/}
            <div className='mb-6 grid grid-cols-3 items-center'>
              <label
                htmlFor='phone'
                className='col-span-1 mr-2 text-sm text-gray-600 lg:text-lg xl:ml-12'
              >
                Phone Number
              </label>
              <input
                type='text'
                id='phone'
                name='phone'
                placeholder='012-3456-7890'
                {...register('phone', { required: true })}
                className='col-span-2 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-orange-600 focus:outline-none'
              />
              <div className='col-start-1'></div>
              {errors.phone?.type === 'required' && (
                <span className='col-span-2 py-2 text-xs text-red-500 lg:text-sm'>
                  input please
                </span>
              )}
            </div>
            {/* address */}
            <div className='mb-6 grid grid-cols-3 items-center'>
              <label htmlFor='address' className='text-gray-600 xl:ml-12'>
                address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                placeholder=''
                {...register('address', { required: true })}
                className='col-span-2 border border-gray-300 px-3 py-2 text-xs placeholder-gray-400 focus:border-orange-600 focus:outline-none lg:text-lg'
              />
              <div className='col-start-1'></div>
              {errors.address?.type === 'required' && (
                <span className='col-span-2 py-2 text-xs text-red-500 lg:text-sm'>
                  input please
                </span>
              )}
            </div>

            {/* message */}
            <div className='mb-6 grid grid-cols-3 items-baseline'>
              <label htmlFor='message' className='text-gray-600 xl:ml-12'>
                message
              </label>
              <textarea
                name='message'
                type='text'
                rows='5'
                id='message'
                placeholder=''
                {...register('message', { required: true })}
                className='col-span-2 border border-gray-300 px-1 py-2 text-xs placeholder-gray-400 focus:border-orange-600 focus:outline-none lg:px-3 lg:text-lg'
              />
              <div className='col-start-1'></div>
              {errors.message?.type === 'required' && (
                <span className='col-span-2 py-2 text-xs text-red-500 lg:text-sm'>
                  input please
                </span>
              )}
            </div>

            {/* submit button*/}
            <div className='mb-6 grid grid-cols-3 items-baseline'>
              <div className='col-start-1'></div>
              <button
                type='submit'
                disabled={submitting}
                className='col-span-2 border-[1.5px] border-orange-600 px-3 py-3 font-medium transition duration-200 hover:bg-second hover:text-orange-900 focus:outline-none xl:px-2'
              >
                {submitting ? 'submitting' : 'submit'}
              </button>
            </div>
          </form>
          <Modal showModal={showModal} setShowModal={setShowModal} message={modalMessage} />
        </div>
      </div>
    </section>
  );
}
