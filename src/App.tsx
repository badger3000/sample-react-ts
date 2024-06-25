import {useQuery} from "react-query";

const fetchPhotos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

function App() {
  const {
    data: photos,
    isLoading,
    isError,
  } = useQuery(["photos", fetchPhotos], fetchPhotos);

  if (isLoading) {
    <div>Loading...</div>;
  }
  if (isError) {
    <div>Error: dude, its broken.</div>;
  }
  return (
    <section className="conteiner w-full bg-slate-500">
      <pre className="text-sm font-bold underline">
        {JSON.stringify(photos, null, 2)}
      </pre>
    </section>
  );
}

export default App;
