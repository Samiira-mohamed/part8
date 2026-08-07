require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const authorsData = [
  { name: 'Robert Martin', born: 1952 },
  { name: 'Martin Fowler', born: 1963 },
  { name: 'Fyodor Dostoevsky', born: 1821 },
  { name: 'Joshua Kerievsky' },
  { name: 'Sandi Metz' },
]

const booksData = [
  { title: 'Clean Code', published: 2008, author: 'Robert Martin', genres: ['refactoring'] },
  { title: 'Agile software development', published: 2002, author: 'Robert Martin', genres: ['agile', 'patterns', 'design'] },
  { title: 'Refactoring, edition 2', published: 2018, author: 'Martin Fowler', genres: ['refactoring'] },
  { title: 'Refactoring to patterns', published: 2008, author: 'Joshua Kerievsky', genres: ['refactoring', 'patterns'] },
  { title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby', published: 2012, author: 'Sandi Metz', genres: ['refactoring', 'design'] },
  { title: 'Crime and punishment', published: 1866, author: 'Fyodor Dostoevsky', genres: ['classic', 'crime'] },
  { title: 'Demons', published: 1872, author: 'Fyodor Dostoevsky', genres: ['classic', 'revolution'] },
]

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('connected to MongoDB')

  await Author.deleteMany({})
  await Book.deleteMany({})

  const authorMap = {}

  for (const a of authorsData) {
    const author = new Author(a)
    await author.save()
    authorMap[a.name] = author._id
  }

  for (const b of booksData) {
    const book = new Book({
      title: b.title,
      published: b.published,
      genres: b.genres,
      author: authorMap[b.author],
    })
    await book.save()
  }

  console.log('seeding done')
  mongoose.connection.close()
}

seed()
