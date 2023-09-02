import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MessagesService } from 'src/app/Services/messages.service';

interface Message {
  id: number,
  senderId: any,
  receiverId: number,
  content: string,
  timestamp: string,
  isEditing: boolean;

}
@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})

export class MessageHistoryComponent implements OnInit {
  messages!: Message[];
  newMessage: string = '';
  // loggedInUserId: string | null = null;
  sendForm: FormGroup | undefined; 
  editForm!: FormGroup;
  contextMenuX = 0;
  contextMenuY = 0;
  contextMenuVisible = false;
  contextMenuMessage : Message | null = null;
  loggedInUserId = this.auth.getLoggedInUserId();
  messagesFound: boolean = true
  
  
  constructor(private message: MessagesService,
              private auth: AuthService, 
              private route: ActivatedRoute, 
              private form: FormBuilder) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['userId'];
      this.message.receiverId = userId;
      this.message.getConversationHistory(userId).subscribe((res=>{
        const ascendingMessages = res.messages.reverse();
        this.messages =[];
        this.messages.push(...ascendingMessages);
        this.messagesFound = this.messages.length >0 ;
        console.log(res)
      }));
      this.sendForm = this.form.group({
        message: ['', Validators.required]
      });
      this.editForm = this.form.group({
        editedMessage: ['', Validators.required]
      })
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
        console.log(loggedInUserId)
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
              this.message.getConversationHistory(userId).subscribe((res=>{
                const ascendingMessages = res.messages.reverse();
                this.messages =[];
                this.messages.push(...ascendingMessages);
                console.log(res)
              }));
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
    openContextMenu(event: MouseEvent, selectedMessage: any){
      event.preventDefault();
      console.log(selectedMessage.senderId)
      console.log(this.loggedInUserId)
      if(selectedMessage.senderId == this.loggedInUserId){
        this.contextMenuX = event.clientX;
        this.contextMenuY = event.clientY;
        this.contextMenuVisible = true;
        this.contextMenuMessage = selectedMessage;
      }
    }
    closeContextMenu(){
      this.contextMenuVisible = false;
    }

    @HostListener('document: click', ['$event'])
    onDocumentClick(event: MouseEvent){
      if(!this.contextMenuVisible) return;
      this.closeContextMenu();
    }
    onEdit(){
      if(this.contextMenuMessage !== null){
        this.contextMenuMessage.isEditing =true;
        this.editForm.patchValue({editedMessage: this.contextMenuMessage.content});
      }
      this.closeContextMenu
    }
    onSave(){
      if(this.contextMenuMessage !== null && this.contextMenuMessage.id !== null)
      {
        const userId = this.message.receiverId;
        if(userId !== null){
          this.message.editMessage(this.contextMenuMessage.id, this.editForm.value.editedMessage).subscribe(res=>{
            console.log(res)
            this.editForm.reset();
            this.message.getConversationHistory(userId).subscribe((res=>{
              const ascendingMessages = res.messages.reverse();
              this.messages =[];
              this.messages.push(...ascendingMessages);
              console.log(res)
            }));
          })
        }
        else{
          console.error("error")
        }
      }
    }
    onCancel(){
      if (this.contextMenuMessage !== null) {
        this.contextMenuMessage.isEditing = false;
      }
      this.closeContextMenu();
    }
    onDelete(){
    if(this.contextMenuMessage !== null){
      const userId= this.message.receiverId;
      if(userId !== null){
        this.message.deleteMessage(this.contextMenuMessage.id).subscribe(res=>{
          this.message.getConversationHistory(userId).subscribe((res=>{
            const ascendingMessages = res.messages.reverse();
            this.messages =[];
            this.messages.push(...ascendingMessages);
            console.log(res)
          }))
        })
      }
    }
    }
}

  
