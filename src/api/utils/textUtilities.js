export function truncateAddress(address) {
  return address.slice(0, 5) + "..." + address.slice(-4);
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
