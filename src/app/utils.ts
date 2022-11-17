export const getDateDebutPublicationsEnCours = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 60);
}
