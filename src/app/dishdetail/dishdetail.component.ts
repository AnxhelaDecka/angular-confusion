import { Component, OnInit,ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
 })
 export class DishdetailComponent implements OnInit {
    @ViewChild('fform') commentFormDirective;
 
    dish: Dish;
    dishIds: number[]; //store Ids
    prev: number;
    next: number;
 
    commentForm: FormGroup;
    comment: Comment;
    newComment = { author: '', comment: '', rating: 5 };
 
    formErrors={
        'author': '',
        'rating': 5,
        'comment':''
    }
    validationMessages= {
        'author':{
          'required':'First name is required',
          'minlength': 'First name must be at least 2 characters long'
        },
 
        'comment':{
          'required':'Email is required'
 
        }
 
      };
 
 
 
 
 
 
 
    constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder) {
            this.createForm();
         }
 
        ngOnInit() {
            this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
            this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(+params['id'])))
            .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
          }
 
          setPrevNext(dishId: number) {
            const index = this.dishIds.indexOf(dishId);
            this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
            this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
          }
 
          createForm() {
            this.commentForm = this.fb.group({
              author: [ this.newComment.author, [Validators.required, Validators.minLength(2)]],
              rating:  this.newComment.rating,
              comment: [ this.newComment.comment, [Validators.required ]]
              });
 
              this.commentForm.valueChanges
              .subscribe(data => this.onValueChanged(data));
              this.onValueChanged(); //reset form validation messages
            }
 
 
            onValueChanged(data?:any) {
                if (!this.commentForm) {return;}
                const form = this.commentForm;
                for (const field in this.formErrors){
                  this.formErrors[field]= '';
                  const control = form.get(field);
                  if(control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field]
                    for(const key in control.errors){
                      this.formErrors[field]+= messages[key] + '';
                    }
                  }
                }
              }
 
 
 
 
              onSubmit(){
                this.newComment= this.commentForm.value;
                this.addNewComment()
                console.log(this.comment);
 
                this.commentForm.reset({
                  author:'',
                  rating: 5,
                  comment:''
                });
 
 
              }
 
              addNewComment(){
                var c = new Comment();
                c.rating = this.newComment.rating;
                c.comment = this.newComment.comment,
                c.author = this.newComment.author,
                c.date = new Date().toISOString()
                 this.dish.comments.push(c) }
 
 
 
 
 
 
          goBack(): void {
 this.location.back();
              }
 
        }