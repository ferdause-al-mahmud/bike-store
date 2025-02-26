export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  status: 'active' | 'blocked';
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TPasswordChange = {
  password: string;
  newPassword: string;
};
