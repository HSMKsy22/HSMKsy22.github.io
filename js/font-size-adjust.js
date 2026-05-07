document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.markdown-body');
    if (!content) return; // 如果不是文章頁面就停止執行

    // 1. 初始化：優先從 localStorage 讀取舊設定，若無則預設 16
    let savedSize = localStorage.getItem('user-font-size');
    let currentSize = savedSize ? parseInt(savedSize) : 16;

    // 立即套用存取的字級
    content.style.fontSize = currentSize + 'px';

    // 2. 建立控制按鈕（含手機用切換按鈕）
    const container = document.createElement('div');
    container.id = 'font-adjust-ctrl';
    container.innerHTML = `
    <button id="font-toggle" aria-label="展開字體調整">A</button>
    <button id="font-inc" aria-label="放大字體">A+</button>
    <button id="font-dec" aria-label="縮小字體">A-</button>
  `;
    document.body.appendChild(container);

    // 3. 手機版：預設收合
    if (window.innerWidth <= 768) {
        container.classList.add('collapsed');
    }

    // 4. 定義儲存與套用函數
    const updateFontSize = (newSize) => {
        content.style.fontSize = newSize + 'px';
        localStorage.setItem('user-font-size', newSize);
    };

    // 5. 自動收合計時器（手機版展開後 3 秒自動關閉）
    let collapseTimer;
    const startCollapseTimer = () => {
        clearTimeout(collapseTimer);
        if (window.innerWidth <= 768) {
            collapseTimer = setTimeout(() => {
                container.classList.add('collapsed');
            }, 3000);
        }
    };

    // 6. 切換按鈕事件（手機版）
    document.getElementById('font-toggle').addEventListener('click', () => {
        container.classList.toggle('collapsed');
        if (!container.classList.contains('collapsed')) {
            startCollapseTimer(); // 展開後開始倒數
        } else {
            clearTimeout(collapseTimer);
        }
    });

    // 7. 綁定 A+ / A- 事件
    document.getElementById('font-dec').addEventListener('click', () => {
        if (currentSize > 12) {
            currentSize -= 1;
            updateFontSize(currentSize);
            startCollapseTimer(); // 操作後重置倒數
        }
    });

    document.getElementById('font-inc').addEventListener('click', () => {
        if (currentSize < 24) {
            currentSize += 1;
            updateFontSize(currentSize);
            startCollapseTimer(); // 操作後重置倒數
        }
    });
});