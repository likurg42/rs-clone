import * as yup from 'yup';

const getTaskSchema = () => yup.object().shape({
  title: yup.string().required().max(144),
  description: yup.string().max(255),
  projectId: yup.number().nullable(),
  contextId: yup.number().nullable(),
});

export default getTaskSchema;
