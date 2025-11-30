export const formatPhoneNumber = (value: string) => {
  // remove all non-digits
  const phone = value.replace(/\D/g, "");

  if (phone.length <= 3) {
    return `(${phone}`;
  } else if (phone.length <= 6) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
  } else {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  }
};
