// search
export const searchService = async(query) => {
  console.log({query});
    const res = await   fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log({res});
      if (!res.ok) throw new Error('Search request failed');
      const data = await res.json();
      console.log({data});
      return data.results;
  };
