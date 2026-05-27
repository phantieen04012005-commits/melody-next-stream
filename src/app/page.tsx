'use client';

import { useState } from 'react';

// Dữ liệu giả lập cho các trang
const songs = [
  { id: 1, title: 'Không Thời Gian', artist: 'Trần Ngân' },
  { id: 2, title: 'I Miss You', artist: 'Elijah Woods' },
  { id: 3, title: 'Không Ngừng Suy Nghĩ', artist: 'Dương Domic' },
  { id: 4, title: 'Waiting For You', artist: 'MONO' },
  { id: 5, title: 'Nấu Ăn Cho Em', artist: 'Đen Vâu' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Khám Phá');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Sidebar - Luôn hiển thị */}
      <div style={{ width: '260px', padding: '20px', borderRight: '1px solid #222' }}>
        <h1 style={{ fontSize: '1.4rem', color: '#ff4757', marginBottom: '20px' }}>🎵 Melody STREAM</h1>
        <button style={{ width: '100%', padding: '10px', background: '#ff4757', border: 'none', borderRadius: '5px', color: '#fff', cursor: 'pointer' }}>
          🔐 Đăng nhập hệ thống
        </button>
        <div style={{ marginTop: '30px', color: '#aaa', lineHeight: '2.5', cursor: 'pointer' }}>
          {['Khám Phá', '#melodychart', 'Thư Viện'].map(tab => (
            <p key={tab} onClick={() => setActiveTab(tab)} style={{ color: activeTab === tab ? '#fff' : '#aaa' }}>{tab}</p>
          ))}
        </div>
      </div>

      {/* Main Content - Nội dung thay đổi theo activeTab */}
      <div style={{ flex: 1, padding: '40px' }}>
        <input placeholder="🔍 Tìm kiếm bài hát hoặc ca sĩ..." style={{ width: '300px', padding: '10px', background: '#111', border: 'none', color: '#fff', borderRadius: '20px' }} />

        {activeTab === 'Khám Phá' && (
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            {/* Trình phát nhạc như image_66099c.jpg */}
            <div style={{ background: '#111', padding: '30px', borderRadius: '20px', width: '300px', margin: '0 auto' }}>
              <h3>Deep Focus lofi</h3>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#333', margin: '20px auto' }}></div>
              <div style={{ fontSize: '2rem' }}>⏯</div>
            </div>
            <h3 style={{ marginTop: '40px' }}>POPULAR SONGS</h3>
          </div>
        )}

        {activeTab === 'Thư Viện' && (
          <div style={{ marginTop: '100px', textAlign: 'center', border: '1px solid #333', padding: '50px', borderRadius: '20px' }}>
            <h3>🎵 Thư Viện Cá Nhân</h3>
            <p>Vui lòng bấm nút "🔐 Đăng nhập hệ thống" bên Sidebar trái để truy cập không gian thư viện cá nhân.</p>
          </div>
        )}

        {activeTab === '#melodychart' && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ color: '#ff4757' }}>#melodychart Bảng xếp hạng xu hướng</h3>
            {songs.map((song, index) => (
              <div key={song.id} style={{ display: 'flex', alignItems: 'center', padding: '15px', borderBottom: '1px solid #222' }}>
                <span style={{ marginRight: '20px', fontSize: '1.5rem', color: '#ff4757' }}>{index + 1}</span>
                <div>
                  <p>{song.title}</p>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}