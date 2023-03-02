import * as yup from 'yup';

const getTaskSchema = () => yup.object().shape({
  title: yup.string().required().max(144),
  projectId: yup.string(),
  contextId: yup.string(),
});

export default getTaskSchema;
