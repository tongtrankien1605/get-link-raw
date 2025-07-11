// Khởi tạo trạng thái nhạc nền
const music = document.getElementById('backgroundMusic');
const speakerIcon = document.getElementById('speakerIcon');
let isPlaying = false;
let isMuted = false;

function getRawLink() {
    const url = document.getElementById('urlInput').value.trim();
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');

    // Regex cho link base GitHub
    const githubRegex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/blob\/([\w-]+)\/(.+)$/;
    // Regex cho link CDN jsDelivr
    const cdnJsDelivrRegex = /^https:\/\/cdn\.jsdelivr\.net\/gh\/([\w-]+)\/([\w-]+)@([\w-]+)\/(.+)$/;

    let user, repo, branch, path, rawUrl;

    // Kiểm tra link base GitHub
    const githubMatch = url.match(githubRegex);
    // Kiểm tra link CDN jsDelivr
    const cdnMatch = url.match(cdnJsDelivrRegex);

    if (githubMatch) {
        user = githubMatch[1];
        repo = githubMatch[2];
        branch = githubMatch[3];
        path = githubMatch[4];
    } else if (cdnMatch) {
        user = cdnMatch[1];
        repo = cdnMatch[2];
        branch = cdnMatch[3];
        path = cdnMatch[4];
    } else {
        result.innerHTML = 'URL không hợp lệ. Phải là link GitHub (/blob/) hoặc CDN jsDelivr với @branch.';
        copyButton.style.display = 'none';
        return;
    }

    try {
        // Tạo link raw GitHub
        rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
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

// Dán từ clipboard
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('urlInput').value = text;
        document.getElementById('result').innerHTML = '';
        document.getElementById('copyButton').style.display = 'none';
        // alert('Đã dán URL!');
    } catch (error) {
        console.log('Lỗi dán từ clipboard:', error);
        alert('Không thể dán từ clipboard. Vui lòng dán thủ công.');
    }
}

function toggleMusic() {
    if (!isPlaying && !isMuted) {
        music.play().then(() => {
            isPlaying = true;
            speakerIcon.textContent = '🔊';
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
        });
    }
}

function toggleSpeaker() {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        isMuted = true;
        speakerIcon.textContent = '🔇';
    } else {
        music.play().then(() => {
            isPlaying = true;
            isMuted = false;
            speakerIcon.textContent = '🔊';
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
        });
    }
}

document.addEventListener('mousemove', toggleMusic);
document.addEventListener('touchstart', toggleMusic);
document.addEventListener('touchend', toggleMusic);
document.addEventListener('click', (e) => {
    if (!e.target.closest('.speaker-button')) {
        toggleMusic();
    }
});

// Kiểm tra ảnh nền
window.addEventListener('load', () => {
    const bgImage = new Image();
    bgImage.src = 'https://cdn.jsdelivr.net/gh/tongtrankien1605/tongtrankien1605@main/global/image/city-night.jpg';
    bgImage.onload = () => console.log('Ảnh nền tải thành công');
    bgImage.onerror = () => console.log('Lỗi tải ảnh nền, kiểm tra link');
    // Ẩn nút dán nếu clipboard API không được hỗ trợ
    if (!navigator.clipboard || !navigator.clipboard.readText) {
        document.querySelector('.paste-button').style.display = 'none';
    }
});