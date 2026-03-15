# 添加笔记教程

## 仓库的克隆

为了方便维护，我们将网站部署到了 Github 上。如果您不熟悉 git，可能需要先学习一下。通过如下命令将仓库 Clone 到本地：

```bash
git clone https://github.com/kym-doc/doc.git
```

!!! tip "如果需要本地部署"

    您可能需要进行本地调试，环境依赖文件位于 `requirements.txt` 中，在安装好 python 之后，在顶层文件夹中执行如下命令

    ```bash linenums="0"
    pip install -r requirements.txt
    ```

    接下来，在顶层目录下执行命令来预览网站：

    ```bash linenums="0"
    # 方式一：使用 Mkdocs 自带的命令来预览网站
    mkdocs serve
    # 方式二：先部署到本地，再通过 Python 启动一个本地服务器
    mkdocs build
    cd site # 默认会生成在 site 目录下
    python -m http.server 8000 # 端口号可以自定义
    ```

    您可以在浏览器中访问 `http://localhost:8000` 来查看网站。

## 目录结构

Mkdocs 中的文件存储在 `docs` 目录下。你可以根据课程具体性质，将笔记文件放在不同的子目录下。一般来说，放置在 `专业/课程名/` 目录下。我们推荐用英文来命名文件夹和文件，这些名字应该在能准确描述课程的情况下做到简短。如果一门课程存在多个学期来源，建议在文件夹名中包含学期信息。如 `2024Fall` 或者 `2025Spring`。

此外，原则上每一门收录的课程都应该有一个用于简要介绍该课程的文件 `about.md`。例如：

``` linenums="0"
docs
├── all # 这个文件夹表示的是多专业合上/通修的课程
│   ├── index.md # 用来介绍该专业的文件
│   ├── modern_applied_math # 近代应用数学目录
│   │   ├── about.md # 用来介绍该课程的文件
│   │   ├── 课程笔记.md
│   │   ├── ...
│   ├── 其他课程
│   │   ├── ...
```

## 将文件链接到网站

Mkdocs 不会自动扫描 `docs` 目录下的文件。您需要手动将文件添加到 `mkdocs.yml` 中的 `nav` 配置项中。使用两格缩进表示子目录。请注意，索引必须完整，但不包含 `docs/` 前缀。

例如：

```yaml linenums="0"
nav:
  - 主页: index.md
  - 添加笔记教程: contribute.md
  - 多专业合上/通修:
    - all/index.md
    - 近代应用数学:
      - 课程介绍: all/modern_applied_math/about.md
      - ...
```

一般来说，理想的笔记情况应当是采用 Markdown 格式，如果您需要在笔记中包含图片等其他媒体文件，应采用外链（可以考虑使用图床或 njubox）。

!!! note "关于自定义语法的说明"

    得益于 Material 主题提供的强大功能，您可以使用一些自定义语法来增强笔记的可读性和美观度。例如，您可以使用 `!!! note` 语法来创建一个 note 类型的提示框，或者使用 `!!! warning` 来创建警告框。这些[自定义语法](https://squidfunk.github.io/mkdocs-material/reference/admonitions/)被很好地支持，并且可以显著提升笔记的视觉效果和阅读体验。

    此外，Typora 等编辑器支持的 `[!NOTE]` 语法在这里是无法使用的，如果你的文件中包含了这样的语法，会导致预览时显示异常。您可以考虑通过 Agent 来转换这些语法，将其转换为 Material 主题所支持的格式。

## 如何将 pdf 文件链接到网站

然而，现实中很多的笔记通常采用手写，转换成 Markdown 是一个麻烦的工作，所以可以采用 pdf + 外链链接的形式来完成（pdf 请上传至外部网盘如 njubox 中）。我们通过 `embedpdf.js` 来展示 pdf 文件，以解决手机端无法观看的问题。

通过在 Markdown 源文件中添加如下代码，您可以在页面中引用 pdf 文件：

```html linenums="0"
<div class="pdf-viewer-container" data-pdf="这里输入文件链接"></div>
``` 

!!! warning "注意事项"

    这是一个自定义语法，若您采用 Typora 或者其他 Markdown 编辑器，该语法不被支持。您只能通过预览/部署网站来查看效果。

    此外，由于自定义语法的局限性，**一个页面最多只能引用一个 pdf 文件**。

??? note "点我查看显示效果"
    <div class="pdf-viewer-container" data-pdf="../test.pdf"></div>


## 代码块

对于计算机/人工智能相关的课程，您可以正常添加代码块，代码块支持行号和复制功能。

Material 支持了许多扩展的代码块语法，如文件标题，额外注释等，参考[此页面](https://squidfunk.github.io/mkdocs-material/reference/code-blocks/#usage)。

```c title="hello.c"
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```