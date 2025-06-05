export const convertEdibility = (stars: string | undefined = '') => {
  return stars
    .replace(/m/g, '†')
    .replace(/r/g, '★')
    .replace(/o/g, '◯')
    .replace(/t/g, '☠');
};
