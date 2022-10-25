import AccountModel from "../../models/Account";

const generateAccount = (length: number): string => {
  const chars = "1234567890";

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";
  for (let i = 0; i < length; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

const setAccountNumber = async (accountNumber: string) => {
  const account = await AccountModel.findOne({ accountNumber });

  if (!account) {
    return accountNumber;
  } else {
    const accountNumber = generateAccount(10);
    setAccountNumber(accountNumber);
  }
};

const accountNumber = generateAccount(10);
const testAccountNumber = setAccountNumber(accountNumber);

export default testAccountNumber;
