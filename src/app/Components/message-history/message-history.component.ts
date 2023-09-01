import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MessagesService } from 'src/app/Services/messages.service';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  loggedInUserId: string | null = null;
  sendForm: FormGroup | undefined; 

  
  constructor(private message: MessagesService, private auth: AuthService, private route: ActivatedRoute, private form: FormBuilder) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['userId'];
      this.message.receiverId = userId;
      this.message.getConversationHistory(userId).subscribe((res=>{
        const ascendingMessages = res.messages.reverse();
        this.messages =[];
        this.messages.push(...ascendingMessages);
        console.log(res)
      }));
      this.sendForm = this.form.group({
        message: ['', Validators.required]
      });
    })}
    
    getMessageClasses(message: any): any {
      const loggedInUserId = this.auth.getLoggedInUserId();
      return {
        'messageBox': true,
        'sentClass': message.senderId === loggedInUserId,
        'receivedClass': message.senderId !== loggedInUserId
      };
    }
    sendMessage() {
      if (this.message.receiverId && this.newMessage.trim() !== '') {
        const loggedInUserId = this.auth.getLoggedInUserId();
        if (loggedInUserId !== null) {
          const userId = this.message.receiverId ? this.message.receiverId : -1;
          this.message.sendMessage(loggedInUserId, userId, this.newMessage).subscribe(
            (res: any) => { 
              if (this.message.selectedUser) {
                if (!this.message.selectedUser.messages) {
                  this.message.selectedUser.messages = []; 
                }
                this.message.selectedUser.messages.push(res.newMessage);
                
                // Clear the input field after successfully sending a message
                this.newMessage = ''; // Clear the input field
              }
            },
            error => {
              console.error(error);
            }
          );
        } else {
          console.error('Logged in user ID is null');
        }
      }
    }
    
    
}

  
