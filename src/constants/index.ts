export const role = {
  superAdmin: "SUPER_ADMIN",
  admin: "ADMIN",
  user: "USER",
  agent: "AGENT",
};

export const transactionTypes = [
  { value: "ADD_MONEY", label: "Add Money" },
  { value: "WITHDRAW_MOENY", label: "Withdraw" },
  { value: "SEND_MONEY", label: "Send Money" },
  { value: "CASH_IN", label: "Cash In" },
  { value: "CASH_OUT", label: "Cash Out" },
];

export const transactionStatus = [
  { value: "PENDING", label: "Pending" },
  { value: "COMPLETED", label: "Completed" },
  { value: "REVERSED", label: "Reversed" },
];
