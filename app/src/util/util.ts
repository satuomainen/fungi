export const convertEdibility = (stars: string | undefined = '') => {
  return stars
    .replace(/m/g, '†')
    .replace(/r/g, '★')
    .replace(/o/g, '◯')
    .replace(/t/g, '☠');
};

export const resolveImagePath = (image: string) => `${import.meta.env.BASE_URL}/images/${image}`;
