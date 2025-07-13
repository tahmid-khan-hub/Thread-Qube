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
      <div className="max-w-[1400px] mx-auto">
        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">
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
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Banner;
