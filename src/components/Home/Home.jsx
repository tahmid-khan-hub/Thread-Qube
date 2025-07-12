import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Tags from "../../components/Tags/Tags"
import Posts from "../../components/Posts/Posts"
import Pagination from "../../shared/Pagination/Pagination"
import AllAnouncements from "../AllAnouncements/AllAnouncements";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialTag = queryParams.get("tag");

  const [activeTag, setActiveTag] = useState(initialTag || null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleTagChange = (tag) => {
    setActiveTag(tag);
    setPage(1); 
    navigate(`/?tag=${tag}`);
  };

  useEffect(() => {
    const tagFromURL = new URLSearchParams(location.search).get("tag");
    if (tagFromURL && tagFromURL !== activeTag) {
      setActiveTag(tagFromURL);
    }
  }, [location.search, activeTag]);

  return (
    <div>
      <Tags activeTag={activeTag} setActiveTag={handleTagChange} />
      <AllAnouncements></AllAnouncements>
      <Posts page={page} activeTag={activeTag} setTotalPages={setTotalPages} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default Home;
