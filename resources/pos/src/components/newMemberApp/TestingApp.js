import React, { useEffect, useState, Suspense } from "react";
import { useRef } from "react";

import { useNavigate } from "react-router";
import { connect, useDispatch } from "react-redux";

// import { fetchBooks } from "../../admin/store/actions/bookAction";
import { fetchBooksAll } from "../../member/store/actions/bookAction";
import BookDetails from "./BookModal";
import { getCurrentMember } from "../../shared/sharedMethod";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import { fetchAuthorsWithoutToken } from "../../member/store/actions/authorAction";
import { findBooksWithout } from "../../member/store/actions/bookSearchAction";

import { fetchGenresWithout } from "../../admin/store/actions/genreAction";
import Header from "./Header";
import Footer from "./Footer";

const Staff = (props) => {
    const { books, goTo, findBooksWithout } = props;
    const handleDetails = (id, library_id) => {
        findBooksWithout(
            "id=" + id + "&search_by_book=" + true + "&library_id=" + library_id
        );
        goTo("/search/staff/" + id + "/" + library_id);
    };

    return (
        <section className="case-studies">
            <div className="container">
                <div className="row grid-margin">
                    <div className="col-12 text-center common-heading pb-5">
                        <h2
                            style={{
                                fontSize: "3rem",
                                fontFamily: "Philosopher",
                            }}
                        >
                            Recently Added
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                        {/* <h6 className="section-subtitle text-muted">
                            Lorem ipsum dolor sit amet, tincidunt vestibulum.
                        </h6> */}
                    </div>
                    {books &&
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
                                                    handleDetails(
                                                        book.id,
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
                                                <div className="card-details text-center pt-4">
                                                    <h6 className="m-0 pb-1">
                                                        {book.name
                                                            ? book.name
                                                            : "NA"}
                                                    </h6>
                                                    {/* <h5 className="text-success">
                                                    ₹{" "}
                                                    {book.items
                                                        ? book.items[0].price
                                                        : "NA"}
                                                </h5> */}
                                                </div>

                                                <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                    <div
                                                        style={{
                                                            width: "fit-content",
                                                            padding: "auto 5px",
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center gap-3">
                                                            <span className="badge badge-info">
                                                                {book?.format ===
                                                                3
                                                                    ? "E-Book"
                                                                    : "Book"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="btn btn-white frontend-btn"
                                                            onClick={() =>
                                                                handleDetails(
                                                                    book.id,
                                                                    book.library_id
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                Read More
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

const InfoSection = () => {
    return (
        <>
            <section
                className="contact-us contact-us-bgimage"
                id="contact-section"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7">
                            <h3 className="commonThemeHeading ng-binding">
                                New to Nagpur Digital Library?
                            </h3>
                            <h5>
                                Here are some quick links to help you get
                                started.
                            </h5>
                            <p>
                                Signup for an account when connected to the
                                campus network or contact library administrator.
                            </p>
                            <a href="#/lms/login" className="btn frontend-btn">
                                <span>Join The Library</span>
                            </a>
                        </div>

                        <div className="col-sm-5 libraryWorkBlock">
                            <div className="ctav4__video-btn">
                                <a
                                    // href="javascript:void(0)"
                                    className="glightbox3 video-btn"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </a>
                                <div className="promo-video">
                                    <div className="waves-block">
                                        <div className="waves wave-1"></div>

                                        <div className="waves wave-2"></div>

                                        <div className="waves wave-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div
                className="modal fade video_popup"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <iframe
                                width="900"
                                height="615"
                                src="https://player.vimeo.com/video/808983383?h=81d7a35acb&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                                allow="autoplay; fullscreen; picture-in-picture;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                title="YouTube video player"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Trending = (props) => {
    const { books, goTo, findBooksWithout } = props;

    const handleDetails = (id, library_id) => {
        findBooksWithout(
            "id=" + id + "&search_by_book=" + true + "&library_id=" + library_id
        );
        goTo("/search/trending/" + id + "/" + library_id);
    };
    return (
        <section className="case-studies" id="trending-section">
            <div className="container">
                <div className="row grid-margin">
                    <div className="col-12 text-center common-heading pb-5">
                        <h2
                            style={{
                                fontSize: "3rem",
                                fontFamily: "Philosopher",
                            }}
                        >
                            Featured Books
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                        {/* <h6 className="section-subtitle text-muted">
                            Lorem ipsum dolor sit amet, tincidunt vestibulum.
                        </h6> */}
                    </div>
                    {books &&
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
                                                    handleDetails(
                                                        book.id,
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
                                                <div className="card-details text-center pt-4">
                                                    <h6 className="m-0 pb-1">
                                                        {book.name
                                                            ? book.name
                                                            : "NA"}
                                                    </h6>
                                                    {/* <h5 className="text-success">
                                                    ₹{" "}
                                                    {book.items
                                                        ? book.items[0].price
                                                        : "NA"}
                                                </h5> */}
                                                </div>

                                                <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                    <div
                                                        style={{
                                                            width: "fit-content",
                                                            padding: "auto 5px",
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center gap-3">
                                                            <span className="badge badge-info">
                                                                {book?.format ===
                                                                3
                                                                    ? "E-Book"
                                                                    : "Book"}
                                                            </span>

                                                            {/* {book?.library_id ===
                                                            111 ? (
                                                                <span className="badge badge-success">
                                                                    L1
                                                                </span>
                                                            ) : book?.library_id ===
                                                              222 ? (
                                                                <span className="badge badge-danger">
                                                                    L2
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-primary">
                                                                    L3
                                                                </span>
                                                            )} */}
                                                        </div>
                                                        {/* <div>
                                                            {book.items.find(
                                                                (item) =>
                                                                    item.status ===
                                                                    1
                                                            ) ? (
                                                                <span className="badge badge-success">
                                                                    Available
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-danger">
                                                                    Unavailable
                                                                </span>
                                                            )}
                                                        </div> */}
                                                    </div>
                                                    <div>
                                                        {/* <h6 className="text-white pb-2 px-3">
                                                            Know more about the Book
                                                        </h6> */}
                                                        <button
                                                            className="btn btn-white frontend-btn"
                                                            onClick={() =>
                                                                handleDetails(
                                                                    book.id,
                                                                    book.library_id
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                {" "}
                                                                Read More
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};
const LibraryStack = (props) => {
    const handleClick = (e) => {
        location.href = e;
    };
    return (
        <section className="case-studies" id="library-section">
            <div className="container">
                <div className="row grid-margin">
                    <div className="col-12 text-center common-heading pb-5">
                        <h2
                            style={{
                                fontSize: "3rem",
                                fontFamily: "Philosopher",
                            }}
                        >
                            Library
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>

                    {/* second */}
                    <div
                        /*   key={i} */
                        className="col-12 col-md-6 col-lg-4 stretch-card mb-4 mb-lg-0"
                        data-aos="zoom-in"
                        onClick={() =>
                            handleClick(
                                "https://dindayalupadhyay.smartcitylibrary.com"
                            )
                        }
                    >
                        <div className="card color-cards">
                            <div className="card-body p-0">
                                <div
                                    className="text-center card-contents"
                                    style={{
                                        backgroundColor: "#f2f2f2",
                                    }}
                                    /* onClick={() =>
                                        handleDetails(book.id, book.library_id)
                                    } */
                                >
                                    <div className="card-image">
                                        <img
                                            src={"logo/l1.png"}
                                            className="case-studies-card-img"
                                            alt=""
                                        />
                                    </div>
                                    <div className="card-details text-center pt-4">
                                        <h6 className="m-0 pb-1">
                                            Dindayal Upadhyay Library
                                        </h6>
                                    </div>

                                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                                        <div
                                            style={{
                                                width: "fit-content",
                                                padding: "auto 5px",
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="badge badge-info"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-white frontend-btn"
                                                onClick={() =>
                                                    handleClick(
                                                        "https://dindayalupadhyay.smartcitylibrary.com"
                                                    )
                                                }
                                            >
                                                <span>Visit</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* second end  */}
                    {/* third  */}
                    <div
                        /*   key={i} */
                        className="col-12 col-md-6 col-lg-4 stretch-card mb-4 mb-lg-0"
                        data-aos="zoom-in"
                        onClick={() =>
                            handleClick(
                                "https://kundanlalgupta.smartcitylibrary.com"
                            )
                        }
                    >
                        <div className="card color-cards">
                            <div className="card-body p-0">
                                <div
                                    className="text-center card-contents"
                                    style={{
                                        backgroundColor: "#f2f2f2",
                                    }}
                                    /* onClick={() =>
                                        handleDetails(book.id, book.library_id)
                                    } */
                                >
                                    <div className="card-image">
                                        <img
                                            src={"logo/l2.png"}
                                            className="case-studies-card-img"
                                            alt=""
                                        />
                                    </div>
                                    <div className="card-details text-center pt-4">
                                        <h6 className="m-0 pb-1">
                                            Kundanlal Gupta Library
                                        </h6>
                                    </div>

                                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                                        <div
                                            style={{
                                                width: "fit-content",
                                                padding: "auto 5px",
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="badge badge-info">
                                                    {/*  {book?.format === 3
                                                        ? "E-Book"
                                                        : "Book"} */}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-white frontend-btn"
                                                onClick={() =>
                                                    handleClick(
                                                        "https://kundanlalgupta.smartcitylibrary.com/"
                                                    )
                                                }
                                            >
                                                <span>Visit</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* third end  */}
                    {/* second */}
                    <div
                        /*   key={i} */
                        className="col-12 col-md-6 col-lg-4 stretch-card mb-4 mb-lg-0"
                        data-aos="zoom-in"
                        onClick={() =>
                            handleClick(
                                "https://rashtramatakasturba.smartcitylibrary.com/"
                            )
                        }
                    >
                        <div className="card color-cards">
                            <div className="card-body p-0">
                                <div
                                    className="text-center card-contents"
                                    style={{
                                        backgroundColor: "#f2f2f2",
                                    }}
                                    /* onClick={() =>
                                        handleDetails(book.id, book.library_id)
                                    } */
                                >
                                    <div className="card-image">
                                        <img
                                            src={"logo/l3.png"}
                                            className="case-studies-card-img"
                                            alt=""
                                        />
                                    </div>
                                    <div className="card-details text-center pt-4">
                                        <h6 className="m-0 pb-1">
                                            Rashtramata Kasturba Library
                                        </h6>
                                    </div>

                                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                                        <div
                                            style={{
                                                width: "fit-content",
                                                padding: "auto 5px",
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="badge badge-info">
                                                    {/*  {book?.format === 3
                                                        ? "E-Book"
                                                        : "Book"} */}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-white frontend-btn"
                                                onClick={() =>
                                                    handleClick(
                                                        "https://rashtramatakasturba.smartcitylibrary.com/"
                                                    )
                                                }
                                            >
                                                <span>Visit</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* second end  */}
                </div>
            </div>
        </section>
    );
};

const Hero = (props) => {
    const {
        books,
        isSearched,
        goToRef,
        goTo,
        searchData,
        setSearchData,
        setFilteredBook,
        setIsSearched,
        searchBookRef,
        member,
    } = props;

    const [value, setValue] = useState("");

    const [filter, setFilter] = useState("book");

    const handleFilter = (e) => {
        setFilter((prev) => (prev = e.target.id));
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name]: value });
    };

    const handleOnSearch = (string, results) => {
        setValue(string);
    };

    const handleOnSelect = (item) => {
        const value =
            filter === "book"
                ? item.name.replaceAll(" ", "")
                : item.authors_name.replaceAll(" ", "");

        goTo("search/" + filter + "&" + value);
    };

    const formatResult = (item) => {
        return (
            <>
                {filter === "book" ? (
                    <span style={{ display: "block", textAlign: "left" }}>
                        <i className="fa fa-book nav-icons pr-2"></i>{" "}
                        {item.name}
                    </span>
                ) : (
                    <span style={{ display: "block", textAlign: "left" }}>
                        <i className="fa fa-book nav-icons pr-2"></i>{" "}
                        {item.authors_name}
                    </span>
                )}
            </>
        );
    };

    return (
        <div className="banner pt-4">
            <div className="container d-flex align-items-center">
                <div className="col-sm-6 banner_text">
                    <h1
                        className="text-4xl font-weight-semibold"
                        style={{ fontSize: "3rem", fontFamily: "Philosopher" }}
                    >
                        Nagpur Smart City Digital Library
                    </h1>
                    <h6 className="font-weight-normal text-muted pb-3">
                        Serving You Millions of eResources | 24x7 | Everywhere
                    </h6>
                    <div className="s003" id="book_search_home_page_form">
                        <div style={{ width: 400 }}>
                            <div className="search-bar">
                                <div className="dropdown rounded-full">
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
                                </div>
                                <ReactSearchAutocomplete
                                    className="auto-complete"
                                    items={books}
                                    onSearch={handleOnSearch}
                                    onSelect={handleOnSelect}
                                    autoFocus
                                    fuseOptions={{
                                        keys: [
                                            "authors_name",
                                            "authors[0].first_name",
                                            "authors[0].last_name",
                                            "name",
                                        ],
                                        // minMatchCharLength: 6,
                                    }}
                                    // resultStringKeyName="authors_name"
                                    styling={{
                                        borderRadius: "12px",
                                        backgroundColor: "#f2f2f2",
                                    }}
                                    placeholder={
                                        filter === "book"
                                            ? "Search by Book"
                                            : "Search by Author"
                                    }
                                    isCaseSensitive={true}
                                    formatResult={formatResult}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 banner_image">
                    <img
                        src="images/hero-brown.png"
                        alt=""
                        className="img-fluid"
                        style={{ maxWidth: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
};

const SearchedBooks = (props) => {
    const {
        books,
        isLoading,
        isModal,
        searchBookRef,
        filteredBook,
        searchData,
        goTo,
        setIsModal,
    } = props;

    const toggleModal = (id, show) => {
        const newBook = books.find((book) => book.id === id);
        setIsModal({ ...isModal, book: newBook, show: show });
    };
    const colorString = [
        "bg-primary",
        "bg-secondary",
        "bg-warning",
        "bg-success",
    ];
    const bookValues = filteredBook.map((book) => {
        return {
            id: book.id,
            title: book.name,
            image: book.image_path,
            description: String(book.description).slice(0, 100) + "...",
            bg: colorString[Math.floor(Math.random() * 4)],
            authors_name: book.authors_name,
            first_name: book.authors[0].first_name,
            last_name: book.authors[0].last_name,
        };
    });

    const headingString =
        searchData.searchedBy.charAt(0).toUpperCase() +
        searchData.searchedBy.slice(1);
    return (
        <section
            className="case-studies"
            id="case-studies-section"
            ref={searchBookRef}
        >
            <div className="row grid-margin">
                <div className="col-12 text-center common-heading pb-5">
                    <h2>Searched By "{headingString}"</h2>
                </div>
                {bookValues.length > 0 ? (
                    bookValues.reverse().map((book, index) => {
                        return (
                            <div
                                key={index}
                                className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0 mx-auto"
                                data-aos="zoom-in"
                            >
                                <div className="card color-cards">
                                    <div className="card-body p-0">
                                        <div
                                            className={`${book.bg} text-center card-contents`}
                                        >
                                            <div className="card-image">
                                                <img
                                                    // src="images/Group95.svg"
                                                    src={book.image}
                                                    className="case-studies-card-img"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                <div>
                                                    <h6 className="text-white pb-2 px-3">
                                                        Know more about the Book
                                                    </h6>
                                                    <button
                                                        data-backdrop="static"
                                                        data-toggle="modal"
                                                        data-target="#exampleModal"
                                                        className="btn btn-white frontend-btn"
                                                        onClick={() =>
                                                            toggleModal(
                                                                book.id,
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <span>Details</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-details text-center pt-4">
                                            <h6 className="m-0 pb-1">
                                                {book.title ? book.title : "NA"}
                                            </h6>
                                            <h5>
                                                {book.items
                                                    ? book.items[0].price
                                                    : "NA"}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="row grid-margin">
                        <div className="col-12 text-center pb-5 mx-auto">
                            <img
                                src="images/bookLoading.gif"
                                alt="book-loading"
                                className="mx-auto"
                                width={100}
                            />

                            <h1>No books Found</h1>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

function TestingApp(props) {
    const {
        books,
        isLoading,
        fetchBooksAll,
        fetchAuthorsWithoutToken,
        authors,
        findBooksWithout,
        fetchGenresWithout,
        genres,
    } = props;
    const searchBookRef = useRef();
    const navigate = useNavigate();
    const member = getCurrentMember();

    const [searchData, setSearchData] = useState({
        title: "",
        searchedBy: "book",
    });
    const [isSearched, setIsSearched] = useState(false);
    const [filteredBook, setFilteredBook] = useState([]);
    const [isModal, setIsModal] = useState({ show: false, book: [] });

    const goToRef = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchGenresWithout();
        fetchAuthorsWithoutToken();
        fetchBooksAll();
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isSearched) {
            goToRef(searchBookRef);
        }
    }, [isSearched]);

    const goTo = (url) => {
        navigate(url);
    };

    const searchBookOptions = {
        books,
        filteredBook,
        isLoading,
        searchBookRef,
        searchData,
        isModal,
        goTo,
        setIsModal,
    };

    const heroOptions = {
        books,
        searchData,
        isSearched,
        searchBookRef,
        setSearchData,
        goToRef,
        goTo,
        setFilteredBook,
        setIsSearched,
        member,
    };

    const bookModalOptions = {
        isModal,
        setIsModal,
        goTo,
    };

    const headerOptions = {
        goTo,
        getCurrentMember,
    };

    const trendingOptions = {
        findBooksWithout,
        goTo,
        books: books.slice(-4),
    };

    const staffOptions = {
        goTo,
        findBooksWithout,
        books: books.filter((book) => book.is_featured === true).slice(0, 4),
    };

    const genresOptions = {
        genres,
    };

    return (
        <>
            <ProgressBar />
            <Header {...headerOptions} />
            <div className="content-wrapper">
                <Hero {...heroOptions} />
                <LibraryStack />
                <Staff {...staffOptions} />
                <InfoSection />

                <Trending {...trendingOptions} />
                {/* <Users /> */}
            </div>
            <Footer />
            <BookDetails {...bookModalOptions} />
        </>
    );
}

const mapStateToProps = (state) => {
    const { books, isLoading, authors, genres } = state;
    return {
        books: books,
        isLoading,
        authors,
        genres,
    };
};

export default connect(mapStateToProps, {
    fetchGenresWithout,
    fetchBooksAll,
    fetchAuthorsWithoutToken,
    findBooksWithout,
})(TestingApp);

// export default TestingApp;
