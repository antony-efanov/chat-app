import { User } from "@/types/User";
import { Room } from "@/types/Room";

export type Message = {
  text: string;
  sender: User;
  toRoomId: string;
};
