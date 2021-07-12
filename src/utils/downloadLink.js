import axios from 'axios';
import fileDownload from "js-file-download";
import loading from './loading';
import swal from 'sweetalert2';

const downloadLink = (url, filename) => {
  loading('Downloading File...');
  axios.get(url, {
    responseType: "blob"
  }
  ).then((res) => {
    swal.fire({
      text: 'File downloaded',
      icon:'success',
    });
    fileDownload(res.data, filename);
  }).catch((err) => {
    swal.fire({
      text: 'Unable to download passport',
      icon: 'error'
    })
  })
};

export default downloadLink;