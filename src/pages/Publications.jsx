import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { withFallback } from "../api/withFallback.js";
import Hero from "../components/ui/Hero.jsx";
import {
  mockPublications,
  mockEvents,
  mockFeaturedBook,
  mockBookChapters,
  mockProfessionalTextbooks,
  mockSuggestedReading,
} from "../mockData.js";


function BookCard({ book }) {
  return (
    <div className="bg-white border border-ink/10 rounded-2xl p-4 hover:shadow-lg transition">

      <div className="h-64 flex items-center justify-center mb-4">
        <img
          src={book.cover_image}
          alt={book.title}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
      </div>


      <h3 className="text-sm font-semibold text-ink leading-snug">
        {book.title}
      </h3>


      {book.authors && (
        <p className="text-xs text-ink/50 mt-2">
          {book.authors}
        </p>
      )}


      {book.url && (
        <a
          href={book.url}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-3 text-sm font-semibold text-breath hover:underline"
        >
          View Book →
        </a>
      )}

    </div>
  );
}



export default function Publications() {

  const [pubs, setPubs] = useState([]);
  const [events, setEvents] = useState([]);


  useEffect(() => {

    withFallback(
      () => api.get("/publications/items/"),
      mockPublications
    ).then(setPubs);


    withFallback(
      () => api.get("/publications/events/"),
      mockEvents
    ).then(setEvents);

  }, []);



  return (

    <div>

      <Hero
        eyebrow="Research & Education"
        title="Publications, Books & Patents"
        subtitle="Dr. Harrell's contributions to orthodontic, TMJ, and sleep medicine research and education."
        image="/images/dr-harrell-clinical-photo.png"
      />


      <div className="max-w-6xl mx-auto px-6 py-14">


        {/* FEATURED BOOK */}

        <div
          className="
          bg-white 
          border-2 
          border-breath 
          rounded-3xl 
          p-8 
          flex 
          flex-col 
          md:flex-row 
          gap-8 
          mb-14
          "
        >


          <img
            src={mockFeaturedBook.cover_image}
            alt="Featured book"
            className="w-44 rounded-xl object-contain"
          />


          <div>

            <p className="text-xs uppercase tracking-widest text-breath font-bold">
              Featured Book
            </p>


            <h2 className="text-2xl text-ink mt-2 mb-3">
              {mockFeaturedBook.title}
            </h2>


            <p className="text-sm text-ink/70">
              Publisher: {mockFeaturedBook.publisher}
            </p>


            <p className="text-sm text-ink/70">
              Expected: {mockFeaturedBook.expected}
            </p>


            <p className="text-sm text-ink/70">
              Editors: {mockFeaturedBook.editors}
            </p>


            <p className="text-xs text-ink/50 mt-3">
              {mockFeaturedBook.co_authors} co-authors · {mockFeaturedBook.chapters} chapters
            </p>


          </div>

        </div>




        {/* <p
          className="
          text-xs 
          text-amber-700 
          bg-amber-50 
          border 
          border-amber-200 
          rounded-lg 
          px-4 
          py-3 
          mb-14
          "
        >
          {mockFeaturedBook.note}
        </p> */}





        {/* CHAPTER BOOKS */}

        <h2 className="text-2xl mb-6 text-ink">
          Textbooks I Have Chapters In
        </h2>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">

          {
            mockBookChapters.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))
          }

        </div>





        {/* PROFESSIONAL BOOKS */}

        <h2 className="text-2xl mb-6 text-ink">
          Professional Textbooks
        </h2>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">


          {
            mockProfessionalTextbooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))
          }


        </div>





        {/* ARTICLES */}

        <h2 className="text-2xl mb-6 text-ink">
          Articles & Patents
        </h2>


        <ul className="space-y-4 mb-14">


          {
            pubs.map((p) => (
              <li
                key={p.id}
                className="border-b border-ink/10 pb-4"
              >

                <p className="text-ink font-medium">
                  {p.title}
                </p>


                <p className="text-xs text-ink/50">
                  {p.authors}
                  {p.year && ` · ${p.year}`}
                </p>


              </li>
            ))
          }


        </ul>





        {/* SUGGESTED READING */}

        <h2 className="text-2xl mb-6 text-ink">
          Suggested Reading
        </h2>


        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-14">

          {
            mockSuggestedReading.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))
          }


        </div>







        {/* EVENTS */}

        {
          events.length > 0 && (

            <>

              <h2 className="text-2xl mb-6 text-ink">
                Upcoming Lectures & Events
              </h2>


              <ul className="space-y-4">

                {
                  events.map((e) => (
                    <li
                      key={e.id}
                      className="border-b border-ink/10 pb-4"
                    >

                      <p className="text-ink">
                        {e.title}
                      </p>


                      <p className="text-xs text-ink/50">

                        {new Date(e.starts_at).toLocaleDateString()}

                        {e.location && ` · ${e.location}`}

                        {e.audience && ` · ${e.audience}`}

                      </p>

                    </li>
                  ))
                }


              </ul>


            </>

          )

        }


      </div>

    </div>

  );

}