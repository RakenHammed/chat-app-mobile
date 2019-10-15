import { User } from './user';

export class Message {
  _id?: string;
  conversationId?: string;
  senderId?: string;
  sender?: User;
  senderFullName?: string;
  receiversIds?: string[];
  receivers?: Array<{
    receiverId: string,
    isRead: boolean,
  }>;
  message?: string;
  userIsSender?: boolean;
  isRead?: boolean;
  status?: 'pending' | 'sent' | 'seen';
  purchaseId?: number;
  createdAt?: Date;
}
