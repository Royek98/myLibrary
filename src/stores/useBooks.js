import { defineStore } from 'pinia';

export const useBooks = defineStore('books', {
  state: () => ({
    books: [
      {
        id: 1,
        title: 'Elektornika',
        author: 'Witold Wrotek',
        description: "Urządzenia elektronicznie otaczają nas zewsząd. Nie sposób obecnie wykonać nawet najprostszej czynności, która nie wymagałaby użycia jakiegoś rodzaju sprzętu elektronicznego. Smartfony, mikrofalówki, pralki automatyczne czy bankomaty to tylko niektóre przykłady urządzeń, bez których trudno wyobrazić sobie codzienne życie. Tymczasem większość z nas nie ma nawet cienia pojęcia o tym, jak działają układy elektroniczne, a gdy cokolwiek zaczyna szwankować, potrzebujemy pomocy fachowca lub... rozglądamy się za nowszym modelem.Celem tej książki jest bezbolesne wprowadzenie czytelnika w niezwykle interesujący i tajemniczy świat elektroniki. Dzięki praktycznym przykładom może on w swoim tempie, w naturalny i bezpieczny sposób poznawać zjawiska fizyczne odpowiedzialne za działanie urządzeń elektronicznych i stopniowo odkrywać coraz bardziej zaawansowane zagadnienia, nie zniechęcając się nadmiarem teorii czy specjalistycznym żargonem. Nauka przed doświadczenie - to motyw przewodni tej książki, pora zatem zakasać rękawy i rozpocząć eksperymenty!",
        poster: '../../posters/eleprp.jpg',
        file: '../../books/elektronika.pdf',
        maxPages: 20,
        savedPage: null,
        releaseDate: '2022-03-08',
        chapters: [
          {
            name: 'POCZĄTEK WSZYSTKIEGO, CZYLI ŹRÓDŁA',
            page: 2
          },
          {
            name: 'WYKONUJEMY WŁASNĄ ELEKTROWNIĘ',
            page: 5
          },
          {
            name: 'JAK KONTROLOWAĆ PRĄD ELEKTRYCZNY?',
            page: 11
          },
        ],
        genres: ['Horror']
      },
      {
        id: 2,
        title: 'C++20. Laboratorium',
        author: 'Dawid Farbaniec',
        description: "Programowanie to w dużym uproszczeniu wydawanie komputerowi odpowiednich poleceń. Aby jednak móc to robić, trzeba opanować trudną sztukę komunikacji z maszyną, co w praktyce sprowadza się do posługiwania się zrozumiałym dla niej językiem. Obecnie niemal nikt nie musi się już uczyć języków niskopoziomowych, które są minimalistyczne i niezawodne, ale trudne do nauki i zastosowania w przypadku złożonych projektów. Z pomocą przychodzą tu języki wysokopoziomowe, a zwłaszcza łączący dużą wydajność z potężnymi możliwościami C++.",
        poster: '../../posters/cpp20l.jpg',
        file: '../../books/c labolatorium.pdf',
        maxPages: 20,
        savedPage: null,
        releaseDate: '2022-03-15',
        chapters: [
          {
            name: 'POCZĄTEK WSZYSTKIEGO, CZYLI ŹRÓDŁA',
            page: 2
          },
          {
            name: 'WYKONUJEMY WŁASNĄ ELEKTROWNIĘ',
            page: 5
          },
          {
            name: 'JAK KONTROLOWAĆ PRĄD ELEKTRYCZNY?',
            page: 11
          },
          {
            name: 'DWA ŁYKI MATEMATYKI, CZYLI DLACZEGO REZYSTOR DYMI',
            page: 16
          }
        ],
        genres: ['Romance']
      },
      {
        id: 3,
        title: 'Zaawansowana analiza danych',
        author: 'aaa aaa',
        description: "Sukces przedsiębiorstwa zależy od jakości podejmowanych decyzji. Spośród strategii, które wspierają ten proces, na szczególną uwagę zasługuje zastosowanie analizy danych. Jest to jednak dość złożona dziedzina. Podstawowym narzędziem wielu analityków danych jest arkusz kalkulacyjny. Ma on tę zaletę, że ułatwia solidne zrozumienie prawideł statystyki i analizy danych. Po zdobyciu takich podstaw warto jednak pójść dalej i nauczyć się eksploracyjnej analizy danych za pomocą języków programowania.",
        poster: '../../posters/zaanda.jpg',
        file: '../../books/zaawansowana analiza danych.pdf',
        maxPages: 20,
        savedPage: null,
        releaseDate: '2022-03-15',
        chapters: [
          {
            name: 'POCZĄTEK WSZYSTKIEGO, CZYLI ŹRÓDŁA',
            page: 2
          },
          {
            name: 'WYKONUJEMY WŁASNĄ ELEKTROWNIĘ',
            page: 5
          },
          {
            name: 'JAK KONTROLOWAĆ PRĄD ELEKTRYCZNY?',
            page: 11
          },
          {
            name: 'DWA ŁYKI MATEMATYKI, CZYLI DLACZEGO REZYSTOR DYMI',
            page: 16
          }
        ],
        genres: ['Romance', 'Fantasy']
      },
      {
        id: 4,
        title: 'Czysty kod w Pythonie',
        author: 'Mariano Anaya',
        description: "Popularność Pythona, ulubionego języka programistów i naukowców, stale rośnie. Jest on bowiem łatwy do nauczenia się: nawet początkujący programista może napisać działający kod. W efekcie, mimo że Python pozwala na pisanie kodu przejrzystego i prostego w konserwacji, zdarzają się przypadki kodu źle zorganizowanego, nieczytelnego i praktycznie nietestowalnego. Jedną z przyczyn tego stanu rzeczy jest tendencja niektórych programistów do pisania kodu bez czytelnej struktury. Zidentyfikowanie takich problemów i ich rozwiązywanie nie jest łatwym zadaniem.",
        poster: '../../posters/czyko2.jpg',
        file: '../../books/czysty kod w pythonie.pdf',
        maxPages: 20,
        savedPage: null,
        releaseDate: '2022-03-22',
        chapters: [
          {
            name: 'POCZĄTEK WSZYSTKIEGO, CZYLI ŹRÓDŁA',
            page: 2
          },
          {
            name: 'WYKONUJEMY WŁASNĄ ELEKTROWNIĘ',
            page: 5
          },
          {
            name: 'JAK KONTROLOWAĆ PRĄD ELEKTRYCZNY?',
            page: 11
          },
          {
            name: 'DWA ŁYKI MATEMATYKI, CZYLI DLACZEGO REZYSTOR DYMI',
            page: 16
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

