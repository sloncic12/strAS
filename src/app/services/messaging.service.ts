import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  someKey = "AAAACdwUHyA:APA91bFPO1FJdupzedxymmODHbmjwv6fGzCWsW9Vp-x0Bj8XMqHfzX4DvIsFekUllR-Lfp3Jpbko7_ftosJmLn_tDFn1H-4VkzypaP-ZWXBqYgWmSvbWe6KoU_BZpazw95gm9FctshTR"
  
  headerss: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAACdwUHyA:APA91bFPO1FJdupzedxymmODHbmjwv6fGzCWsW9Vp-x0Bj8XMqHfzX4DvIsFekUllR-Lfp3Jpbko7_ftosJmLn_tDFn1H-4VkzypaP-ZWXBqYgWmSvbWe6KoU_BZpazw95gm9FctshTR'
  });


  constructor(private http: HttpClient) { }


    

sendNotif(body:any){
  this.http.post("https://fcm.googleapis.com/fcm/send", body,{headers: this.headerss}).subscribe(
    data => console.log('success', data),
    error => console.log('oops', error))
  }
}
