import { pages } from "next/dist/build/templates/app-page";
import Link from "next/link";

interface paginationprop {
  currentPage: number;
  totalPage: number;
}
export default function PaginationBar({
  totalPage,
  currentPage,
}: paginationprop) {
  const maxpage = Math.min(totalPage, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxpage - 9));

  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxpage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none" : ""}`}
      >
        {page}
      </Link>
    );
  }
  return (
    <>
      <div className="join md:hidden">
        {currentPage > 1 && (
          <Link href={"?page=" + (currentPage - 1)} className="btn join-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
            >
              <path fill="currentColor" d="M672 192L288 511.936L672 832z" />
            </svg>
          </Link>
        )}
        <button className="join-item btn pointer-events-none mb-2">
          Page {currentPage}
        </button>
        {currentPage < totalPage && (
          <Link href={"?page=" + (currentPage + 1)} className="btn join-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
            >
              <path fill="currentColor" d="M384 192v640l384-320.064z" />
            </svg>
          </Link>
        )}
      </div>
      <div className="join hidden sm:block">{numberedPageItems}</div>
    </>
  );
}
