import { Title } from '@angular/platform-browser';
import { Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { API_BASE_URL } from 'api.config';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss'
})
export class BookManagementComponent {
  bookForm: any;
  errorMessage:any;
  fieldErrors: any;
   title: string = '';
   author: string = '';
   isbn: string = '';
   publishyear: string = '';
   genre: string = '';
   copies: string = '';
   availablecopies: string = '';
   books: any[] = [];
  pageIndex: any;
  pageSize: any;
  totalItems: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBooks();
  }

  saveBook(title: string, author: string, isbn: string, publishyear: string, genre: string, copies: string, availablecopies: string) {
  this.fieldErrors = [];
  if (!title) {
    this.fieldErrors.push('Title');
  }
  if (!author) {
    this.fieldErrors.push('Author');
  }
  if (!isbn) {
    this.fieldErrors.push('ISBN');
  }
  if (!publishyear) {
    this.fieldErrors.push('Published Year');
  }
  if (!genre) {
    this.fieldErrors.push('Genre');
  }
  if (!copies) {
    this.fieldErrors.push('Total Copies');
  }
  if (!availablecopies) {
    this.fieldErrors.push('Available Copies');
  }
  if (this.fieldErrors.length > 0) {
    this.errorMessage = `Please fill in all required fields: ${this.fieldErrors.join(', ')}.`;
    return;
  }
  this.errorMessage = '';
 // Prepare the data object
 const publishYearDate = new Date(publishyear);
 const data = {
  title: title,
  author: author,
  isbn: isbn,
  PublishedYear: publishYearDate.toISOString(),
  genre: genre,
  Copies: copies,
  availableCopies: availablecopies
};

// API endpoint for adding books
const addBooksEndpoint = `${API_BASE_URL}Librarian/addbooks`;
this.http.post(addBooksEndpoint, data)
      .subscribe(
        (response: any) => {
          console.log('Successfully added book:', response);
          if (response.isSuccessfull) {
            Swal.fire('Success', response.message, 'success').then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire('Error', response.message, 'error');
          }
        },
        (error: any) => {
          console.error('Error adding book:', error);
          Swal.fire('Error', 'Failed to add book', 'error');
        }
      );
  }
  fetchBooks(): void {
    const getBooksEndpoint = `${API_BASE_URL}Librarian/viewbooks`;
    const paginationParams = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };

    this.http.post(getBooksEndpoint, paginationParams)
      .subscribe(
        (response: any) => {
          this.books = response.data.items;
          this.totalItems = response.data.totalItems;
        },
        (error: any) => {
          console.error('Error fetching books:', error);
        }
      );
  }
  deleteBook(bookId: number): void {
    const deleteUrl = `${API_BASE_URL}Librarian/deletebook?bookId=${bookId}`;
    this.http.get<any>(deleteUrl).subscribe(
      response => {
        if (response.isSuccessfull) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
          }).then(() => {
            this.fetchBooks();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: response.message,
          }).then(() => {
            this.fetchBooks();
          });
        }
      },
      error => {
        console.error('Error deleting book', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the book.',
        }).then(() => {
          this.fetchBooks();
        });
      }
    );
  }
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchBooks();
  }

}
