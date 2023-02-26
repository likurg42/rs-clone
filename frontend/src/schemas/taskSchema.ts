import * as yup from 'yup';

const getTaskSchema = () => yup.object().shape({
  task: yup.string().required().max(144),
  description: yup.string().max(255),
});

export default getTaskSchema;
