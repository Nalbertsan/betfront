import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifies = {
  sucess: (alerta: string) => {
    toast.success(alerta, {
      position: 'top-center',
      autoClose: 3000,
      closeButton: false,
      pauseOnHover: false,
      theme: 'dark',
      className: 'mt-10',
    });
  },
  error: (alerta: string) => {
    toast.error(alerta, {
      position: 'top-center',
      autoClose: 3000,
      closeButton: false,
      pauseOnHover: false,
      theme: 'dark',
      className: 'mt-10',
    });
  },
  notification: (alerta: string) => {
    toast.info(alerta, {
      position: 'top-center',
      autoClose: 5000,
      closeButton: true,
      pauseOnHover: false,
      theme: 'colored',
      className: 'mt-10',
    });
  },
  Container: ToastContainer,
};

export default notifies;
