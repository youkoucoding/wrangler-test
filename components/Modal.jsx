const Modal = ({ showModal, setShowModal, message }) => {
  return (
    <>
      {showModal && (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden font-TitleZenMaru outline-none focus:outline-none'>
            <div className='relative my-6 mx-auto max-w-xs xl:max-w-md'>
              {/*content*/}
              <div className='relative flex w-full flex-col border-0 bg-orange-50 shadow-lg outline-none focus:outline-none'>
                {/*body*/}
                <div className='relative flex-auto p-6'>
                  <p className='my-4 mx-6 text-lg  leading-relaxed text-orange-800'>{message}</p>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end border-t border-solid p-6'>
                  <button
                    className='border-[1.5px] border-orange-600 px-4 py-1 font-semibold text-orange-800 transition duration-500 hover:bg-second hover:text-white focus:outline-none md:px-6'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-50'></div>
        </>
      )}
    </>
  );
};

export default Modal;
