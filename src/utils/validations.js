const validations = {
  numeric: /^[0-9]*$/,
  letters: /^[a-zA-Z]+$/,
  alphanumeric: /^[a-zA-Z0-9]*$/,
  alphanumericspaces: /^[a-zA-Z0-9 ]*$/,
  isValidEmail: (emailInput) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(emailInput);
  },
  isAtLeastSixCharacters: (input) => {
    const regex = /.{6,}/;
    return regex.test(input);
  },
};
export default validations;
