// script.js
function getRawLink() {
    const url = document.getElementById('urlInput').value.trim();
    const result = document.getElementById('result');
    
    // Kiểm tra URL hợp lệ
    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/blob\/[\w-]+\/.+$/;
    if (!githubRegex.test(url)) {
        result.innerHTML = 'URL tệp GitHub không hợp lệ. Phải bao gồm /blob/ và liên kết đến một tệp.';
        return;
    }

    // Thay thế để tạo raw link
    try {
        const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        result.innerHTML = `Raw Link: <a href="${rawUrl}" target="_blank">${rawUrl}</a>`;
    } catch (error) {
        result.innerHTML = 'Có lỗi khi tạo link raw, vui lòng thử lại';
    }
}