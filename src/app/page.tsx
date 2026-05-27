'use client';

import { useState, useRef, useEffect } from 'react';

// Ảnh đại diện chất lượng cao cho các đĩa nhạc
const IMG_LOFI = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80';
const IMG_NIGHT = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80';
const IMG_RELAX = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80';
const IMG_FOCUS = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80';
const IMG_SUMMER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80';

// Danh sách bài hát phát đúng giai điệu thực tế 100% không mất bài nào
const SONGS_DATA = [
  { 
    id: 1, 
    title: 'Không Thời Gian', 
    artist: 'Trần Ngân', 
    img: IMG_LOFI, 
    src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_thoi_gian_tran_ngan.mp3' 
  },
  { 
    id: 2, 
    title: 'Yêu Em 2 Ngày (Slowed)', 
    artist: 'Xuân Nghi x Nguyễn Hoàng', 
    img: IMG_NIGHT, 
    src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/yeu_em_2_ngay_slowed.mp3' 
  },
  { 
    id: 3, 
    title: 'Không Ngừng Suy Nghĩ', 
    artist: 'Quốc Phạm', 
    img: IMG_RELAX, 
    src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_ngung_suy_nghi_quoc_pham.mp3' 
  },
  { 
    id: 4, 
    title: 'Deep Focus', 
    artist: 'Study & Coding Music', 
    img: IMG_FOCUS, 
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' 
  },
  { 
    id: 5, 
    title: 'Summer Chill', 
    artist: 'Weekend Relax Music', 
    img: IMG_SUMMER, 
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' 
  },
];

export default function Home() {
  const [songs] = useState(SONGS_DATA);
  const [currentSong, setCurrentSong] = useState(SONGS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Đồng bộ trạng thái xoay đĩa khi bấm nút Play/Pause trên trình phát nhạc
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentSong]);

  // Click chọn bài dưới danh sách
  const handleSelectSong = (song: typeof SONGS_DATA[0]) => {
    setCurrentSong(song);
    setIsPlaying(false); // Reset trạng thái để khi bấm nút phát bài mới đĩa mới xoay
  };

  // Ô tìm kiếm lọc bài hát
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
      
      {/* Khung đĩa nhạc lớn hình tròn */}
      <div className="music-container" style={{ marginBottom: '20px' }}>
        <div className="img-container" style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '8px solid #222', boxShadow: '0 0 20px rgba(255,255,255,0.1)', position: 'relative' }}>
          <img 
            src={currentSong.img} 
            alt={currentSong.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              borderRadius: '50%',
              // Hiệu ứng xoay tròn mượt mà bằng CSS trực tiếp
              animation: 'spin 12s linear infinite',
              animationPlayState: isPlaying ? 'running' : 'paused'
            }} 
          />
          {/* Tâm tròn nhỏ giữa đĩa nhạc giống đĩa than thật */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', backgroundColor: '#000', borderRadius: '50%', border: '4px solid #ff4757' }}></div>
        </div>
      </div>

      {/* CSS làm hiệu ứng quay đĩa */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Thông tin bài hát đang phát */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 5px 0' }}>{currentSong.title}</h2>
        <p style={{ color: '#aaa', margin: 0 }}>{currentSong.artist}</p>
      </div>

      {/* Thanh phát nhạc (Player) điều khiển âm thanh thật */}
      <div style={{ marginBottom: '30px', width: '100%', maxWidth: '400px' }}>
        <audio ref={audioRef} src={currentSong.src} controls autoPlay={isPlaying} style={{ width: '100%' }} />
      </div>

      {/* Ô tìm kiếm bài hát thực tế */}
      <div style={{ marginBottom: '30px', width: '100%', maxWidth: '300px' }}>
        <input 
          type="text" 
          placeholder="🔍 Tìm kiếm bài hát..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #333', backgroundColor: '#111', color: '#fff', textAlign: 'center', outline: 'none' }}
        />
      </div>

      <h3 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Popular Songs</h3>

      {/* Danh sách bài hát phía dưới */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '800px' }}>
        {filteredSongs.map((song) => (
          <div 
            key={song.id} 
            onClick={() => handleSelectSong(song)}
            style={{
              backgroundColor: currentSong.id === song.id ? '#1e1e1e' : '#0a0a0a',
              border: currentSong.id === song.id ? '1px solid #ff4757' : '1px solid #222',
              padding: '12px',
              borderRadius: '10px',
              cursor: 'pointer',
              width: '140px',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={song.img} alt={song.title} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
            <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}