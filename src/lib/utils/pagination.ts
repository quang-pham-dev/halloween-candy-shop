/**
 * Generates an array representing the pagination structure based on the current page and total pages.
 *
 * If there's only 1 page or no pages, it returns an empty array.
 * If the total pages are 5 or less, it returns an array of all page numbers.
 * If the current page is within the first 3 pages, it returns the first 5 pages, ellipsis, and the last page.
 * If the current page is within the last 3 pages, it returns the first page, ellipsis, and the last 5 pages.
 * Otherwise, it returns the first page, ellipsis, the current page and its surrounding pages, ellipsis, and the last page.
 *
 * @param {number} currentPage - The current active page.
 * @param {number} totalPages - The total number of pages.
 * @returns {Array<number | string>} An array representing the pagination structure.
 */
export function generatePagination(currentPage: number, totalPages: number) {
	// If there's only 1 page or no pages, return empty array
	if (totalPages <= 1) {
		return []
	}

	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	if (currentPage <= 3) {
		return [1, 2, 3, 4, 5, "...", totalPages]
	}

	if (currentPage >= totalPages - 2) {
		return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
	}

	return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
}
