const MAX_PAGES_SHOWN = 6;
const MAX_PAGES_RANGE = 3;

function PageItem({ page, active, navigateToPage }) {
  return (
    <li className={"page-item" + (active ? " active" : "")}>
      <button
        className="page-link"
        onClick={navigateToPage ? () => navigateToPage(page) : null}
      >
        {page}
      </button>
    </li>
  );
}

function Pagination({ total, page, perPage, navigateToPage }) {
  const numberPages = Math.ceil(total / perPage);
  const pageTiles = [];

  // If the number of pages is small enough, show all the pages
  if (numberPages <= MAX_PAGES_SHOWN) {
    for (let i = 1; i <= numberPages; i++) {
      pageTiles.push(
        <PageItem
          active={i === page}
          page={page}
          navigateToPage={navigateToPage}
        />
      );
    }
  } else {
    const halfPageRange = Math.floor(MAX_PAGES_RANGE / 2);

    // Always add the first page
    pageTiles.push(
      <PageItem active={page === 1} page={1} navigateToPage={navigateToPage} />
    );

    // Add dots to pagination if the page is much greater than the first page
    if (page > MAX_PAGES_RANGE) {
      pageTiles.push(<PageItem active={false} page={"..."} />);
    }

    // Add pages to the pagination
    if (page > halfPageRange + 1) {
      // If page is much greater than the first page, add pages to both side of the current page
      for (
        let i = page - halfPageRange;
        i <= page + halfPageRange && i <= numberPages;
        i++
      ) {
        pageTiles.push(
          <PageItem
            key={i}
            active={i === page}
            page={i}
            navigateToPage={navigateToPage}
          />
        );
      }
    } else {
      // If page is not much greater than the first page, add pages to one side of the first page
      for (let i = 2; i <= 2 * halfPageRange + 1; i++) {
        pageTiles.push(
          <PageItem
            key={i}
            active={i === page}
            page={i}
            navigateToPage={navigateToPage}
          />
        );
      }
    }

    // Add dots to pagination if the current page is close to the last page
    if (page + halfPageRange + 1 < numberPages) {
      pageTiles.push(<PageItem active={false} page={"..."} />);
    }

    // Add the last page if the current page is not close to the last page
    if (page + halfPageRange < numberPages) {
      pageTiles.push(
        <PageItem
          active={false}
          page={numberPages}
          navigateToPage={navigateToPage}
        />
      );
    }
  }

  return <ul className="pagination">{pageTiles}</ul>;
}

export default Pagination;
