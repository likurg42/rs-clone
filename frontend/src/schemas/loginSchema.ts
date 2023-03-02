import * as yup from 'yup';

const getLoginSchema = () => yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default getLoginSchema;
