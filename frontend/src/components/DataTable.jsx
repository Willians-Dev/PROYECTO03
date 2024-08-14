import { useEffect, useState } from "react"
import { getBooks } from "../services/bookServices";

export default function DataTable() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
      fetchBooks();  
    }, []);
    
    const fetchBooks = async () => {
        const books = await getBooks();
        setBooks(books);
        console.log(books);
    };

    return (
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Titulo</th>
                <th scope="col">Autor</th>
                <th scope="col">Año de Publicción</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => {
                    return (
                        <tr>
                            <th scope="row">{book.id}</th>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publishedYear}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    )
}