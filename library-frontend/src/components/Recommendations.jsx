import { useQuery } from '@apollo/client/react'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const userResult = useQuery(ME, { skip: !props.show })
  const booksResult = useQuery(ALL_BOOKS, { skip: !props.show })

  if (!props.show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (userResult.error || booksResult.error) {
    return <div>Error loading recommendations</div>
  }

  const favoriteGenre = userResult.data.me.favoriteGenre
  const allBooks = booksResult.data.allBooks

  const books = allBooks.filter((b) => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations