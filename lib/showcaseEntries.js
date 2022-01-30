import { retryFetch } from "./util";

const apiBaseUrl = "https://www.bigcommerce.com/actions/bcCore/interview";
const resultsPerPage = 10;

export async function getShowcaseDataForPage(page) {
  try {
    const entryIds = await getAllShowcaseEntryIds();

    return {
      entries: await getEntriesForPage(page, entryIds),
      pageCount: getPageCount(entryIds),
    };
  } catch (error) {
    return { error: error.message };
  }
}

function getEntriesForPage(page, entryIds) {
  const entryIdsForPage = selectEntryIdsForPage(page, entryIds);
  return getEntriesById(entryIdsForPage);
}

function selectEntryIdsForPage(page, entryIds) {
  return entryIds.slice((page - 1) * resultsPerPage, page * resultsPerPage);
}

async function getEntriesById(entryIds) {
  return Promise.all(entryIds.map((id) => getShowcaseEntry(id)));
}

function getPageCount(entryIds) {
  return Math.floor(entryIds.length / resultsPerPage);
}

function getAllShowcaseEntryIds() {
  return retryFetch(`${apiBaseUrl}/getShowcaseEntryIds`);
}

function getShowcaseEntry(entryId) {
  return retryFetch(`${apiBaseUrl}/getShowcaseEntryById?id=${entryId}`);
}
