import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConversationMessagesService } from 'src/app/services/conversation-messages.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  @ViewChild('content', { static: true }) private content: any;
  @ViewChild('chatInput', { static: true }) messageInput: ElementRef;
  messages: Message[];
  conversationId: string;
  editorMsg;
  receiverId;

  constructor(
    private conversationMessagesService: ConversationMessagesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getConversationMessages();
  }

  getConversationMessages() {
    const user = JSON.parse(localStorage.getItem('user'));
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const receiver: User = JSON.parse(queryParams.receiver);
    this.receiverId = receiver._id;
    if (user) {
      const participants: string[] = [receiver._id, user.id];
      this.conversationMessagesService.getConversationMessages(participants).subscribe(res => {
        console.log(res);
        if (typeof res === 'string') {
          this.conversationId = res;
        } else {
          this.messages = res.conversationMessages;
          this.conversationId = res.conversationId;
          this.messages = this.messages.map(message => {
            return this.filterMessageAndUpdateStatus(message, user);
          });
          console.log(this.messages);
          this.scrollToBottom();
        }
      });
    }
  }

  filterMessageAndUpdateStatus(message: Message, user: any): Message {
    message.senderFullName = message.sender.firstName + ' ' + message.sender.lastName;
    if (message.sender._id === user.id) {
      message.userIsSender = true;
    }
    if (!message.isRead && !message.userIsSender) {
      // this.purchaseMessageProvider.updateMessageStatusToRead(purchaseMessage.purchaseId, purchaseMessage.id)
      //   .subscribe(() => {
      //     this.socket.emit('update-message-status', purchaseMessage.id);
      //   });
    }
    if (message.userIsSender) {
      if (message.isRead) {
        message.status = 'seen';
      } else {
        message.status = 'sent';
      }
    }
    return message;
  }

  sendMessage() {
    console.log(this.conversationId);
    if (!this.editorMsg.trim()) { return; }
    const message: Message = {
      message: this.editorMsg,
      conversationId: this.conversationId,
      receiversIds: [this.receiverId],
      userIsSender: true,
      createdAt: new Date(),
    };
    this.editorMsg = '';
    this.focus();
    this.pushNewMessage(message);
    this.conversationMessagesService.sendMessage(message).subscribe(
      res => {
        this.messages.forEach(element => {
          if (element.message === message.message && element.userIsSender) {
            element.status = 'sent';
          }
        });
        // this.socket.emit('update-messages-list');
      },
      // err => this.purchaseMessageProvider.storeRequest(message),
    );
  }

  pushNewMessage(message: Message) {
    message.status = 'pending';
    this.messages.push(message);
    this.scrollToBottom();
  }

  focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 200);
  }

}
