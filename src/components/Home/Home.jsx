import { useState } from "react";
import Tags from "../../components/Tags/Tags"
import Posts from "../../components/Posts/Posts"
import Pagination from "../../shared/Pagination/Pagination"
import AllAnouncements from "../AllAnouncements/AllAnouncements";

const Home = () => {

  const [activeTag, setActiveTag] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div>
      <Tags activeTag={activeTag} setActiveTag={setActiveTag} />
      <AllAnouncements></AllAnouncements>
      <Posts page={page} activeTag={activeTag} setTotalPages={setTotalPages} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default Home;
