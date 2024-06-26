
import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/models/post';
import { LoginService } from 'src/app/services/login_service';
import { PostService } from 'src/app/services/post_service';
import { PopupPostComponent } from '../popup-post/popup-post.component';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-tableau-post',
  templateUrl: './tableau-post.component.html',
  styleUrls: ['./tableau-post.component.css']
})

export class TableauPostComponent implements OnInit, AfterViewInit {
  posts: Post[] = [];

  dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>(this.posts);
  displayedColumns: string[] = ["title", "date","content","action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private postService: PostService, private loginService: LoginService, private dialog: MatDialog) {}

  isLoading = false;
  connectedUserRole?: Role ;
  roles = Object.keys(Role);

  ngOnInit(): void {
    this.connectedUserRole = this.loginService.connectedUser.role;
    this.getAllPosts();
  }

  public getAllPosts(): void {
    this.isLoading = true; // Début du chargement
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.postService.getAllPosts(headers).subscribe(
      data => {
        this.posts = data;
        this.dataSource.data = this.posts;
        this.isLoading = false; // Fin du chargement
      },
      error => {
        console.error('Error fetching labos:', error);
        this.isLoading = false; // Fin du chargement
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editPost(post: Post) {
    this.openPopup('Modifier post', post);
  }

  deletePost(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    if (window.confirm("Vous êtes sûr de retirer le post de référence : " + id + " ?")) {
      this.postService.deletePost(id, headers).subscribe(() => {
        this.getAllPosts();
      });
    }
  }

  addPost() {
    this.openPopup('Ajouter un post');
  }
  
openPopup(title: string, post?: Post) {
  if (post) {
    const dialogRef = this.dialog.open(PopupPostComponent, {
      width: '40%',
      data: { title, post }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idPost = post.id!;
        this.updatePostToServer(idPost, result); // Utiliser les nouvelles données actualisées
      }
    });
  } else {
    const dialogRef = this.dialog.open(PopupPostComponent, {
      width: '40%',
      data: { title, post: new Post() } // Initialize with an empty user object
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPostToServer(result); // Ajouter un nouveau laboratoire
      }
    });
  }
}

  

  addPostToServer(post: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.postService.addPost(post, headers).subscribe(() => {
      this.getAllPosts();
    });
  }

  updatePostToServer(id: any,post :any): void {
    if (id) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
  
      this.postService.updatePost(post,id, headers).subscribe(() => {
        this.getAllPosts(); 
      });
    }
  }
}
