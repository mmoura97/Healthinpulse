const STORAGE_KEY = "hip_accounts_v7";

export function getAccounts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function saveAccounts(accounts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function createAccount({ name, email, password }) {
  const accounts = getAccounts();

  const exists = accounts.find((account) => account.email === email);

  if (exists) {
    throw new Error("E-mail já cadastrado.");
  }

  const newAccount = {
    id: `acc_${Date.now()}`,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  accounts.push(newAccount);
  saveAccounts(accounts);

  return newAccount;
}

export function loginPatient(email, password) {
  const accounts = getAccounts();

  const account = accounts.find(
    (item) => item.email === email && item.password === password
  );

  if (!account) {
    throw new Error("E-mail ou senha inválidos.");
  }

  return account;
}

export function createDemoAccount() {
  const accounts = getAccounts();

  let demo = accounts.find((item) => item.email === "joao@healthinpulse.com");

  if (!demo) {
    demo = {
      id: "acc_demo",
      name: "João Oliveira",
      email: "joao@healthinpulse.com",
      password: "demo123",
      createdAt: new Date().toISOString(),
    };

    accounts.push(demo);
    saveAccounts(accounts);
  }

  return demo;
}