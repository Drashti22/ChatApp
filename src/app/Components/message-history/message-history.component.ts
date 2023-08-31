import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MessagesService } from 'src/app/Services/messages.service';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
  messages: any[] = [];
  @Input() selectedUserId!: number ;
  loggedInUserId: string | null = null;
  constructor(private message: MessagesService, private auth: AuthService) {}
  
  ngOnInit() {
    console.log('Selected User ID:', this.selectedUserId);
    const loggedInUserId = this.auth.getLoggedInUserId();
    this.fetchMessages();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes:', changes); 
    if (changes['selectedUserId']) {
      this.fetchMessages();
    }
  }
  fetchMessages(){
    const loggedInUserId = this.auth.getLoggedInUserId();
    console.log('loggedInUserId:', loggedInUserId);

  if (loggedInUserId !== null && this.selectedUserId !== null) {
    this.message.getConversationHistory(loggedInUserId.toString(), this.selectedUserId).subscribe(
      res => {
        this.messages = res.messages;
        console.log(res);
      },
      error => {
        console.error(error);
      }
    );
  } else {
    console.error('Logged In UserId or selectedUserId is missing !!');
  }
}
getMessageClasses(message: any): any {
  const loggedInUserId = this.auth.getLoggedInUserId();
  return {
    'messageBox': true,
    'sentClass': message.senderId === loggedInUserId,
    'receivedClass': message.senderId !== loggedInUserId
  };
}
}
