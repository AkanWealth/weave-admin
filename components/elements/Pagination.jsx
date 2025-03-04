import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import EmptyList from "./EmptyList";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
import { Plus } from "lucide-react";

function Items({ currentItems, renderItems }) {
  return <>{currentItems && currentItems.map((item) => renderItems(item))}</>;
}

export default function PaginatedItems({
  itemsPerPage,
  items,
  renderItems,
  renderTitle,
  displayType,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    console.log(newOffset);
    setItemOffset(newOffset);
  };

  // Calculate current page
  const currentPage = Math.ceil(itemOffset / itemsPerPage) + 1;

  return (
    <>
      {displayType === "table" ? (
        <table className="w-full border-collapse">
          <thead>{renderTitle()}</thead>
          <tbody>
            {currentItems.length > 0 ? (
              <Items currentItems={currentItems} renderItems={renderItems} />
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No user matches your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : currentItems.length > 0 ? (
        <div className="flex flex-row flex-wrap">
          <Items currentItems={currentItems} renderItems={renderItems} />
        </div>
      ) : (
        <Items currentItems={currentItems} renderItems={renderItems} />
      )}

      <div className="py-4 px-6 bg-white flex flex-col md:flex-row justify-between items-center mt-4 rounded-md">
        <div className="text-sm text-black mb-3 md:mb-0">
          Page {currentPage} of {pageCount > 0 ? pageCount : 1}
        </div>
        
        <div className="flex items-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <button className="flex items-center px-3 py-1 border rounded-md ml-2 bg-white text-black">
                Next <span className="ml-1"><Plus className="w-4 h-4"/></span>
              </button>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel={
              <button className="flex items-center px-3 py-1 border rounded-md mr-2 bg-weave-primary text-white">
                <span className="mr-1"><Plus className="w-4 h-4"/></span> Previous
              </button>
            }
            renderOnZeroPageCount={null}
            containerClassName="flex items-center"
            pageClassName="mx-1"
            pageLinkClassName="px-3 py-1 hover:bg-gray-50"
            activeClassName="active"
            activeLinkClassName="bg-weave-primary rounded-2xl text-white hover:bg-blue-600"
            disabledClassName="opacity-50 cursor-not-allowed"
            disabledLinkClassName="text-gray-300"
          />
        </div>
      </div>
    </>
  );
}