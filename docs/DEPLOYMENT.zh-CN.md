# 发布到 GitHub Pages

本项目已于 2026-09-23 发布到 [GitHub Pages](https://wesweswes7.github.io/personal-website/)，源码仓库为 [Wesweswes7/personal-website](https://github.com/Wesweswes7/personal-website)。向 `main` 分支提交更新后，GitHub Actions 会自动重新构建和发布。

## 推荐流程

1. 在 `Wesweswes7` 账号下使用 `personal-website` 仓库，默认分支设为 `main`。
2. 将本目录内容作为仓库根目录；不要把外层 `outputs` 或整个工作目录一起上传。`.github/workflows/deploy.yml` 必须位于仓库根目录下的 `.github/workflows/`。
3. 不上传 `node_modules`、`.next`、`out`，这些目录已被 `.gitignore` 忽略。提交 `package-lock.json`。
4. 打开仓库 Settings → Pages，将 Source 设为 GitHub Actions。
5. 在 Actions 中手动运行 `Deploy website to GitHub Pages`，或者向 `main` 提交变更。
6. 等待 build 与 deploy 两个任务完成，从部署任务显示的链接访问网站。

当前项目站点地址为 `https://wesweswes7.github.io/personal-website/`，英文入口为 `/en/`，中文入口为 `/zh/`。

工作流通过 `actions/configure-pages` 读取 `origin` 与 `base_path`。Next.js 以这些信息生成页面资源、图片、语言切换、canonical 和 sitemap。无需在每个内容文件里添加仓库前缀。

GitHub Pages 在工作流运行前需要启用。若 configure-pages 提示站点不存在，先检查 Settings → Pages 的 Source 是否已经设置为 GitHub Actions。组织或账号的 Actions 策略也可能限制工作流执行。

## 本地模拟项目子路径

PowerShell：

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/personal-website'
$env:NEXT_PUBLIC_SITE_URL = 'https://wesweswes7.github.io'
npm run build
npm run preview -- --base /personal-website
```

访问预览服务打印的地址。需要改回根路径构建时，清除这两个环境变量后重新构建。环境变量在构建时生效，不能只在上传后改变路径。

## 独立域名与用户站点

若未来使用独立域名，先在 GitHub Pages 中配置域名和 DNS，工作流随后读取新地址；重新部署并检查 canonical、语言切换、图片和 CV。

若使用 `Wesweswes7.github.io` 用户站点仓库，根路径通常为空。Profile README 的同名仓库 `Wesweswes7`、网站源仓库 `personal-website` 与用户站点仓库 `Wesweswes7.github.io` 是不同用途，不应混淆。

## 验证与恢复

发布后打开两种语言的首页、全部导航页面、一个真实项目或笔记详情（如果已有），并直接刷新子页面。检查 CV 及图片。发布失败时先阅读 build 或 deploy 的错误日志；恢复旧版本可回退导致问题的提交，再运行同一工作流。

官方参考：[Next.js 静态导出](https://nextjs.org/docs/app/guides/static-exports)、[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
