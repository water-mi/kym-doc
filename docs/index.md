# 这里是匡院课程笔记分享站

打算将这个网站建立成匡亚明学院本科学习过程中的一个笔记分享站，其他内容 TBD

## 网站开源项目介绍

本站采用开源项目 Mkdocs 与 Material 进行构建，页面采用 Markdown 进行写作。你可以在下面找到它们的网站和非官方的中文化版本。如果你希望通过 Git 协作来完成贡献，你可能会用到这下面的内容。

Mkdocs: [官方](https://www.mkdocs.org/), [非官方中文](https://hellowac.github.io/mkdocs-docs-zh/)

Material: [官方](https://squidfunk.github.io/mkdocs-material/), [非官方中文](https://mkdocs.dbtgo.com/getting-started/)

!!! note

    对于协助开发者，你可能需要进行本地调试，环境以来文件位于 `requirements.txt` 中，在安装好 python 之后，在顶层文件夹中执行如下命令

    ```bash
    pip install -r requirements.txt
    ```

## 我应该如何贡献自己的笔记

一般来说，理想的笔记情况应当是采用 Markdown 格式，对于其中的图片，应尽可能采用外链（可以考虑使用图床或 njubox），未来会逐渐替换掉原来存储在仓库中的图片。

然而，现实中很多的笔记通常采用手写，转换成 Markdown 是一个麻烦的工作，所以可以采用 pdf + 外链链接的形式来完成（pdf 请上传至外部网盘如 njubox 中）

如果您有意向分享自己的笔记，有如下两种方式：

1. 本地部署 Mkdocs，并通过提交 Pull requrest 的方式。

2. 联系他人代为提交
