import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchService } from '../service/service-search';

const useSearchQuery = () => {
    const { search } = useLocation();
    return new URLSearchParams(search).get('q');
  };
  
  const SearchPage = ()=>{
    const query = useSearchQuery();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        if (!query) return;
    
        const fetchResults = async () => {
          try {
            const data = await searchService(query);
            console.log('Search data received:', data);
            setResults(data);
          } catch (err) {
            console.error('Search failed', err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchResults();
      }, [query]);

      
  if (loading) return <p>Loading...</p>;
  if (!results.length) return <p>No results found for "{query}"</p>;

  return (
    <div>
    <h2>Search Results for "{query}"</h2>
    <ul>
      {results.map(product => (
        <li key={product.id}>
          <strong>{product.name}</strong> — {product.categoryName}
        </li>
      ))}
    </ul>
  </div>
  )
}
export default SearchPage;