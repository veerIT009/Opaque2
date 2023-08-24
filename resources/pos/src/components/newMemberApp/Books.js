import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import { fetchBooksAll } from "../../member/store/actions/bookAction";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import { getCurrentMember } from "../../shared/sharedMethod";

import ReactPaginate from "react-paginate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Header from "./Header";
import Footer from "./Footer";
import { fetchGenresWithout } from "../../admin/store/actions/genreAction";
import { fetchPublishersWithout } from "../../admin/store/actions/publisherAction";
import { fetchAuthorsWithoutToken } from "../../member/store/actions/authorAction";
import { fetchBookLanguagesWithout } from "../../admin/store/actions/bookLanguageAction";
import libraryStatus from "./libraryStatus.json";

function Items({ currentItems: books, handleDetails }) {
    return books ? (
        books.map((book, i) => {
            return (
                <div
                    key={i}
                    className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                    data-aos="zoom-in"
                >
                    <div className="card color-cards">
                        <div className="card-body p-0">
                            <div
                                className="text-center card-contents"
                                style={{
                                    backgroundColor: "#f2f2f2",
                                }}
                                onClick={() =>
                                    book.items.length
                                        ? handleDetails(
                                              book.id,
                                              book.name,
                                              book.items[0].format,
                                              book.library_id
                                          )
                                        : handleDetails(
                                              book.id,
                                              book.name,
                                              null,
                                              book.library_id
                                          )
                                }
                            >
                                <div className="card-image">
                                    <img
                                        // src="images/Group95.svg"
                                        src={
                                            book.image_path
                                                ? book.image_path
                                                : "https://cdn-icons-png.flaticon.com/512/3845/3845824.png"
                                        }
                                        className="case-studies-card-img"
                                        alt=""
                                    />
                                </div>
                                <div className="card-details text-center pt-3">
                                    <h6 className="m-0 pb-1">
                                        {book.name ? book.name : "NA"}
                                    </h6>
                                    {/* <h5 className="text-success">
                                ₹{" "}
                                {book.items
                                    ? book.items[0]?.price
                                    : "NA"}
                            </h5> */}
                                </div>
                                <div className="card-desc-box d-flex flex-column align-items-center justify-content-around">
                                    {/* <h6 className="text-white pb-2 px-3">
                                            Know more about the Book
                                        </h6> */}
                                    <div
                                        className=""
                                        style={{
                                            width: "fit-content",
                                            padding: "auto 5px",
                                        }}
                                    >
                                        <div className="d-flex flex-column align-items-center library_badge">
                                            <span className="badge badge-info">
                                                {book?.items[0]?.format === 3
                                                    ? "E-Book"
                                                    : "Book"}
                                            </span>

                                            {book?.library_id === 111 ? (
                                                <span className="badge badge-danger">
                                                    Dindayal Upadhyay Library
                                                </span>
                                            ) : book?.library_id === 222 ? (
                                                <span className="badge badge-danger">
                                                    Kundanlal Gupta Library
                                                </span>
                                            ) : (
                                                <span className="badge badge-danger">
                                                    Rashtramata Kasturba Library
                                                </span>
                                            )}
                                        </div>
                                        <div className="available_book">
                                            {book.items.find(
                                                (item) => item.status === 1
                                            ) ? (
                                                <span className="badge badge-success">
                                                    Available
                                                </span>
                                            ) : (
                                                <span className="badge badge-danger">
                                                    Unavailable
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-white frontend-btn"
                                        onClick={() =>
                                            handleDetails(book.id, book.name)
                                        }
                                    >
                                        <span>Read More</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    ) : (
        <div className="card-details text-center pt-3">
            <h6 className="m-0 pb-1">No Books Available.</h6>
        </div>
    );
}

const BookList = (props) => {
    const {
        books,
        goTo,
        genres,
        publishers,
        authors,
        filteredBooks,
        setFilteredBooks,
        bookLanguage,
    } = props;
    const [filter, setFilter] = useState("book");
    const [isSpinner, setIsSpinner] = useState(true);
    const navigate = useNavigate();

    const itemsPerPage = 12;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems =
        filteredBooks.length && filteredBooks.slice(itemOffset, endOffset);
    const pageCount = parseInt(Math.ceil(filteredBooks.length / itemsPerPage));

    const [value, setValue] = useState("");
    const [toPage, setToPage] = useState(0);
    const [genreId, setGenreId] = useState("");
    const [publisherId, setPublisherId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [languageId, setLanguageId] = useState("");
    const [libraryId, setLibraryId] = useState("");

    const handlePageClick = (event) => {
        window.scroll({ top: 0, behavior: "smooth" });
        const newOffset = (event.selected * itemsPerPage) % books.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };
    // console.log(
    //     `Loading items from ${itemOffset} to ${endOffset} pagecount ${pageCount} toPage ${toPage} currentItems : ${currentItems.length}`
    // );

    const handleDetails = (id, name, format, library_id) => {
        if (format && format === 3) {
            navigate("/ebook-details/" + id + "/" + library_id);
        } else {
            navigate(
                "/search/book&" +
                    name.replaceAll(" ", "") +
                    "/" +
                    id +
                    "/" +
                    library_id
            );
        }
    };

    const genreOnChange = (e) => {
        setGenreId(e.target.value);
    };

    const publisherOnChange = (e) => {
        setPublisherId(e.target.value);
    };
    const authorOnChange = (e) => {
        setAuthorId(e.target.value);
    };
    const languageOnChange = (e) => {
        setLanguageId(e.target.value);
    };
    const libraryOnChange = (e) => {
        setLibraryId(e.target.value);
    };

    useEffect(() => {
        let fb = [];
        if (libraryId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) => book.library_id === parseInt(libraryId)
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) => book.library_id === parseInt(libraryId)
                );
                setFilteredBooks(fb);
            }
        }
        if (genreId) {
            if (fb.length) {
                fb = fb.filter((book) => book.genres[0].id == genreId);
                setFilteredBooks(fb);
                setToPage(pageCount);
            } else {
                fb = books.filter((book) => book.genres[0].id == genreId);
                setFilteredBooks(fb);
                setToPage(pageCount);
            }
        }
        if (publisherId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            }
        }
        if (authorId) {
            if (fb.length) {
                fb = fb.filter((book) => book.authors[0].id == authorId);
                setFilteredBooks(fb);
            } else {
                fb = books.filter((book) => book.authors[0].id == authorId);
                setFilteredBooks(fb);
            }
        }
        if (languageId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            }
        }
        if (authorId && genreId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.genres[0].id == genreId &&
                        book.authors[0].id == authorId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.genres[0].id == genreId &&
                        book.authors[0].id == authorId
                );
                setFilteredBooks(fb);
            }
        }
        if (languageId && genreId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0].id == genreId &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0].id == genreId &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            }
        }
        if (publisherId && genreId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0].id == genreId &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0].id == genreId &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            }
        }
        if (publisherId && authorId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0].id == authorId &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0].id == authorId &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            }
        }
        if (publisherId && languageId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0].language.id == languageId &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0].language.id == languageId &&
                        book.items[0].publisher.id == publisherId
                );
                setFilteredBooks(fb);
            }
        }
        if (languageId && authorId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0].id == authorId &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0].id == authorId &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            }
        }
        if (genreId && publisherId && authorId && languageId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0].id == genreId &&
                        book.items[0].publisher.id == publisherId &&
                        book.authors[0].id == authorId &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0].id == genreId &&
                        book.items[0].publisher.id == publisherId &&
                        book.authors[0].id == authorId &&
                        book.items[0].language.id == languageId
                );
                setFilteredBooks(fb);
            }
        }

        // console.log({
        //     fb,
        //     genreId,
        //     publisherId,
        //     authorId,
        //     languageId,
        //     libraryId,
        // });
    }, [genreId, publisherId, authorId, languageId, libraryId]);

    const itemsOptions = {
        currentItems,
        handleDetails,
    };
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results);
        setValue(string);
    };

    const handleOnSelect = (item) => {
        // the item selected
        // console.log(item.name.replaceAll(" ", ""));
        const value =
            filter === "book"
                ? item.name.replaceAll(" ", "")
                : item.authors_name.replaceAll(" ", "");
        goTo("/search/" + filter + "&" + value);
    };

    const handleFilter = (e) => {
        setFilter((prev) => (prev = e.target.id));
    };

    const formatResult = (item) => {
        return (
            // <>
            //     {filter === "book" ? (
            //         <span style={{ display: "block", textAlign: "left" }}>
            //             <i className="fa fa-book nav-icons pr-2"></i>{" "}
            //             {item.name}
            //         </span>
            //     ) : (
            //         <span style={{ display: "block", textAlign: "left" }}>
            //             <i className="fa fa-book nav-icons pr-2"></i>{" "}
            //             {item.authors_name}
            //         </span>
            //     )}
            // </>
            <span style={{ display: "block", textAlign: "left" }}>
                <i className="fa fa-book nav-icons pr-2"></i> {item.name}
            </span>
        );
    };

    // console.log({ books, publishers, genres, authors, bookLanguage });

    useEffect(() => {
        setTimeout(() => setIsSpinner(false), 2000);
    }, []);

    return (
        <section className="case-studies" id="books-section">
            {!isSpinner ? (
                <div className="container">
                    <div
                        className="s003 container d-flex flex-column align-items-center gap-5"
                        id="book_search_home_page_form"
                    >
                        <div className="search-bar">
                            {/* <div className="dropdown rounded-full advanced-search">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Advanced
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <input type="checkbox" name="price" />
                                        <label htmlFor="price">Price</label>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="genres">
                                {/* <label htmlFor="book-genres">Genres</label> */}
                                <select
                                    defaultValue={genreId}
                                    className="form-select"
                                    aria-label="Select Genres."
                                    onChange={genreOnChange}
                                >
                                    <option>Search By Genre</option>
                                    {genres.length ? (
                                        genres.map((genre, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={genre.id}
                                                >
                                                    {genre.name}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="">
                                            No records found.
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="publisher">
                                {/* <label htmlFor="book-publisher">Publisher</label> */}
                                <select
                                    defaultValue={publisherId}
                                    className="form-select"
                                    aria-label="Select Publisher."
                                    onChange={publisherOnChange}
                                >
                                    <option>Search By Publisher</option>
                                    {publishers.length ? (
                                        publishers.map((publisher, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={publisher.id}
                                                >
                                                    {publisher.name}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="">
                                            No records found.
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="publisher">
                                {/* <label htmlFor="book-publisher">Publisher</label> */}
                                <select
                                    defaultValue={authorId}
                                    className="form-select"
                                    aria-label="Select Author."
                                    onChange={authorOnChange}
                                >
                                    <option>Search By Author</option>
                                    {authors.length ? (
                                        authors.map((author, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={author.id}
                                                >
                                                    {author.name}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="">
                                            No records found.
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="publisher">
                                {/* <label htmlFor="book-publisher">Publisher</label> */}
                                <select
                                    defaultValue={languageId}
                                    className="form-select"
                                    aria-label="Select Language."
                                    onChange={languageOnChange}
                                >
                                    <option>Search By Language</option>
                                    {bookLanguage.length ? (
                                        bookLanguage.map((language, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={language.id}
                                                >
                                                    {language.name}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="">
                                            No records found.
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="publisher">
                                {/* <label htmlFor="book-publisher">Publisher</label> */}
                                <select
                                    defaultValue={libraryId}
                                    className="form-select"
                                    aria-label="Select Language."
                                    onChange={libraryOnChange}
                                >
                                    <option>Search By Library</option>
                                    {bookLanguage.length ? (
                                        libraryStatus.map((language, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={language.id}
                                                >
                                                    {language.name}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="">
                                            No records found.
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div className="searchByBook">
                                {/* <div className="dropdown rounded-full">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {filter.toUpperCase()}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                id="book"
                                                onClick={(e) => handleFilter(e)}
                                            >
                                                Book
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                id="author"
                                                onClick={(e) => handleFilter(e)}
                                            >
                                                Author
                                            </button>
                                        </li>
                                    </ul>
                                </div> */}
                                <ReactSearchAutocomplete
                                    className="auto-complete"
                                    items={filteredBooks}
                                    onSearch={handleOnSearch}
                                    onSelect={handleOnSelect}
                                    autoFocus
                                    // fuseOptions={{
                                    //     keys: [
                                    //         "authors_name",
                                    //         "authors[0].first_name",
                                    //         "authors[0].last_name",
                                    //         "name",
                                    //     ],
                                    //     // minMatchCharLength: 6,
                                    // }}
                                    // resultStringKeyName="authors_name"
                                    fuseOptions={{
                                        keys: ["name", "isbn"],
                                        // minMatchCharLength: 6,
                                    }}
                                    styling={{
                                        borderRadius: "12px",
                                        backgroundColor: "#f2f2f2",
                                    }}
                                    placeholder="Search a Book"
                                    isCaseSensitive={true}
                                    formatResult={formatResult}
                                />
                            </div>
                            <div className="reset">
                                <button
                                    className="btn btn-danger frontend-btn "
                                    onClick={() => {
                                        setFilteredBooks(books);
                                        setGenreId("");
                                        setPublisherId("");
                                        setAuthorId("");
                                        setLanguageId("");
                                        setLanguageId("");
                                    }}
                                >
                                    <span>Reset</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 common-heading text-center pb-5">
                        <h2>Our Books Collection</h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>
                    <div className="col-12 common-heading text-left">
                        <div className="book-count-wrapper">
                            <span className="book-count">
                                Showing {currentItems.length} of {books.length}{" "}
                                Books
                            </span>
                        </div>
                    </div>
                    <div className="row grid-margin">
                        <Items {...itemsOptions} />
                    </div>
                </div>
            ) : (
                <div className="spinner">
                    <img src="/public/images/301.gif" />
                </div>
            )}
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={toPage}
            />
        </section>
    );
};

function Books(props) {
    const {
        books,
        fetchBooksAll,
        fetchGenresWithout,
        fetchPublishersWithout,
        fetchAuthorsWithoutToken,
        fetchBookLanguagesWithout,
        genres,
        publishers,
        authors,
        bookLanguage,
    } = props;
    const navigate = useNavigate();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const goTo = (url) => {
        navigate(url);
    };

    useEffect(() => {
        fetchBooksAll();
        fetchGenresWithout();
        fetchPublishersWithout();
        fetchAuthorsWithoutToken();
        fetchBookLanguagesWithout();
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    return (
        <>
            <Header getCurrentMember={getCurrentMember} goTo={goTo} />
            <div className="content-wrapper">
                <ProgressBar />
                <div className="container-fluid">
                    <BookList
                        books={books}
                        goTo={goTo}
                        genres={genres}
                        publishers={publishers}
                        authors={authors}
                        filteredBooks={filteredBooks}
                        setFilteredBooks={setFilteredBooks}
                        bookLanguage={bookLanguage}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

const mapStateToProps = (state) => {
    const { books, genres, publishers, authors, bookLanguage } = state;
    return {
        books: books,
        genres:
            genres.length &&
            genres.map((genre) => ({ id: genre.id, name: genre.name })),
        authors:
            authors.length &&
            authors.map((author) => ({
                id: author.id,
                name: author.first_name + author.last_name,
            })),
        publishers:
            publishers.length &&
            publishers.map((publisher) => ({
                id: publisher.id,
                name: publisher.name,
            })),
        bookLanguage:
            bookLanguage.length &&
            bookLanguage.map((language) => ({
                id: language.id,
                name: language.language_name,
            })),
    };
};

export default connect(
    mapStateToProps,
    {
        fetchBookLanguagesWithout,
        fetchAuthorsWithoutToken,
        fetchGenresWithout,
        fetchPublishersWithout,
        fetchBooksAll,
    },
    null
)(Books);
