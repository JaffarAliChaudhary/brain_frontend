"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../utils/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function TranscriptDetailPage() {
  const { id } = useParams();
  const [transcript, setTranscript] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/transcripts/${id}`)
        .then((res) => setTranscript(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading)
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-96 w-full" />
      </div>
    );

  if (!transcript)
    return (
      <div className="p-6 text-destructive">
        Transcript not found.
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{transcript.title}</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(transcript.occurred_at).toLocaleString()} • {transcript.duration_minutes} min
        </p>
      </div>

      {transcript.summary && (
        <Card>
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent>{transcript.summary}</CardContent>
        </Card>
      )}

      <Tabs defaultValue="transcript" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="actions">Action Items</TabsTrigger>
          <TabsTrigger value="decisions">Decisions</TabsTrigger>
        </TabsList>

        <TabsContent value="transcript">
          <Card>
            <CardContent className="p-4 whitespace-pre-line text-sm leading-relaxed">
              {transcript.transcript}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics">
          <Card>
            <CardContent className="flex flex-wrap gap-2 p-4">
              {transcript.topics.map((t: any) => (
                <Badge key={t.id} variant="secondary">{t.name}</Badge>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <Card>
            <CardContent className="p-4 space-y-1">
              {transcript.actions.map((a: any) => (
                <p key={a.id}>• {a.text}</p>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions">
          <Card>
            <CardContent className="p-4 space-y-1">
              {transcript.decisions.map((d: any) => (
                <p key={d.id}>• {d.text}</p>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
