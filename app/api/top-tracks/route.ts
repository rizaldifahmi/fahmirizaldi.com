import { NextResponse } from 'next/server';

import { getTopTracks } from '@/lib/spotify';

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await getTopTracks();
    
    if (!response.ok) {
      console.error('Spotify API error:', await response.text());
      return NextResponse.json(
        { error: `Failed to fetch top tracks: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.items) {
      console.error('Unexpected Spotify response:', data);
      return NextResponse.json(
        { error: 'Invalid response from Spotify API' },
        { status: 500 }
      );
    }

    const tracks = data.items.slice(0, 10).map((track: any) => ({
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumImageUrl: track.album.images[0].url
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error in /api/top-tracks:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 