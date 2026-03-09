# 这是一个测试界面

## pdf 内嵌测试

您可以参考如下代码来了解如何在 Mkdocs 中内嵌 pdf 文件，我们通过 `embedpdf.js` 来展示 pdf，以解决手机端无法观看的问题。

```html
<div class="pdf-viewer-container" data-pdf="这里输入文件名"></div>
```

此外，pdf 文件应尽可能该存储在外部网盘中，并通过外链的方式进行引用，以避免仓库过大导致的问题。

??? note "点我查看显示效果"
    <div class="pdf-viewer-container" data-pdf="../test.pdf"></div>

## 代码块测试

```c title="hello.c"
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```
