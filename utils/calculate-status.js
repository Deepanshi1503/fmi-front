export const calculateProgress = (completionStatuses) => {
  const totalSteps = completionStatuses.length;
  const completedSteps = completionStatuses.filter(Boolean).length;
  return Math.floor((completedSteps / totalSteps) * 100);
};
