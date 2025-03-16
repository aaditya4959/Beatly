"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Play, Music, Share2 } from "lucide-react";
import { toast } from "sonner";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  votes: number;
  url: string;
}

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoQueue, setVideoQueue] = useState<VideoItem[]>([
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      votes: 15,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "9bZkp7q19f0",
      title: "PSY - Gangnam Style",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
      votes: 10,
      url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Luis Fonsi - Despacito ft. Daddy Yankee",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
      votes: 7,
      url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    },
  ]);
  const [nowPlaying, setNowPlaying] = useState<VideoItem | null>(null);

  useEffect(() => {
    // Set the first video in the queue as now playing if none is playing
    if (!nowPlaying && videoQueue.length > 0) {
      setNowPlaying(videoQueue[0]);
      setVideoQueue(videoQueue.slice(1));
    }
  }, [nowPlaying, videoQueue]);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    const id = extractVideoId(url);
    setVideoId(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoId) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }
    
    try {
      // In a real app, you would fetch video details from YouTube API
      const newVideo: VideoItem = {
        id: videoId,
        title: `YouTube Video ${videoId}`, // In real app, get actual title from API
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        votes: 0,
        url: videoUrl,
      };
      
      setVideoQueue([...videoQueue, newVideo]);
      setVideoUrl("");
      setVideoId(null);
      toast.success("Video added to queue!");
    } catch (error) {
      toast.error("Failed to add video to queue");
    }
  };

  const handleVote = (id: string, vote: 1 | -1) => {
    setVideoQueue(
      videoQueue.map((video) => {
        if (video.id === id) {
          return { ...video, votes: video.votes + vote };
        }
        return video;
      }).sort((a, b) => b.votes - a.votes)
    );
  };

  const skipToNext = () => {
    if (videoQueue.length > 0) {
      const next = videoQueue[0];
      setNowPlaying(next);
      setVideoQueue(videoQueue.slice(1));
      toast.info(`Now playing: ${next.title}`);
    } else {
      toast.warning("No more videos in queue");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vote for the next song!',
        text: 'Join and vote for the songs to be played next on the stream!',
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully!'))
      .catch((error) => toast.error('Error sharing: ' + error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };

  return (
    <div className="py-15 min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="flex justify-end items-center mb-6">
          
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2 hover:cursor-pointer">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Now Playing Section */}
          <div className="lg:col-span-2">
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle>Now Playing</CardTitle>
              </CardHeader>
              <CardContent>
                {nowPlaying ? (
                  <div className="space-y-4">
                    <div className="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${nowPlaying.id}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-md"
                      ></iframe>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium">{nowPlaying.title}</h3>
                      <Button onClick={skipToNext} size="sm">
                        <Play className="mr-2 h-4 w-4" /> Skip
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Music className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No video currently playing</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Video Section */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Add to Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
                      value={videoUrl}
                      onChange={handleUrlChange}
                      className="w-full"
                    />
                  </div>
                  
                  {videoId && (
                    <div className="rounded-md overflow-hidden">
                      <div className="aspect-video bg-black/20 rounded-md overflow-hidden">
                        <img 
                          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button type="submit" disabled={!videoId}>
                    Add to Queue
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Queue Section */}
          <div className="lg:col-span-1">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Up Next</CardTitle>
              </CardHeader>
              <CardContent>
                {videoQueue.length > 0 ? (
                  <div className="space-y-4">
                    {videoQueue.map((video) => (
                      <div key={video.id} className="flex gap-3 p-3 rounded-md border border-white/5 hover:bg-white/5 transition-colors">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{video.title}</h4>
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-bold mr-2">{video.votes}</span>
                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleVote(video.id, 1)}
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleVote(video.id, -1)}
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Music className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm">Queue is empty</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
