"use client";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [sentiment, setSentiment] = useState([]);

  useEffect(() => {
    api.get("/analytics/topics").then(res => setTopics(res.data));
    api.get("/analytics/participants").then(res => setParticipants(res.data));
    api.get("/analytics/sentiment").then(res => setSentiment(res.data));
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Top Topics</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topics}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="_count.name" fill="#3b82f6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Participant Activity</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <tbody>
              {participants.map((p: any) => (
                <tr key={p.email}>
                  <td className="py-1">{p.name}</td>
                  <td className="text-right">{p.meetings_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader><CardTitle>Sentiment Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sentiment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avg_sentiment_score" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
