import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
const DEFAULT_DURATION = 500;
@Component({
  selector: 'app-contact-nrich',
  templateUrl: './contact-nrich.component.html',
  styleUrls: ['./contact-nrich.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: '0'})),
      state('true', style({ height: AUTO_STYLE})),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in'))
    ])
  ],
})
export class ContactNrichComponent implements OnInit {
  enquiry!: FormGroup
  panelOpenState = false;
  constructor(
    private fb: FormBuilder,
    private instituteService: InstituteService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.enquiry = this.fb.group({
      name: ['', Validators.required],
      email:['',Validators.required],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      message: ['', Validators.required],
    });
  }
  get controls() {
    return this.enquiry.controls;
  }

  scrolltop(id: any) {
    let el = document.getElementById(id);
    el?.scrollIntoView();
  }

  submit() {
    if (this.enquiry.status == 'VALID') {
      this.instituteService.saveEnquiry(this.enquiry.value).subscribe(
        (res) => {
          this.enquiry.get('id')?.setValue('');
          this.enquiry.get('name')?.setValue('');
          this.enquiry.get('mobileNumber')?.setValue('');
          this.enquiry.get('email')?.setValue('');
          this.enquiry.get('message')?.setValue('');
          Swal.fire('Inquiry sent to Nrich Learning!', '', 'success');
        },
        (err) => {
          Swal.fire('Error while submitting inquiry!', '', 'error');
        }
      );
    } else {
      Swal.fire('Please provide correct information', '', 'error');
    }
  }

  onlyNumeric(event: any) {
    const keyCode = event.keyCode;
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      keyCode === 8 ||
      keyCode === 46 ||
      (keyCode >= 37 && keyCode <= 40) ||
      (keyCode >= 96 && keyCode <= 105)
    )
      return true;
    return false;
  }

  faq: any[] = [
    {
      qus: 'I have Sign-up related issues.',
      ans: 'Yes, You can enroll for more than one course as long as you want to learn and explore.',
      expand: false
    },
    {
      qus: 'I have Payment related issues?',
      ans: 'We have the most efficient teachers, who have a unique methodology of teaching which helps you learn without confusion or any doubts and understand the topics precisely.',
      expand: false
    },
    {
      qus: 'How can i get a demo of your product?',
      ans: 'Yes, You could request the teacher for the recorded session of the same.',
      expand: false
    },
    {
      qus: 'I have trouble accessing my portal',
      ans: 'We have the state of the art feature in our application, where the teachers assist the students concerning their doubts in group or one to one sessions. Be it anytime, the teachers make sure that your doubts are cleared in no time.',
      expand: false
    },
    {
      qus: 'What are the other communication Channels you have?',
      ans: 'Yes, Our teachers will certainly assist you in a one on one mentoring session in a breakout room which is an art feature in our application.',
      expand: false
    },

  ];
}
