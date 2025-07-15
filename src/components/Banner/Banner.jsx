import { useState } from "react";

const Banner = ({ setActiveTag }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setActiveTag(searchTerm.trim());
    }
  };

  return (
    <section
      className="relative h-[620px] bg-cover bg-center"
      style={{ backgroundImage: `url('https://i.ibb.co/MyRYVhBm/image.png')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to ThreadQube
        </h1>
        <form
          onSubmit={handleSearch}
          className="w-full max-w-md flex bg-white rounded-md overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search by tag..."
            className="w-full px-4 py-2 text-black focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Banner;
