import React, { useState } from "react";
import Tags from "../Tags/Tags";
import Announcement from "../Announcement/Announcement";
import Posts from "../Posts/Posts";
import Pagination from "../../shared/Pagination/Pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  return (
    <div>
      <Tags></Tags>
      <Posts page={page} setTotalPages={setTotalPages}></Posts>
      <Announcement></Announcement>
      <Pagination page={page} totalPages={totalPages} setPage={setPage}></Pagination>
    </div>
  );
};

export default Home;
