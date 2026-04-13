import notesData from './notesConfig.json';

export const notesConfig = notesData;

export const getSubjects = () => {
  return Object.keys(notesData);
};

export const getTopics = (subject) => {
  return notesData[subject]?.topics || {};
};

export const getNotes = (subject, topic) => {
  return notesData[subject]?.topics[topic]?.notes || [];
};