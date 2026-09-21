import needle from 'needle';

const newBook = {
    bookName: "Harry Potter and the Philosopher’s Stone",
    isbn: "978-0-7475-3269-9",
    author: "J.K Rowling",
    yearPublished: "1997"
};

needle.post('http://localhost:3000/add-book', newBook, (err, res) => {
    console.log('ADD BOOK RESPONSE:', res.body);
});

needle.get('http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling', (err, res) => {
    console.log('FIND BY ISBN & AUTHOR:', res.body);
});

needle.get('http://localhost:3000/find-by-author?author=J.K+Rowling', (err, res) => {
    console.log('FIND BY AUTHOR:', res.body);
});