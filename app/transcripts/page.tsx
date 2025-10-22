"use client";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TranscriptsPage() {
  const [transcripts, setTranscripts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/transcripts").then(res => setTranscripts(res.data));
  }, []);

  const filtered = transcripts.filter((t: any) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transcripts</CardTitle>
        <Input
          placeholder="Filter by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {filtered.map((t: any) => (
            <Link key={t.id} href={`/transcripts/${t.id}`}>
              <div className="p-4 border rounded hover:bg-accent">
                <h2 className="font-semibold">{t.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(t.occurred_at).toLocaleString()}
                </p>
                <p className="line-clamp-2">{t.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
