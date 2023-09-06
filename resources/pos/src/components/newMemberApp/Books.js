import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import {
    fetchBooksAll,
    fetchBooksByNameOrAuthors,
} from "../../member/store/actions/bookAction";
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
import { isEmpty } from "lodash";

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
                                        loading="lazy"
                                        src={
                                            book.image_path
                                                ? book.image_path
                                                : "https://cdn-icons-png.flaticon.com/512/3845/3845824.png"
                                        }
                                        className="case-studies-card-img"
                                        alt=""
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src =
                                                "https://cdn-icons-png.flaticon.com/512/3845/3845824.png";
                                        }}
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
                                                {!isEmpty(
                                                    book?.items.find(
                                                        (item) =>
                                                            item.format === 3
                                                    ) &&
                                                        book?.items.find(
                                                            (item) =>
                                                                item.format ===
                                                                1
                                                        )
                                                )
                                                    ? "E-Book / Book"
                                                    : book?.items.find(
                                                          (item) =>
                                                              item.format === 3
                                                      )
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
        fetchBooksByNameOrAuthors,
        books,
        goTo,
        genres,
        publishers,
        authors,
        filteredBooks,
        setFilteredBooks,
        bookLanguage,
        newBookSearch,
        skip,
        setSkip,
        toPage,
        setToPage,
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

    const [genreId, setGenreId] = useState("");
    const [publisherId, setPublisherId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [languageId, setLanguageId] = useState("");
    const [libraryId, setLibraryId] = useState("");
    const [formatId, setFormatId] = useState("");
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

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
    const formatOnChange = (e) => {
        setFormatId(e.target.value);
    };

    useEffect(() => {
        let fb = [];
        if (formatId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) => book.library_id === parseInt(formatId)
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter((book) =>
                    book.items.find(
                        (book) => book.format === parseInt(formatId)
                    )
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
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
            setToPage(0);
        }
        if (genreId) {
            if (fb.length) {
                fb = fb.filter((book) => book.genres[0].id == genreId);
                setFilteredBooks(fb);
            } else {
                fb = books.filter((book) => book.genres[0].id == genreId);
                setFilteredBooks(fb);
            }
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
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
            setToPage(0);
        }

        // console.log({
        //     fb,
        //     genreId,
        //     publisherId,
        //     authorId,
        //     languageId,
        //     libraryId,
        // });
    }, [genreId, publisherId, authorId, languageId, libraryId, formatId]);

    useEffect(() => {
        let fb = [];
        if (location.origin.includes("dindayalupadhyay")) {
            setLibraryId(111);
        } else if (location.origin.includes("kundanlalgupta")) {
            setLibraryId(222);
        } else {
            setLibraryId(333);
        }
        setFilteredBooks(fb);
    }, [location.hash]);

    const itemsOptions = {
        currentItems,
        handleDetails,
    };
    // const handleOnSearch = useCallback(
    //     (string) => {
    //         if (string.length) {
    //             fetchBooksByNameOrAuthors(
    //                 `?search=${string}&limit=&${
    //                     filter === "book" ? "by_books=1" : "by_authors=1"
    //                 }&skip=0&genre_id=${genreId}&publisher_id=${publisherId}&author_id=${authorId}&language_id=${authorId}&format=${formatId}&library_id=${libraryId}`
    //             );
    //         } else {
    //             dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
    //         }
    //         // console.log(string, results, filter);
    //         setValue(string);
    //     },
    //     [
    //         filter,
    //         genreId,
    //         publisherId,
    //         authorId,
    //         languageId,
    //         libraryId,
    //         formatId,
    //         // inputText,
    //     ]
    // );

    const handleOnSearch = useCallback(
        (string) => {
            if (string.length) {
                fetchBooksByNameOrAuthors(
                    `?search=${string}&limit=&${
                        filter === "book" ? "by_books=1" : "by_authors=1"
                    }&skip=0`
                );
            } else {
                dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
            }
            // console.log(string, results, filter);
            setValue(string);
        },
        [filter]
    );

    const handleOnSelect = (item) => {
        // the item selected
        // console.log(item.name.replaceAll(" ", ""));
        const value =
            filter === "book"
                ? item.name.replaceAll(" ", "")
                : item.authors_name.replaceAll(" ", "");
        goTo(
            "/search/" +
                filter +
                "&" +
                value +
                "/" +
                item.id +
                "/" +
                item.library_id
        );
        dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
        setGenreId("");
        setPublisherId("");
        setAuthorId("");
        setLanguageId("");
        setLanguageId("");
        setFormatId("");
    };

    const handleFilter = (e) => {
        setFilter((prev) => (prev = e.target.id));
    };

    const formatResult = (item) => {
        return (
            <div className="form-result">
                {item.length
                    ? item.map((book, i) => {
                          return filter === "book" ? (
                              <span
                                  key={i}
                                  style={{
                                      display: "block",
                                      textAlign: "left",
                                  }}
                                  onClick={() => handleOnSelect(book)}
                              >
                                  <i className="fa fa-book nav-icons pr-2"></i>{" "}
                                  {book.name}
                              </span>
                          ) : (
                              <span
                                  key={i}
                                  style={{
                                      display: "block",
                                      textAlign: "left",
                                  }}
                                  onClick={() => handleOnSelect(book)}
                              >
                                  <i className="fa fa-book nav-icons pr-2"></i>{" "}
                                  {book.authors_name}
                              </span>
                          );
                      })
                    : null}
            </div>
        );
    };

    useEffect(() => {
        setTimeout(() => setIsSpinner(false), 2000);
    }, []);

    useEffect(() => {
        dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
    }, []);

    useEffect(() => {
        const ele = document.querySelector("#onSearch");
        if (ele) {
            ele.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    if (newBookSearch.length) {
                        navigate("/search-results");
                    }
                }
            });
        }
    }, [newBookSearch.length]);

    return (
        <section className="case-studies" id="books-section">
            {!isSpinner ? (
                <div className="container">
                    <div
                        className="s003 container d-flex flex-column align-items-center gap-5"
                        id="book_search_home_page_form"
                    >
                        <div className="search-bar">
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
                                <select
                                    defaultValue={formatId}
                                    className="form-select"
                                    aria-label="Select Language."
                                    onChange={formatOnChange}
                                >
                                    <option>Search By Format</option>
                                    {[
                                        { id: 1, name: "Book" },
                                        { id: 3, name: "E-Book" },
                                    ].map((language, i) => {
                                        return (
                                            <option key={i} value={language.id}>
                                                {language.name}
                                            </option>
                                        );
                                    })}
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
                                {/* <ReactSearchAutocomplete
                                    className="auto-complete"
                                    items={filteredBooks}
                                    onSearch={handleOnSearch}
                                    onSelect={handleOnSelect}
                                    autoFocus
                                    fuseOptions={{
                                        keys: ["name", "isbn"],
                                    }}
                                    styling={{
                                        borderRadius: "12px",
                                        backgroundColor: "#f2f2f2",
                                    }}
                                    placeholder="Search a Book"
                                    isCaseSensitive={true}
                                    formatResult={formatResult}
                                /> */}
                                <input
                                    id="onSearch"
                                    className="form-control"
                                    type="text"
                                    placeholder="Search here..."
                                    onChange={(e) =>
                                        handleOnSearch(e.target.value)
                                    }
                                />
                                {newBookSearch.length
                                    ? formatResult(newBookSearch)
                                    : null}
                            </div>
                            <div className="reset">
                                {/* <button
                                    className="btn btn-danger frontend-btn "
                                    onClick={() => handleOnSearch(inputText)}
                                >
                                    <span>Search</span>
                                </button> */}
                                <button
                                    className="btn btn-danger frontend-btn ml-2"
                                    onClick={() => {
                                        dispatch({
                                            type: "NEW_BOOK_SEARCH",
                                            payload: [],
                                        });
                                        setGenreId("");
                                        setPublisherId("");
                                        setAuthorId("");
                                        setLanguageId("");
                                        setLanguageId("");
                                        setFormatId("");
                                        setInputText("");
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
                                Showing {currentItems.length} of{" "}
                                {filteredBooks.length} Books
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

            <div>
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
                {/* <div className="container d-flex align-items-center justify-content-center gap-3">
                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            skip <= 10
                                ? setSkip(0)
                                : setSkip((prev) => prev - 10)
                        }
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setSkip((prev) => prev + 10)}
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </section>
    );
};

function Books(props) {
    const {
        fetchBooksByNameOrAuthors,
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
        newBookSearch,
    } = props;
    const navigate = useNavigate();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [skip, setSkip] = useState(0);
    const [toPage, setToPage] = useState(-1);
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

    // useEffect(() => {
    //     fetchBooksAll(10, skip);
    //     setToPage(1);
    //     window.scroll({ top: 0, behavior: "smooth" });
    // }, [skip]);

    return (
        <>
            <Header getCurrentMember={getCurrentMember} goTo={goTo} />
            <div className="content-wrapper">
                <ProgressBar />
                <div className="container-fluid">
                    <BookList
                        toPage={toPage}
                        setToPage={setToPage}
                        skip={skip}
                        setSkip={setSkip}
                        fetchBooksByNameOrAuthors={fetchBooksByNameOrAuthors}
                        newBookSearch={newBookSearch}
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
    const { books, genres, publishers, authors, bookLanguage, newBookSearch } =
        state;
    return {
        newBookSearch,
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
        fetchBooksByNameOrAuthors,
        fetchBookLanguagesWithout,
        fetchAuthorsWithoutToken,
        fetchGenresWithout,
        fetchPublishersWithout,
        fetchBooksAll,
    },
    null
)(Books);
