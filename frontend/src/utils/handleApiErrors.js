import { toast } from 'react-toastify';

export function handleApiErrors(error, setError) {
  if (error.response && error.response.data) {
    const { data } = error.response;
    toast.error(data.message);
    if (data.errors && data.errors.length > 0) {
      data.errors.forEach((err) => {
        setError(err.property, [
          err.constraints[Object.keys(err.constraints)[0]],
        ]);
      });
    }
  } else {
    alert(error.message);
  }
}
