function getRawLink() {
    const url = document.getElementById('urlInput').value.trim();
    const result = document.getElementById('result');
    
    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/blob\/[\w-]+\/.+$/;
    if (!githubRegex.test(url)) {
        result.innerHTML = 'URL tệp GitHub không hợp lệ. Phải bao gồm /blob/ và liên kết đến một tệp.';
        return;
    }

    try {
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        result.innerHTML = `Raw Link: <a href="${rawUrl}" target="_blank">${rawUrl}</a>`;
    } catch (error) {
        result.innerHTML = 'Có lỗi khi tạo link raw, vui lòng thử lại';
    }
}

// Phát nhạc khi tương tác
const music = document.getElementById('backgroundMusic');
let isPlaying = false;

function toggleMusic() {
    if (!isPlaying) {
        music.play().then(() => {
            isPlaying = true;
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
        });
    }
}

// Kích hoạt trên mọi tương tác
document.addEventListener('mousemove', toggleMusic);
document.addEventListener('click', toggleMusic);
document.addEventListener('touchstart', toggleMusic); // Chạm
document.addEventListener('touchend', toggleMusic);  // Nhấn và thả

// Kiểm tra ảnh nền
window.addEventListener('load', () => {
    const bgImage = new Image();
    bgImage.src = 'https://raw.githubusercontent.com/tongtrankien1605/picture/main/city-night.jpg';
    bgImage.onload = () => console.log('Ảnh nền tải thành công');
    bgImage.onerror = () => console.log('Lỗi tải ảnh nền, kiểm tra link');
});