function initPDFViewers(context = document) {
    const viewers = context.querySelectorAll(".pdf-viewer-container");

    viewers.forEach((container, index) => {
        if (container.dataset.pdfInitialized) return;
        container.dataset.pdfInitialized = "true";

        const url = container.dataset.pdf;

        // 提示文字
        const notice = document.createElement("div");
        notice.className = "pdf-viewer-notice";
        notice.textContent = "本页面采用内嵌 PDF 展示，请耐心等待加载";
        container.appendChild(notice);

        // 控制按钮
        const controls = document.createElement("div");
        controls.className = "pdf-viewer-controls";
        const radioName = `view-mode-${index}`;
        controls.innerHTML = `
      <label>
        <input type="radio" name="${radioName}" value="vertical" checked> 纵向
      </label>
      <label style="margin-left:10px;">
        <input type="radio" name="${radioName}" value="horizontal"> 横向
      </label>
    `;
        container.appendChild(controls);

        // 页面容器
        const pagesContainer = document.createElement("div");
        pagesContainer.className = "pdf-viewer-pages pdf-viewer-vertical";
        container.appendChild(pagesContainer);

        // 横纵向切换
        controls.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
            radio.addEventListener("change", e => {
                if (e.target.checked) {
                    pagesContainer.classList.toggle("pdf-viewer-horizontal", e.target.value === "horizontal");
                    pagesContainer.classList.toggle("pdf-viewer-vertical", e.target.value === "vertical");
                }
            });
        });

        // 加载 PDF
        pdfjsLib.getDocument({ url, withCredentials: false }).promise.then(pdf => {
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const pageDiv = document.createElement("div");
                pageDiv.className = "pdf-viewer-page";
                pageDiv.dataset.page = pageNum;
                pagesContainer.appendChild(pageDiv);
            }

            const pages = pagesContainer.querySelectorAll(".pdf-viewer-page");

            // IntersectionObserver 真正懒加载
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const pageNum = parseInt(entry.target.dataset.page);

                        pdf.getPage(pageNum).then(page => {
                            const containerWidth = Math.max(entry.target.clientWidth, window.innerWidth * 0.8, 100);
                            const viewport = page.getViewport({ scale: 1 });
                            const scale = Math.min(containerWidth / viewport.width, 1.5); // 限制最大 scale
                            const scaledViewport = page.getViewport({ scale });

                            const canvas = document.createElement("canvas");
                            canvas.width = scaledViewport.width;
                            canvas.height = scaledViewport.height;
                            const context = canvas.getContext("2d");

                            page.render({ canvasContext: context, viewport: scaledViewport }).promise.then(() => {
                                const img = document.createElement("img");
                                img.src = canvas.toDataURL("image/jpeg", 0.9);
                                img.loading = "lazy"; // 浏览器懒加载补充
                                entry.target.appendChild(img);
                                canvas.remove();
                            });
                        });

                        obs.unobserve(entry.target);
                    }
                });
            }, { root: null, rootMargin: "200px 0px" });

            pages.forEach(page => observer.observe(page));
        });

    });
}

// 首次初始化
document.addEventListener("DOMContentLoaded", () => initPDFViewers());

// Material SPA 页面切换时重新初始化
document.addEventListener("md-nav-updated", () => initPDFViewers());