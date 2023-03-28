import { User } from "@/models/user";

type InitialState = {
  token: string | null;
  email: string | null;
  id: string | number | null;
  loading: boolean;
  userList: User[];
}

export const initialState: InitialState = {
  token: null,
  email: null,
  id: null,
  loading: false,
  userList: []
};

export const previousState = [];