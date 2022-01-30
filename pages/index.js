import { useState } from "react";
import { useRouter } from "next/router";
import { getShowcaseDataForPage } from "../lib/showcaseEntries";
import Pagination from '@mui/material/Pagination';
import ProgressBar from "../components/ProgressBar";
import Error from "../components/Error";
import Showcase from "../components/Showcase";

export async function getServerSideProps(context) {
    let page = 1
    if (context.query.page) page = parseInt(context.query.page)

    const props = await getShowcaseDataForPage(page)
    return { props }
}

export default function Entries({ entries, pageCount, error }) {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page) || 1)

  function handlePageChange(e, value) {
    setPage(value);
    router.push(`/?page=${value}`);
  }

  if (error) return (<Error message={error}/>)

  return (
    <section>
        <ProgressBar />
        <h1>Showcase Entries</h1>
        <Pagination onChange={handlePageChange} page={page} count={pageCount} shape="rounded" className="pagination" color="primary"/>
        <Showcase entries={entries}/>
        <Pagination onChange={handlePageChange} page={page} count={pageCount} shape="rounded" className="pagination" color="primary"/>
    </section>
  )
}
