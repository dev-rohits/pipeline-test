import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
const DEFAULT_DURATION = 500;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: '0'})),
      state('true', style({ height: AUTO_STYLE})),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in'))
    ])
  ],
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  faq: any[] = [
    {
      qus: 'Can I enroll for multiple courses?',
      ans: 'Yes, You can enroll for more than one course as long as you want to learn and explore.',
      expand: false
    },
    {
      qus: 'What is going to be my teacher’s teaching methodology?',
      ans: 'We have the most efficient teachers, who have a unique methodology of teaching which helps you learn without confusion or any doubts and understand the topics precisely.',
      expand: false
    },
    {
      qus: 'Will I get the recorded session, in case I miss a lecture?',
      ans: 'Yes, You could request the teacher for the recorded session of the same.',
      expand: false
    },
    {
      qus: 'How can I clear my doubts?',
      ans: 'We have the state of the art feature in our application, where the teachers assist the students concerning their doubts in group or one to one sessions. Be it anytime, the teachers make sure that your doubts are cleared in no time.',
      expand: false
    },
    {
      qus: 'Will I get a one on one mentoring session?',
      ans: 'Yes, Our teachers will certainly assist you in a one on one mentoring session in a breakout room which is an art feature in our application.',
      expand: false
    },
    {
      qus: 'From where can I get promotional or Coupon code for Nrich learning?',
      ans: 'The promotional coupon code will be available on our Official website. Keep visiting for more exciting offers and save money while learning at affordable prices.',
      expand: false
    },
    {
      qus: 'How can I connect on Nrich Learning Social Connect?',
      ans: 'Once the classes are over, in the social connection option, the students who have attended the similar class will be shown with their details. You can connect with them by simply sending a friend request.',
      expand: false
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
