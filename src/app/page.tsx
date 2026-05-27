'use client';

import { useState, useRef, useEffect } from 'react';

// Ảnh đại diện chất lượng cao cho các đĩa nhạc
const IMG_LOFI = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80';
const IMG_NIGHT = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80';
const IMG_RELAX = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80';
const IMG_FOCUS = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80';
const IMG_SUMMER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80';

const SONGS_DATA = [
  { id: 1, title: 'Không Thời Gian', artist: 'Trần Ngân', img: IMG_LOFI, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Yêu Em 2 Ngày (Slowed)', artist: 'Xuân Nghi x Nguyễn Hoàng', img: IMG_NIGHT, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Không Ngừng Suy Nghĩ', artist: 'Quốc Phạm', img: IMG_RELAX, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Deep Focus', artist: 'Study & Coding Music', img: IMG_FOCUS, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Summer Chill', artist: 'Weekend Relax Music', img: IMG_SUMMER, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 6, title: 'Waiting For You', artist: 'MONO', img: IMG_LOFI, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 7, title: 'Nấu Ăn Cho Em', artist: 'Đen Vâu ft. PiaLinh', img: IMG_SUMMER, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 8, title: 'See Tình', artist: 'Hoàng Thùy Linh', img: IMG_NIGHT, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 9, title: 'Nếu Lúc Đó', artist: 'tlinh x 2pillz', img: IMG_RELAX, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id: 10, title: 'Lan Man', artist: 'Ronboogz', img: IMG_FOCUS, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' }
];

export default function Home() {
  const [songs] = useState(SONGS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = songs[currentIndex];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Theo dõi thời gian nhạc chạy để cập nhật thanh tiến trình tua nhạc
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleNext(); // Hết bài tự động chuyển bài tiếp theo

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex]);

  // Điều khiển Phát / Dừng
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.log(err));
      setIsPlaying(true);
    }
  };

  // Chuyển bài tiếp theo
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  // Quay lại bài trước
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  // Chọn bài trực tiếp từ danh sách playlist
  const handleSelectSong = (songId: number) => {
    const index = songs.findIndex(s => s.id === songId);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  // Xử lý khi người dùng kéo thanh tua nhạc
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Định dạng thời gian hiển thị dạng mm:ss
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '20px 20px 120px 20px' }}>
      
      {/* Ẩn thẻ audio gốc của trình duyệt đi, chỉ dùng bộ điều khiển tự chế xịn sò */}
      <audio ref={audioRef} src={currentSong.src} autoPlay={isPlaying} />

      {/* Khung đĩa nhạc hình tròn lớn */}
      <div className="music-container" style={{ marginBottom: '20px' }}>
        <div className="img-container" style={{ width: '220px', height: '220px', borderRadius: '50%', overflow: 'hidden', border: '8px solid #222', boxShadow: '0 0 30px rgba(255,75,92,0.15)', position: 'relative' }}>
          <img 
            src={currentSong.img} 
            alt={currentSong.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              borderRadius: '50%',
              animation: 'spin 12s linear infinite',
              animationPlayState: isPlaying ? 'running' : 'paused'
            }} 
          />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '45px', height: '45px', backgroundColor: '#000', borderRadius: '50%', border: '4px solid #ff4757' }}></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Thông tin bài hát đang phát */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>{currentSong.title}</h2>
        <p style={{ color: '#ff4757', margin: 0, fontWeight: 'bold', fontSize: '1rem' }}>{currentSong.artist}</p>
      </div>

      {/* Ô tìm kiếm bài hát thiết kế tối giản */}
      <div style={{ marginBottom: '30px', width: '100%', maxWidth: '340px' }}>
        <input 
          type="text" 
          placeholder="🔍 Tìm bài hát hoặc nghệ sĩ yêu thích..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #222', backgroundColor: '#111', color: '#fff', textAlign: 'center', outline: 'none', fontSize: '0.95rem' }}
        />
      </div>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', alignSelf: 'center', color: '#aaa', borderBottom: '1px solid #222', paddingBottom: '5px', width: '100%', maxWidth: '500px', textAlign: 'center' }}>Melody Playlist</h3>

      {/* Danh sách bài hát (Lưới các đĩa nhạc nhỏ gọn) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '800px' }}>
        {filteredSongs.map((song) => (
          <div 
            key={song.id} 
            onClick={() => handleSelectSong(song.id)}
            style={{
              backgroundColor: currentSong.id === song.id ? '#111' : '#050505',
              border: currentSong.id === song.id ? '1px solid #ff4757' : '1px solid #151515',
              padding: '12px',
              borderRadius: '12px',
              cursor: 'pointer',
              width: '140px',
              textAlign: 'center',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img src={song.img} alt={song.title} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
            <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.artist}</p>
          </div>
        ))}
      </div>

      {/* ========================================================
          Thanh điều khiển nhạc chính hiệu cố định ở đáy màn hình (FIXED BOTTOM BAR)
         ======================================================== */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#111', borderTop: '1px solid #222', padding: '15px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', boxShadow: '0 -10px 30px rgba(0,0,0,0.5)', zIndex: 999 }}>
        
        {/* Thanh thời gian chạy & Tua nhạc */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: '#aaa', minWidth: '35px' }}>{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleProgressChange} 
            style={{ flex: 1, accentColor: '#ff4757', cursor: 'pointer', height: '4px' }}
          />
          <span style={{ fontSize: '0.75rem', color: '#aaa', minWidth: '35px' }}>{formatTime(duration)}</span>
        </div>

        {/* Cụm nút bấm điều khiển Premium */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          {/* Nút lùi bài */}
          <button onClick={handlePrev} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.4rem', outline: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ff4757'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>
            ⏮
          </button>
          
          {/* Nút Play / Pause To Bự ở Giữa */}
          <button onClick={togglePlay} style={{ backgroundColor: '#ff4757', border: 'none', color: '#fff', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(255,71,87,0.3)', transition: 'transform 0.1s', outline: 'none' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          {/* Nút tiến bài */}
          <button onClick={handleNext} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.4rem', outline: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ff4757'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>
            ⏭
          </button>
        </div>

      </div>

    </div>
  );
}