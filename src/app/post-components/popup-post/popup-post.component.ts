import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post_service';

@Component({
  selector: 'app-popup-post',
  templateUrl: './popup-post.component.html',
  styleUrls: ['./popup-post.component.css']
})

export class PopupPostComponent implements OnInit {
  postForm: FormGroup;
  isEditing = false; 
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService 
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.post.id) {
      this.isEditing = true;
      const post = this.data.post as Post;
      this.postForm.patchValue({
        title: post.title,
        date: post.date,
        content: post.content,
      });
    }
  }

  submit() {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      const payload = {
        id: this.data.post.id, 
        title: formValue.title,
        date: formValue.date,
        content: formValue.content,
      };
      this.dialogRef.close(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

