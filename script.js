// script.js
function getRawLink() {
    const url = document.getElementById('urlInput').value.trim();
    const result = document.getElementById('result');
    
    // Kiểm tra URL hợp lệ
    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/blob\/[\w-]+\/.+$/;
    if (!githubRegex.test(url)) {
        result.innerHTML = 'Invalid GitHub file URL. Must include /blob/ and point to a file.';
        return;
    }

    // Thay thế để tạo raw link
    try {
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        result.innerHTML = `Raw Link: <a href="${rawUrl}" target="_blank">${rawUrl}</a>`;
    } catch (error) {
        result.innerHTML = 'Error generating raw link.';
    }
}