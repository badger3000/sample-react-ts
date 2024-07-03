import {useState, useMemo} from "react";
import {useQuery} from "react-query";

const fetchPhotos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: photos,
    isLoading,
    isError,
  } = useQuery(["photos", fetchPhotos], fetchPhotos, {enabled: true});

  const filteredPhotos = useMemo(() => {
    if (!photos) return [];
    return photos.filter((photo: Photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (isError) {
    <div>Error: dude, its broken.</div>;
  }
  return (
    <section className="conteiner w-full p-10 text-center flex flex-col">
      <input
        type="text"
        placeholder="Search things..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full m-auto max-w-full md:max-w-[800px]"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {filteredPhotos?.slice(0, 20).map((photo: Photo) => (
          <div
            className="card bg-base-100 shadow-xl bg-white rounded-lg overflow-hidden"
            key={photo.id}
          >
            <figure>
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="object-cover rounded-tr-lg rounded-tl-lg w-full max-h-60"
              />
            </figure>
            <div className="card-body p-5 flex align-items-center justify-center">
              <h2 className="card-title">{photo.title}</h2>
              <span className=" p-2 m-2">{photo.albumId}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
