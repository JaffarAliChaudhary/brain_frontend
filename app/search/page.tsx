"use client";
import { useState } from "react";
import { api } from "../../utils/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const res = await api.get(`/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Semantic Search</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search transcripts..."
          className="border p-2 w-full rounded-l-md"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 rounded-r-md">Search</button>
      </div>
      {results.map(r => (
        <div key={r.transcript.id} className="border p-3 rounded mb-2">
          <h2 className="font-semibold">{r.transcript.title}</h2>
          <p className="text-sm text-gray-600">{r.transcript.summary}</p>
        </div>
      ))}
    </div>
  );
}
