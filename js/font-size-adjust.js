document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.markdown-body');
    if (!content) return; // 如果不是文章頁面就停止執行

    // 1. 初始化：優先從 localStorage 讀取舊設定，若無則預設 16
    let savedSize = localStorage.getItem('user-font-size');
    let currentSize = savedSize ? parseInt(savedSize) : 16;

    // 立即套用存取的字級
    content.style.fontSize = currentSize + 'px';

    // 2. 建立控制按鈕
    const container = document.createElement('div');
    container.id = 'font-adjust-ctrl';
    container.innerHTML = `
    <button id="font-dec" aria-label="縮小字體">A-</button>
    <button id="font-inc" aria-label="放大字體">A+</button>
  `;
    document.body.appendChild(container);

    // 3. 定義儲存與套用函數
    const updateFontSize = (newSize) => {
        content.style.fontSize = newSize + 'px';
        localStorage.setItem('user-font-size', newSize); // 關鍵：存入瀏覽器快取
    };

    // 4. 綁定事件
    document.getElementById('font-dec').addEventListener('click', () => {
        if (currentSize > 12) {
            currentSize -= 1;
            updateFontSize(currentSize);
        }
    });

    document.getElementById('font-inc').addEventListener('click', () => {
        if (currentSize < 24) {
            currentSize += 1;
            updateFontSize(currentSize);
        }
    });
});