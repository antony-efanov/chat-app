import { User } from "@/types/User";

export type Message = {
  text: string;
  sender: User | "SYSTEM";
  toRoomId: string;
};
