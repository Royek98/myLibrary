import { defineStore } from 'pinia';

export const useBooks = defineStore('books', {
  state: () => ({
    books: [
      {
        id: 1,
        title: 'Dot NET Framework Notes For Professionals',
        author: 'Goal Kicker',
        description: "This is an unofficial free book created for educational purposes and is not affiliated with official .NET Framework group(s) or company(s).",
        poster: '../../posters/dotnet.jpg',
        file: '../../books/DotNETFrameworkNotesForProfessionals.pdf',
        maxPages: 192,
        savedPage: null,
        releaseDate: '2022-03-08',
        chapters: [
          {
            name: 'Getting started with .NET Framework',
            page: 10
          },
          {
            name: 'Strings',
            page: 13
          },
          {
            name: 'DateTime parsing',
            page: 17
          },
        ],
        genres: ['Horror']
      },
      {
        id: 2,
        title: 'AngularJS Notes For Professionals',
        author: 'Goal',
        description: "This is an unofficial free book created for educational purposes and is not affiliated with official .NET Framework group(s) or company(s).",
        poster: '../../posters/angular.jpg',
        file: '../../books/AngularJSNotesForProfessionals.pdf',
        maxPages: 201,
        savedPage: null,
        releaseDate: '2022-03-15',
        chapters: [
          {
            name: 'Getting started with AngularJS',
            page: 9
          },
          {
            name: 'Modules',
            page: 20
          },
          {
            name: 'Components',
            page: 22
          },
          {
            name: 'Built-in directives',
            page: 26
          }
        ],
        genres: ['Romance']
      },
      {
        id: 3,
        title: 'Bash Notes For Professionals',
        author: 'Kicker',
        description: "This is an unofficial free book created for educational purposes and is not affiliated with official .NET Framework group(s) or company(s).",
        poster: '../../posters/bash.jpg',
        file: '../../books/BashNotesForProfessionals.pdf',
        maxPages: 204,
        savedPage: null,
        releaseDate: '2022-03-15',
        chapters: [
          {
            name: 'Getting started with Bash',
            page: 11
          },
          {
            name: 'Script shebang',
            page: 17
          },
          {
            name: 'Navigating directories',
            page: 19
          },
          {
            name: 'Listing Files',
            page: 21
          },
          {
            name: 'Using cat',
            page: 25
          }
        ],
        genres: ['Romance', 'Fantasy']
      },
      {
        id: 4,
        title: 'CSS Notes For Professionals',
        author: 'Goal Kicker',
        description: "This is an unofficial free book created for educational purposes and is not affiliated with official .NET Framework group(s) or company(s).",
        poster: '../../posters/css.jpg',
        file: '../../books/CSSNotesForProfessionals.pdf',
        maxPages: 244,
        savedPage: null,
        releaseDate: '2022-03-22',
        chapters: [
          {
            name: 'Getting started with CSS',
            page: 10
          },
          {
            name: ' Structure and Formatting of a CSS Rule',
            page: 15
          }
        ],
        genres: ['Fantasy', 'History', 'Sci-fi', 'Science']
      },
    ],
    showDetails: false,
    sortBy: ['Title', 'Author', 'Date'],
    genres: ['Fantasy', 'Sci-fi', 'History', 'Science', 'Horror', 'Sports', 'Travel', 'Politics', 'Religion', 'Biographies', 'Romance'],
    selectedGenres: [],
    inputSearch: null,
    both: null,
    editing: false,
  }),
  getters: {
    getBooks() {
      var test = [...this.books];

      if (this.inputSearch != null) {
        const byTitle = test.filter((book) => book.title.toLowerCase().includes(this.inputSearch.toLowerCase()));
        const byAuthor = test.filter((book) => book.author.toLowerCase().includes(this.inputSearch.toLowerCase()));
        this.both = [...byAuthor, ...byTitle];
        // console.log(this.both);
        for (var i = 0; i < this.both.length; ++i) {
          //create the second cycle of the loop from element n+1
          for (var j = i + 1; j < this.both.length; ++j) {
            //if the two elements are equal , then they are duplicate
            if (this.both[i] === this.both[j]) {
              this.both.splice(j, 1); //remove the duplicated element 
            }
          }
        }
        test = this.both;
      } else this.both = null;

      if (this.selectedGenres.length > 0) {
        // dokladne gatunki trzeba podac
        // let checker = (arr, target) => target.every(v => arr.includes(v));
        // test = test.filter(book => checker(this.selectedGenres, book.genres));
        // best version so far...
        // test = test.filter(book => book.genres.some(genre => this.selectedGenres.includes(genre)));

        test = test.filter(book => book.genres.some(v => this.selectedGenres.includes(v)));
        // test = test.filter(book => book.genres.includes(index => this.selectedGenres.indexOf(index)));
      }

      if (this.sortBy[0] === 'Title') {
        function SortArray(x, y) {
          return x.title.localeCompare(y.title);
        }

        test = test.sort(SortArray);
      }
      else if (this.sortBy[0] === 'Author') {
        function SortArray(x, y) {
          return x.author.localeCompare(y.author);
        }
        // test = test.sort(SortArray);
        test = test.sort(SortArray);
      }
      else if (this.sortBy[0] === 'Date') {
        function SortArray(x, y) {
          return x.releaseDate.localeCompare(y.releaseDate);
        }
        test = test.sort(SortArray);
      }
      return test;
    },
    getGenres() {
      return this.genres;
    }
  },
  actions: {
    savePage(id, saved) {
      const book = this.books.find((book) => book.id === id);
      book.savedPage = saved;
    },
    deleteBook(id) {
      if (confirm('Delete this book?') == true) {
        const index = this.books.findIndex(book => book.id === id);
        // this.books.splice(index, 1);
        this.books = this.books.filter((book) => book.id !== id);
      }  
    },
    editBook(bookNew) {
      this.books = this.books.filter(book => book.id !== bookNew.id);
      this.books.push(bookNew);
    },
    addBook(bookNew) {
      this.books.push(bookNew);
    }
  }
})

