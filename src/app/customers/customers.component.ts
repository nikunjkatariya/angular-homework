import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [NgbModal, NgbModalConfig]
})
export class CustomersComponent implements OnInit {
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, private service: CrudService, private builder: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  checkme=false;
  formtype=true;
  ngOnInit(): void {
    this.service.getCustomerList().subscribe((data) => this.showCustomers(data));
  }

  customerList: any;
  showCustomers(data: any) {
    this.customerList = data;
    console.log(this.customerList);
    
    this.customerForm = this.builder.group({
      id:[''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth:['',Validators.required],
      currrent_houseno: ['', Validators.required],
      currrent_street: ['', Validators.required],
      currrent_city: ['', Validators.required],
      currrent_zipcode: ['', Validators.required],
      permenant_houseno: ['', Validators.required],
      permenant_street: ['', Validators.required],
      permenant_city: ['', Validators.required],
      permenant_zipcode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  customerForm: any;

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  // change(){
  //   if(!this.checkme){
  //     this.checkme=true;
  //     this.customerForm.permenant_houseno=this.customerForm.currrent_houseno;
  //   }
  //   else{
  //     this.checkme=false;
  //     alert(this.checkme);
  //   }
  // }

  modifyData(content: any, data:any) {
    this.formtype=false;
    this.modalService.open(content, { size: 'lg' });
      this.customerForm = this.builder.group({
        id:[data.id],
        first_name: [data.first_name, Validators.required],
        last_name: [data.last_name, Validators.required],
        date_of_birth:[data.date_of_birth,Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        phone_number: [data.phone_number, [Validators.required, Validators.minLength(10)]],
        currrent_houseno: [data.current_address.houseno, Validators.required],
        currrent_street: [data.current_address.street, Validators.required],
        currrent_city: [data.current_address.city, Validators.required],
        currrent_zipcode: [data.current_address.zipcode, Validators.required],
        permenant_houseno: [data.permenant_address.houseno, Validators.required],
        permenant_street: [data.permenant_address.street, Validators.required],
        permenant_city: [data.permenant_address.city, Validators.required],
        permenant_zipcode: [data.permenant_address.zipcode, Validators.required]
      });
  }

  randomid=Math.floor(Math.random() * 100);
  addcustomerData(Form:FormGroup) {
      this.formtype=true;
      this.customerForm = {
      "id": this.randomid,
      "first_name": Form.value.first_name,
      "last_name": Form.value.last_name,
      "date_of_birth": Form.value.date_of_birth,
      "current_address": {
        "houseno": Form.value.currrent_houseno,
        "street": Form.value.currrent_street,
        "city": Form.value.currrent_city,
        "zipcode": Form.value.currrent_zipcode
      },
      "permenant_address": {
        "houseno": Form.value.permenant_houseno,
        "street": Form.value.permenant_street,
        "city": Form.value.permenant_city,
        "zipcode": Form.value.permenant_zipcode
      },
      "email": Form.value.email,
      "phone_number": Form.value.phone_number
    }
    this.service.postCustomer(this.customerForm).subscribe(data=>{
      this.showCustomers(data);
    });
  }

  updatecustomerData(Form: any) {
    alert(Form.value.id);
    this.customerForm = {
      "id": Form.value.id,
      "first_name": Form.value.first_name,
      "last_name": Form.value.last_name,
      "date_of_birth": Form.value.date_of_birth,
      "current_address": {
        "houseno": Form.value.currrent_houseno,
        "street": Form.value.currrent_street,
        "city": Form.value.currrent_city,
        "zipcode": Form.value.currrent_zipcode
      },
      "permenant_address": {
        "houseno": Form.value.permenant_houseno,
        "street": Form.value.permenant_street,
        "city": Form.value.permenant_city,
        "zipcode": Form.value.permenant_zipcode
      },
      "email": Form.value.email,
      "phone_number": Form.value.phone_number
    }
    this.service.putCustomer(this.customerForm.id,this.customerForm);
  }

  deletecustomerData(Form:any){
    this.service.deleteCustomer(Form.id).subscribe(data=>{
      alert(Form.first_name+ " "+Form.last_name +" Deleted!");
    });
    this.service.getCustomerList().subscribe(data=>this.showCustomers(data));
  }
}
