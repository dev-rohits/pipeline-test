import { DatePipe, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AssignmentDocumentPreviewComponent } from 'src/app/common/assignment-document-preview/assignment-document-preview.component';
import { LoaderService } from 'src/app/loader.service';
import { QuizUpdate, sections } from 'src/app/model/Quiz';
import { AuthService } from 'src/app/services/auth.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements OnInit {
  form!: FormGroup;
  now: any;
  isExamObjective: boolean = true;
  updateQuiz: QuizUpdate = new QuizUpdate();
  isSubmit: boolean = false;
  negativeMarksForQuiz: boolean = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '15rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '15rem',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    toolbarHiddenButtons: [['insertImage', 'insertVideo']],
  };
  filesToBeUploaded = new Map<string, File>();
  isUpdate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private quizApiService: QuizApiService,
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService,
    private location: Location
  ) {}
  ngOnInit(): void {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fetchQuiz();
  }

  fetchQuiz() {
    this.createForm();
    if (this.activatedRoute.snapshot.queryParamMap.get('id')) {
      this.isUpdate = true;
      this.quizApiService
        .fetchQuiz(this.activatedRoute.snapshot.queryParamMap.get('id'))
        .subscribe({
          next: (data: QuizUpdate) => {
            this.updateQuiz = data;
            this.updateForm();
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire('error', 'Internal Server Error', 'error');
          },
        });
    }
  }

  updateForm() {
    this.form = this.fb.group({
      id: [this.updateQuiz?.id],
      name: [this.updateQuiz?.name, Validators.required],
      examType: ['objective', Validators.required],
      marks: [this.updateQuiz?.marks, Validators.required],
      hour: [this.updateQuiz?.hour, Validators.required],
      minutes: [this.updateQuiz?.minutes, Validators.required],
      startTime: [this.updateQuiz?.startTime, Validators.required],
      endTime: [this.updateQuiz?.endTime, Validators.required],
      negtiveMarking: [this.updateQuiz?.negtiveMarking, [Validators.required]],
      negtiveMarks: [this.updateQuiz?.negtiveMarks],
      sections: this.fb.array([]),
    });
    this.updateQuiz.sections.forEach((value: sections) =>
      this.editSection(value)
    );
  }

  createForm() {
    this.form = this.fb.group({
      id: [this.updateQuiz?.id],
      name: [this.updateQuiz?.name, Validators.required],
      examType: ['objective', Validators.required],
      marks: [this.updateQuiz?.marks, Validators.required],
      hour: [this.updateQuiz?.hour, Validators.required],
      minutes: [this.updateQuiz?.minutes, Validators.required],
      startTime: [this.updateQuiz?.startTime, Validators.required],
      endTime: [this.updateQuiz?.endTime, Validators.required],
      negtiveMarking: [this.updateQuiz?.negtiveMarking, [Validators.required]],
      negtiveMarks: [this.updateQuiz?.negtiveMarks],
      sections: this.fb.array([this.createSectionItem()]),
    });
  }

  createSectionItem(dislayOrder?: number) {
    return this.fb.group({
      id: [''],
      sectionTitle: [''],
      sectionDescription: [''],
      displayOrder: [dislayOrder ? dislayOrder : 1],
      questions: this.fb.array([this.createQuestionItem()]),
    });
  }

  createQuestionItem(displayOrder?: number) {
    return this.fb.group({
      id: [''],
      questionTitle: [''],
      questionType: ['objective'],
      questionImage: [''],
      displayOrder: [displayOrder ? displayOrder : 1],
      marks: [''],
      answers: this.fb.array(this.createDefaultOptions()),
    });
  }

  createSingleQuestionItem(displayOrder: number) {
    return this.fb.group({
      id: [''],
      questionTitle: [''],
      questionType: ['objective'],
      questionImage: [''],
      displayOrder: [displayOrder],
      marks: [''],
      answers: this.fb.array(this.createDefaultOptions()),
    });
  }

  createDefaultOptions() {
    let arr: any[] = [
      this.fb.group({
        id: [''],
        optionTitle: [''],
        optionType: ['text'],
        optionImage: [''],
        right: [false],
      }),
      this.fb.group({
        id: [''],
        optionTitle: [''],
        optionType: ['text'],
        optionImage: [''],
        right: [false],
      }),
      this.fb.group({
        id: [''],
        optionTitle: [''],
        optionType: ['text'],
        optionImage: [''],
        right: [false],
      }),
      this.fb.group({
        id: [''],
        optionTitle: [''],
        optionType: ['text'],
        optionImage: [''],
        right: [false],
      }),
    ];
    return arr;
  }

  editSection(module: any) {
    const control = <FormArray>this.form.get('sections');
    control.push(
      this.fb.group({
        id: [module.id],
        sectionTitle: [module.sectionTitle],
        displayOrder: [module.displayOrder],
        sectionDescription: [module.sectionDescription],
        questions: this.fb.array([
          ...module.questions.map((item: any) => this.editQuestion(item)),
        ]),
      })
    );
  }
  editQuestion(module: any) {
    return this.fb.group({
      id: [module.id],
      questionTitle: [module.questionTitle],
      displayOrder: [module.displayOrder],
      questionType: [module.questionType],
      questionImage: [module.questionImage],
      questionImagePath: [module.questionImagePath],
      marks: [module.marks],
      // right:[false,module.isRight],
      answers: this.fb.array([
        ...module.answers.map((item: any) => this.editanswers(item)),
      ]),
    });
  }
  editanswers(module: any) {
    return this.fb.group({
      id: [module.id],
      optionTitle: [module.optionTitle],
      optionImage: [module.optionImage],
      optionType: [module.optionType],
      optionImagePath: [module.optionImagePath],
      right: [module.right],
    });
  }

  isNegtiveMarksForQuiz(value: any) {
    if (value == 'true') {
      this.negativeMarksForQuiz = true;
      this.form?.get('negativeMarks')?.setValidators([Validators.required]);
      this.form?.get('negativeMarks')?.updateValueAndValidity();
      return;
    }
    this.negativeMarksForQuiz = false;
    this.form?.get('negativeMarks')?.clearValidators();
    this.form?.get('negativeMarks')?.updateValueAndValidity();
  }

  get controls() {
    return this.form.controls;
  }

  getSections() {
    return (this.form.controls['sections'] as FormArray).controls;
  }

  getQuestions(form: any) {
    return (form.controls['questions'] as FormArray).controls;
  }
  getanswers(form: any) {
    return (form.controls['answers'] as FormArray).controls;
  }

  addSection() {
    const control = <FormArray>this.form.get('sections');
    control.push(this.createSectionItem(control.length + 1));
  }

  removeSection(i: number) {
    const control = <FormArray>this.form.get('sections');
    const id = control.value[i]?.id;
    if (id) {
      Swal.fire({
        title: 'Do you want to delete the Section?',
        showDenyButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.quizApiService.deleteSection(id).subscribe({
            next: (res: any) => {
              Swal.fire('Good job!', res.message, 'success');
              control.removeAt(i);
            },
            error: (err: HttpErrorResponse) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              });
            },
          });
        } else if (result.isDenied) {
          Swal.fire('Section not deleted', '', 'info');
        }
      });
      return;
    }
    control.removeAt(i);
  }

  addQuestion(section: any) {
    const question = section.controls['questions'] as FormArray;
    question.push(this.createQuestionItem(question.length + 1));
  }

  removeQuestion(section: any, index: number) {
    const questions = this.getQuestions(section);
    const id = questions[index].value.id;
    if (id) {
      Swal.fire({
        title: 'Do you want to delete the Question?',
        showDenyButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.quizApiService.deleteQuestion(id).subscribe({
            next: (res: any) => {
              Swal.fire('Good job!', res.message, 'success');
              questions.splice(index, 1);
            },
            error: (err: HttpErrorResponse) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              });
            },
          });
        } else if (result.isDenied) {
          Swal.fire('Question not deleted', '', 'info');
        }
      });
      return;
    }
    questions.splice(index, 1);
  }

  addOption(question: any) {
    const answers = question.controls['answers'] as FormArray;
    answers.push(this.createSingleOption());
  }

  removeOption(question: any, index: number) {
    const answers = this.getanswers(question);
    const id = answers[index].value.id;
    if (id) {
      Swal.fire({
        title: 'Do you want to delete the Option?',
        showDenyButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.quizApiService.deleteOption(id).subscribe({
            next: (res: any) => {
              Swal.fire('Good job!', res.message, 'success');
              answers.splice(index, 1);
            },
            error: (err: HttpErrorResponse) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              });
            },
          });
        } else if (result.isDenied) {
          Swal.fire('Option not deleted', '', 'info');
        }
      });
      return;
    }
    answers.splice(index, 1);
  }

  createSingleOption() {
    return this.fb.group({
      id: [''],
      optionTitle: [''],
      optionType: ['text'],
      optionImage: [''],
      right: [false],
    });
  }

  isFileImage(file: File) {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  onQuestionFileChange(event: any, i: number, j: number) {
    let file: File = event.target.files[0];
    console.error(file.size);
    if (!this.isFileImage(file)) {
      Swal.fire('Please select image.', '', 'error');
      return;
    }
    if (file.size > 3000000) {
      Swal.fire('Default image file size is 30KB', '', 'error');
      return;
    }
    let newFileName =
      this.randomString(6).replace(/\s/g, '') + file.name.replace(/\s/g, '');
    const control = <FormGroup>this.form.get(['sections', i, 'questions', j]);
    control.get('questionImage')?.setValue(newFileName);
    control.get('questionType')?.setValue('image');
    this.filesToBeUploaded.set(newFileName, file);
  }

  randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  onOptionFileChange(event: any, i: number, j: number, k: number) {
    alert('test');
    const file: File = event.target.files[0];
    if (!this.isFileImage(file)) {
      Swal.fire('Please select image.', '', 'error');
      return;
    }
    if (file.size > 300000) {
      Swal.fire('Default image file size is 30KB', '', 'error');
      return;
    }
    const control = <FormGroup>(
      this.form.get(['sections', i, 'questions', j, 'answers', k])
    );
    let newFileName =
      this.randomString(6).replace(/\s/g, '') + file.name.replace(/\s/g, '');
    control.get('optionImage')?.setValue(newFileName);
    control.get('optionType')?.setValue('image');
    this.filesToBeUploaded.set(newFileName, file);
  }

  updateOptionValue(question: any, i: number) {
    (question.controls['answers'] as FormArray).controls.forEach(
      (currentValue: any, index: number) => {
        if (index == i) {
          currentValue.get('right')?.setValue(true);
        } else {
          currentValue.get('right')?.setValue(false);
        }
      }
    );
  }

  removeQuestionImage(name: string, i: number, j: number) {
    this.filesToBeUploaded.delete(name);
    const control = <FormGroup>this.form.get(['sections', i, 'questions', j]);
    control.get('questionImage')?.setValue('');
    control.get('questionType')?.setValue('objective');
    const element = document.getElementById(
      ('ques' + i + j).toString()
    ) as HTMLInputElement;
    element.value = '';
    this.removeQuizImages(control.get('id')?.value, 'question');
  }

  removeQuizImages(id: number, type: string) {
    this.quizApiService.deleteQuizImages(id, type).subscribe({
      next: (data: any) => {},
      error: (error: HttpErrorResponse) => {
        Swal.fire('error', 'Error while removing image');
      },
    });
  }

  removeOptionImage(name: string, i: number, j: number, k: number) {
    this.filesToBeUploaded.delete(name);
    const control = <FormGroup>(
      this.form.get(['sections', i, 'questions', j, 'answers', k])
    );
    control.get('optionImage')?.setValue('');
    control.get('optionType')?.setValue('text');
    const element = document.getElementById(
      ('opt' + i + j + k).toString()
    ) as HTMLInputElement;
    element.value = '';
    if (control.get('id')?.value)
      this.removeQuizImages(control.get('id')?.value, 'option');
  }

  base64Preview(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const filePath = reader.result as string;
      this.showPreview(filePath, false);
    };
  }

  preview(image: string) {
    if (!this.isUpdate) {
      const file = this.filesToBeUploaded.get(image);
      if (file) {
        this.base64Preview(file);
      }
      return;
    }
    const file = this.filesToBeUploaded.get(image);
    file
      ? this.base64Preview(file)
      : this.showPreview(
          'https://nrichvideo.s3.ap-south-1.amazonaws.com/' + image,
          false
        );
  }

  showPreview(path: string, isPdf: boolean) {
    const dialogRef = this.dialog.open(AssignmentDocumentPreviewComponent, {
      position: { top: '20px' },
      maxHeight: '650px',
      width: '1000px',
      data: {
        imgUrl: path,
        isPdf: isPdf,
      },
      hasBackdrop: true,
      panelClass: ['animate__animated', 'animate__backInDown'],
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  submit() {
    this.isSubmit = true;
    if (this.form.get('negtiveMarking')?.value == 'true') {
      this.form.get('negtiveMarks')?.addValidators(Validators.required);
      this.form.get('negtiveMarks')?.updateValueAndValidity();
    } else {
      this.form.get('negtiveMarks')?.removeValidators(Validators.required);
      this.form.get('negtiveMarks')?.updateValueAndValidity();
    }
    if (this.form.invalid) {
      return;
    }
    this.updateQuiz = this.form.value as QuizUpdate;
    this.updateQuiz.instituteId = +AuthService.getInstituteId;
    this.loader
      .showLoader(
        this.quizApiService.saveQuiz(this.updateQuiz, this.filesToBeUploaded)
      )
      .subscribe({
        next: (data: any) => {
          Swal.fire(
            'Success',
            'Quiz ' + this.isUpdate ? 'updated' : 'created' + ' successfully.'
          );
          this.location.back();
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('error', 'Internal Server Error', 'error');
        },
      });
  }
}
