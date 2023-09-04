import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/Services/log.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit{
  public logs: any = [];
  public selectedTimeframe: string = 'Last 5 mins';
  customDateTime: Date = new Date()
  
  constructor(private log: LogService,  )  {}
  
  ngOnInit(): void {
    this.filterLogs();
}
    
    getLogs(){
      const startTime = '';
      const endTime = '';
      this.log.getLogs(startTime, endTime).subscribe((res)=>{
        this.logs = res;
      })
    }
    onTimeframeChange() {
      if (this.selectedTimeframe !== 'Custom') {
        this.filterLogs();
      }
    }
    onCustomDateTimeChange() {
      if (this.selectedTimeframe === 'Custom') {
        this.filterLogs();
      }
    }
      filterLogs(){
        if(this.selectedTimeframe !== 'Custom'){
        const now = new Date();
        let startTime: Date;
        switch(this.selectedTimeframe){
          case 'Last 5 Min':
            startTime = new Date(now.getTime() - 5 * 60 * 1000);
            break;
          case 'Last 10 Min':
            startTime = new Date(now.getTime() - 10 * 60 * 1000);
            break;
          case 'last 30 Min':
            startTime = new Date(now.getTime() - 30 * 60 * 1000);
            break;
          default:
            startTime = new Date();
        }
        const endTime = new Date();

        this.log.getLogs(startTime.toISOString(), endTime.toISOString()).subscribe((res)=>{
          this.logs = res;
        });
      }else if(this.customDateTime){
        const customStartTime = this.customDateTime;
        const customEndTime = new Date();
        this.log.getLogs(customStartTime.toISOString(), customEndTime.toISOString()).subscribe((res)=>{
          this.logs = res;
        });
      }else{
        this.logs = [];
      }
      }
}


