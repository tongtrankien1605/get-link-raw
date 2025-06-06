function getRawLink() {
    const url = document.getElementById('urlInput').value.trim();
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    
    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/blob\/[\w-]+\/.+$/;
    if (!githubRegex.test(url)) {
        result.innerHTML = 'URL tệp GitHub không hợp lệ. Phải bao gồm /blob/ và liên kết đến một tệp.';
        copyButton.style.display = 'none';
        return;
    }

    try {
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        result.innerHTML = `Raw Link: <a href="${rawUrl}" target="_blank">${rawUrl}</a>`;
        copyButton.style.display = 'inline-block';
        copyButton.setAttribute('data-link', rawUrl);
    } catch (error) {
        result.innerHTML = 'Có lỗi khi tạo link raw, vui lòng thử lại';
        copyButton.style.display = 'none';
    }
}

function copyLink() {
    const copyButton = document.getElementById('copyButton');
    const link = copyButton.getAttribute('data-link');
    navigator.clipboard.writeText(link).then(() => {
        alert('Đã copy link!');
    }).catch(error => {
        console.log('Lỗi copy:', error);
    });
}

function clearInput() {
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    
    urlInput.value = '';
    result.innerHTML = '';
    copyButton.style.display = 'none';
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

document.addEventListener('mousemove', toggleMusic);
document.addEventListener('touchstart', toggleMusic);
document.addEventListener('touchend', toggleMusic);
document.addEventListener('click', toggleMusic);

// Kiểm tra ảnh nền
window.addEventListener('load', () => {
    const bgImage = new Image();
    bgImage.src = 'https://raw.githubusercontent.com/tongtrankien1605/tongtrankien1605/main/global/image/city-night.jpg';
    bgImage.onload = () => console.log('Ảnh nền tải thành công');
    bgImage.onerror = () => console.log('Lỗi tải ảnh nền, kiểm tra link');
});