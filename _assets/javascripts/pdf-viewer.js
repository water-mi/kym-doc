document.addEventListener("DOMContentLoaded", () => {
    const viewers = document.querySelectorAll(".pdf-viewer-container");

    viewers.forEach((container, index) => {
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

        // 切换布局
        controls.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
            radio.addEventListener("change", (e) => {
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

            // IntersectionObserver 懒加载每页
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const pageNum = parseInt(entry.target.dataset.page);

                        // 只有在页面可视时才渲染 Canvas → JPG
                        pdf.getPage(pageNum).then(page => {
                            const containerWidth = entry.target.clientWidth;
                            const viewport = page.getViewport({ scale: 1 });
                            const scale = containerWidth / viewport.width;
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

                        obs.unobserve(entry.target); // 每页只渲染一次
                    }
                });
            }, { root: pagesContainer, rootMargin: "200px 0px" });

            pages.forEach(page => observer.observe(page));
        });
    });
});