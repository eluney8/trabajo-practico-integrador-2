import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/articles");
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        articulos publicados
      </h1>
      {isLoading && (
        <p className="text-blue-500 font-medium">cargando articulos...</p>
      )}
      {error && (
        <p className="text-red-500 font-medium">
          error al cargar articulos: {error}
        </p>
      )}
      {!isLoading && !error && articles?.length === 0 && (
        <p className="text-gray-500">no hay articulos publicados aun.</p>
      )}
      <div className="grid gap-4 mt-4">
        {articles &&
          articles.map((article) => (
            <article
              key={article.id}
              className="bg-white p-5 rounded-lg shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {article.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {article.excerpt || article.content}
              </p>
              <span className="text-sm text-gray-400 mt-4 block">
                Autor: {article.author?.username || article.author || "Anónimo"}
              </span>
            </article>
          ))}
      </div>
    </div>
  );
};
