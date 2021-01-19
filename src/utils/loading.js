import swal from 'sweetalert2';

const loading = (text) => {
  swal.fire({
    text,
    allowOutsideClick: false
  })
  swal.showLoading();
};

export default loading;