import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import Debt from 'src/app/models/dug.model';
import Loaners from 'src/app/models/loaners.model';
import { DebtService } from 'src/app/services/debt.service';
import { LoanersService } from 'src/app/services/loaners.service';
import emailjs, {
  EmailJSResponseStatus
} from 'emailjs-com';
@Component({
  selector: 'app-new-debt',
  templateUrl: './new-debt.component.html',
  styleUrls: ['./new-debt.component.css']
})
export class NewDebtComponent implements OnInit {

  @Output() someEvent = new EventEmitter<string>();
  constructor(private fb: FormBuilder, private debtService: DebtService, private loanerService: LoanersService) { }
  opis: string;
  iznos: number;
  picker: any;

  myForm: Form;
  date: Date;
  loaner: Loaners;
  ngOnInit(): void {

    this.loaner = JSON.parse(localStorage.getItem("chosenLoaner") || '{}');
  }


  submitCompany(form: any) {

    var d = new Debt();
    d.opis = form.value.opis;
    d.value = form.value.iznos;
    this.date.setSeconds(0);
    this.date.setMinutes(0);
    this.date.setHours(0);
    d.image = "";
    d.id = "";
    d.user = this.loaner.id!;
    d.date = this.date.getTime() * (-1);




    var newValue = this.loaner.totalDebt! - form.value.iznos;


    this.debtService.add(d, this.loaner.id);
    this.loanerService.update(this.loaner.id!, { totalDebt: newValue })
      .then(() => {
        this.loaner.totalDebt = newValue;
        localStorage.setItem("chosenLoaner", JSON.stringify(this.loaner));
        if (form.value.iznos > 1499 && this.loaner.name! != "Vanja" && this.loaner.name! != "SOSIKA" && this.loaner.name! != "Danijela") {
          var email_text = this.loaner.name! + "  " + form.value.iznos + "RSD";
          var templateParams = {
            subject: 'Nov dug',
            message: email_text,
            details: "Trenutno stanje: " + newValue + " RSD",
            store: localStorage.getItem("chosenStore")
          };

          emailjs.send('service_fg9d9hd', 'template_3ka5xxa', templateParams)
            .then(function (response) {
              console.log('SUCCESS!', response.status, response.text);

            }, function (error) {
              console.log('FAILED...', error);
            });
        
            if (this.loaner.id=="-MtxEzsi_RCANHaageS1"){
          emailjs.send('service_fg9d9hd', 'template_ho7o3pk', templateParams)
           .then(function(response) {
             console.log('SUCCESS!', response.status, response.text);

          }, function(error) {
              console.log('FAILED...', error);
           });
        }
          
          }
        alert("Uspesno dodato!");
        this.someEvent.next("0");
      })
      .catch(err => console.log(err));

  }

  dateChanged($event: any) {
    this.date = $event.target.value;
  }
}

