import Swal from 'sweetalert2'

export const showSuccessMessage = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  })
}

export const showErrorMessage = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  })
}
