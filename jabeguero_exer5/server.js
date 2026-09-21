import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const txtPath = 'books.txt';

function txtRead() {
    if (!fs.existsSync(txtPath)) {
        return [];
    }

    const bigLine = fs.readFileSync(txtPath, 'utf-8').trim();
    if (!bigLine) {
        return [];
    }

    const lines = bigLine.split('\n');
    const books = [];

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].trim()) {
            continue;
        }
        const [bookName, isbn, author, yearPublished] = lines[i].split(',');
        books.push({ bookName, isbn, author, yearPublished }); 
    }

    return books;
};


app.post('/add-book', (req, res) => {
    const bookName = req.body.bookName;
    const isbn = req.body.isbn;
    const author = req.body.author;
    const yearPublished = req.body.yearPublished;

    if (typeof bookName !== 'string' || typeof isbn !== 'string' || 
        typeof author !== 'string' || typeof yearPublished !== 'string') {
        return res.send({ success: false });
    }

    const nameS = bookName.trim();
    const isbnS = isbn.trim();
    const authorS = author.trim();
    const yearS = yearPublished.trim();

    if (nameS === '' || isbnS === '' || authorS === '' || yearS === '') {
        return res.send({ success: false });
    }

    const yearN = Number(yearS);

    if (!Number.isInteger(yearN) || yearN < 0) {
        return res.send({ success: false });
    }

    const loadBooks = txtRead();
    let isbnnotUnique = false;

    for (let i = 0; i < loadBooks.length; i++) {
        const curloadBook = loadBooks[i];

        if (curloadBook.isbn === isbnS) {
            isbnnotUnique = true;
            break;
        }
    }

    if (isbnnotUnique) {
        return res.send({ success: false });
    }

    const output = nameS + ',' + isbnS + ',' + authorS + ',' + yearS + '\n';

    try {
        fs.appendFileSync(txtPath, output);
        return res.send({ success: true });
    } catch (error) {
        return res.send({ success: false });
    }
});

app.get('/find-by-isbn-author', (req, res) => {
    const isbn = req.query.isbn;
    const author = req.query.author;

    if (!isbn || !author) {
        return res.send([]);
    }

    const loadBooks = txtRead();
    const result = [];

    for (let i = 0; i < loadBooks.length; i++) {
        const curloadBook = loadBooks[i];

        if (curloadBook.isbn === isbn && curloadBook.author === author) {
            result.push(curloadBook);
        }
    }

    return res.send(result);
});

app.get('/find-by-author', (req, res) => {
    const author = req.query.author;

    if (!author) {
        return res.send([]);
    }

    const loadBooks = txtRead();
    const result = [];

    for (let i = 0; i < loadBooks.length; i++) {
        const curloadBook = loadBooks[i];
        if (curloadBook.author === author) {
            result.push(curloadBook);
        }
    }

    return res.send(result);
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});