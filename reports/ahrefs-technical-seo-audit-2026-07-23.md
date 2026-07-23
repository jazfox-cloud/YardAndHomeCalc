# YardAndHomeCalc Ahrefs 技术 SEO 审计与本地整改

- 审计日期：2026-07-23
- 目标站点：`https://yardandhomecalc.com/`
- 仓库：`/Users/jazfox/Documents/YardAndHomeCalc`
- 范围：安全同步、只读生产审计、本地代码整改、本地构建、Wrangler Pages 运行时与浏览器回归
- 未执行：`git add`、commit、push、deploy、Cloudflare/GSC/Ahrefs 写操作、IndexNow 提交、Ahrefs Validate Fix

## 1. 仓库身份与同步

身份由以下证据共同确认：

- Git remote：`https://github.com/jazfox-cloud/YardAndHomeCalc.git`
- `app/layout.tsx` / `lib/metadata.ts`：`https://yardandhomecalc.com`
- `app/sitemap.ts`：全部 URL 使用 HTTPS apex
- `app/robots.ts`：sitemap 为 `https://yardandhomecalc.com/sitemap.xml`
- `functions/_middleware.js`：canonical host 为 `yardandhomecalc.com`

同步前：

- 分支：`main`
- HEAD：`ddd7009bf53a2765d6362e751c775afaa3ea9eab`
- `origin/main`：`44ca721930e506b20e8b2c4af6767730e66ae787`
- ahead/behind：`0/1`
- 唯一工作区文件：`?? reports/gsc-weekly/2026-07-23-yardandhomecalc.com-gsc-weekly-review.md`

执行 `git pull --ff-only origin main`，结果为纯 fast-forward，无 merge、rebase、stash、reset 或冲突。

同步后：

- HEAD = `origin/main` = `44ca721930e506b20e8b2c4af6767730e66ae787`
- ahead/behind：`0/0`
- GSC 周报仍为未跟踪文件，未修改、未移动、未删除、未暂存

## 2. 远端提交审计

远端提交：`44ca721 Fix page Open Graph URLs and email link`

实际变更：

- 8 个子页面改用 `pageMetadata()`。
- 新增 `lib/metadata.ts`，为子页面统一 title、description、canonical、Open Graph title/description/url/siteName/type。
- `og:url` 使用页面 path，经根布局的 `metadataBase` 输出为 HTTPS apex 绝对 URL，并与 canonical 一致。
- 新增 `components/EmailLink.tsx`，在客户端组合邮箱并在挂载后设置 `mailto:`，避免源 HTML 裸写邮箱被 Cloudflare Email Address Obfuscation 改写。

远端已解决：

- 8 个子页面错误或不一致的 `og:url`。
- canonical 与 `og:url` 的 HTTPS apex 一致性。
- Contact 邮箱的 Cloudflare 重写风险。

远端未解决：

- 9 个正式页面仍全部缺少 `og:image` 及尺寸、类型、alt。
- 没有完整、显式的 Twitter large-image metadata。
- 5 个短 description 未修改。
- 过长 title 未修改。
- 404 仍继承首页 canonical 和 Open Graph URL。

远端没有修改任何 title 或 description。

## 3. 页面、sitemap 与 Ahrefs 11 URL 解释

正式、可索引、进入 sitemap 的页面准确数量为 **9**。sitemap 集合与页面路由、构建输出、生产 200 页面和内部链接图一致。

| URL | 类型 | 生产状态 | 可索引 | Sitemap | Canonical | Title 长度 | Description 长度 | H1 | Robots | OG/Twitter | 入站 HTML 来源 | 正文图片 |
|---|---|---:|---|---|---|---:|---:|---:|---|---|---:|---:|
| `/` | 首页/hub | 200 | 是 | 是 | `/` | 57 | 120 | 1 | 默认 | 完整 | 8 | 0 |
| `/mulch-calculator/` | 计算器 | 200 | 是 | 是 | 同 URL | 55 | 128 | 1 | 默认 | 完整 | 8 | 0 |
| `/concrete-calculator/` | 计算器 | 200 | 是 | 是 | 同 URL | 58 | 124 | 1 | 默认 | 完整 | 8 | 0 |
| `/paint-calculator/` | 计算器 | 200 | 是 | 是 | 同 URL | 51 | 133 | 1 | 默认 | 完整 | 8 | 0 |
| `/about/` | 信息页 | 200 | 是 | 是 | 同 URL | 24 | 137 | 1 | 默认 | 完整 | 8 | 0 |
| `/contact/` | 联系页 | 200 | 是 | 是 | 同 URL | 26 | 131 | 1 | 默认 | 完整 | 8 | 0 |
| `/privacy/` | 法务页 | 200 | 是 | 是 | 同 URL | 33 | 139 | 1 | 默认 | 完整 | 8 | 0 |
| `/terms/` | 法务页 | 200 | 是 | 是 | 同 URL | 31 | 143 | 1 | 默认 | 完整 | 8 | 0 |
| `/disclaimer/` | 法务页 | 200 | 是 | 是 | 同 URL | 29 | 143 | 1 | 默认 | 完整 | 8 | 0 |

`robots.txt` 和 `sitemap.xml` 是非 HTML 静态资源，不计入正式页面；404 是 noindex 错误页，也不计入 sitemap 或正式页面。

邮件只有汇总、没有逐 URL CSV。可被源码和生产完整证明的是：

- 9 个正式 HTML 页面。
- Ahrefs 报告另有 2 个 3XX URL。
- 因而“11 internal URLs analyzed”与“9 个正式页面 + 2 个抓取到的重定向 URL”数量一致。

无法在不虚构数据的情况下确定邮件中的两个 3XX 究竟是哪两个 URL；候选包括 HTTP、www、无尾斜杠或历史抓取变体。当前链接图和 sitemap 没有重定向 URL，因此这两个 URL不是当前正式页面集合的一部分。

## 4. Ahrefs 六类提示复现

| 邮件提示 | 最新基线复现 | 本轮结果 |
|---|---|---|
| Open Graph tags incomplete：9 | 精确复现：9 个正式页面全部缺少分享图字段 | 9/9 完整 |
| Meta description too short：5 | 精确复现：About、Contact、Privacy、Terms、Disclaimer | 全部 120–143 字符且唯一 |
| Title too long：2 | Ahrefs 阈值下对应 Concrete 71、Paint 84；另发现 Mulch 66 高于本轮约 60 字符目标 | 三页均缩短至 51–58 |
| 3XX redirect：2 | 无 CSV，无法证明邮件中的精确两个 URL；生产存在合理规范化及一个 HTTP www 深层缺陷 | 站内链接与 sitemap 均不指向 3XX |
| HTTP to HTTPS redirect：1 | 精确复现 HTTP apex 301 到 HTTPS apex | 合理保留 |
| Pages to submit to IndexNow：1 | 无 CSV，最可能与当时最新 `lastmod` 的 Paint 页面有关，但无法证明 | 合理不实施 |

## 5. Open Graph 与 Twitter

远端同步后的 9 个问题页：

1. `/`
2. `/mulch-calculator/`
3. `/concrete-calculator/`
4. `/paint-calculator/`
5. `/about/`
6. `/contact/`
7. `/privacy/`
8. `/terms/`
9. `/disclaimer/`

共享 `pageMetadata()` 现在为每页输出：

- `og:title`
- `og:description`
- `og:url`
- `og:type=website`
- `og:image`
- `og:image:width=1200`
- `og:image:height=630`
- `og:image:type=image/png`
- `og:image:alt`
- `twitter:card=summary_large_image`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:image:alt`

所有 canonical、`og:url` 和分享图 URL 都是 `https://yardandhomecalc.com/...`，无 localhost、HTTP、www 或相对输出；没有设置未经证实的 Twitter 账号。

404 本地输出不含 canonical、`og:url`、`og:image` 或 Twitter 图片。

## 6. Description 前后对照

字符长度按解码后的英文字符计算。

| URL | 原文（长度） | 新文（长度） | 依据 |
|---|---|---|---|
| `/about/` | `Learn about Yard & Home Calc, an independent calculator site for yard and home project estimates.`（97） | `Learn how Yard & Home Calc helps homeowners, renters, and DIY planners estimate mulch, concrete, paint, and other project material needs.`（137） | 页面正文的受众、三类计算器与材料估算用途 |
| `/contact/` | `Contact Yard & Home Calc with questions, corrections, or calculator feedback.`（77） | `Contact Yard & Home Calc to report calculator issues, suggest corrections, or share feedback about yard and home project estimates.`（131） | 页面现有问题反馈、纠错和计算器建议用途 |
| `/privacy/` | `Privacy policy for Yard & Home Calc.`（36） | `Read how Yard & Home Calc handles browser-based calculator inputs, analytics, advertising services, cookies, and information sent by email.`（139） | 现有隐私正文明确包含这些处理场景 |
| `/terms/` | `Terms of use for Yard & Home Calc.`（34） | `Review the terms for using Yard & Home Calc calculators, including estimate limitations and your responsibility to verify project measurements.`（143） | 现有条款中的估算限制与用户核验责任 |
| `/disclaimer/` | `Estimator disclaimer for Yard & Home Calc.`（42） | `Understand the limits of Yard & Home Calc estimates and why material quantities should be checked against product labels and supplier guidance.`（143） | 现有免责声明中的估算边界、标签与供应商核验 |

最终 9 页 description 均存在、唯一，长度为 120–143；metadata 未出现在可见正文。

## 7. Title 前后对照

| URL | 原 title（长度） | 新 title（长度） | 保留意图 |
|---|---|---|---|
| `/concrete-calculator/` | `Concrete Calculator - Bags, Yards, and Slab Estimate | Yard & Home Calc`（71） | `Concrete Calculator: Yards, Bags & Cost | Yard & Home Calc`（58） | concrete calculator、yards、bags、cost |
| `/paint-calculator/` | `Paint Calculator - Estimate Gallons for Walls, Rooms, and Garages | Yard & Home Calc`（84） | `Paint Calculator: Gallons & Cost | Yard & Home Calc`（51） | paint calculator、gallons、cost |
| `/mulch-calculator/` | `Mulch Calculator - Estimate Mulch by Cubic Yard | Yard & Home Calc`（66） | `Mulch Calculator: Yards, Bags & Cost | Yard & Home Calc`（55） | mulch calculator、yards、bags、cost |

邮件的两个过长 title 可对应 Concrete 与 Paint；Mulch 未必达到 Ahrefs 的同一告警阈值，但高于本轮约 60 字符目标，因此一并做了不改变搜索意图的轻量缩短。最终 9 页 title 均存在、唯一、≤58 字符，无品牌模板重复拼接。

## 8. 社交分享图

同步后的仓库没有任何现有 PNG/JPEG/WebP/SVG 品牌分享图，也没有可合法复用的摄影素材。

本轮原创资产：

- 可编辑源：`public/yard-home-calc-share.svg`
- 生产图：`public/yard-home-calc-share.png`
- 尺寸：1200×630
- PNG：真实 PNG，8-bit RGB，不透明，无 alpha
- 体积：197,856 bytes
- SVG：XML 可解析，无 `<image>` 和外部 HTTP(S) 图片引用
- 配色：复用站点 evergreen `#17483f`、clay `#c96f2d`、soft background `#f6f7f4`
- 图形：原创计算器卡片、抽象房屋、测量线与面积网格
- 文案：`Yard & Home Calc` / `Practical project calculators`
- 许可边界：完全本地原创，无第三方 Logo、照片、人物、产品、商标或虚构计算结果

1200×630 原图与 400×210 缩略图均人工检查，无截断、重叠或异常裁切。Wrangler 本地响应为 `200 image/png`。

## 9. 生产重定向逐跳矩阵

生产检查时间：2026-07-23。除特别说明外，最终响应为 200。

| 请求 | 跳转链 | Path/query | 分类 |
|---|---|---|---|
| `http://yardandhomecalc.com/` | 301 → `https://yardandhomecalc.com/` → 200 | 保留 | 正常协议规范化 |
| `https://yardandhomecalc.com/` | 200 | 保留 | canonical |
| `http://www.yardandhomecalc.com/` | 301 → `https://yardandhomecalc.com/` → 200 | 保留 | 正常协议+主机单跳 |
| `https://www.yardandhomecalc.com/` | 301 → `https://yardandhomecalc.com/` → 200 | 保留 | 正常主机规范化 |
| `http://yardandhomecalc.com/paint-calculator/?ref=audit` | 301 → HTTPS apex 同 path/query → 200 | 保留 | 正常协议规范化 |
| `https://yardandhomecalc.com/paint-calculator/?ref=audit` | 200 | 保留 | canonical |
| `https://www.yardandhomecalc.com/paint-calculator/?ref=audit` | 301 → HTTPS apex 同 path/query → 200 | 保留 | 正常主机规范化 |
| `http://www.yardandhomecalc.com/paint-calculator/?ref=audit` | 301 → `https://yardandhomecalc.compaint-calculator/?ref=audit` | **path 拼接错误，目标主机无效** | Cloudflare 规则缺陷 |
| `https://yardandhomecalc.com/paint-calculator` | 301 → `/paint-calculator/` → 200 | 保留 | 正常尾斜杠规范化 |
| `https://yardandhomecalc.com/paint-calculator.html` | 404 | 不适用 | 历史 URL 不存在 |
| sitemap 9 URL | 全部 200 | canonical | 正常 |
| 当前站内 href | 全部直达 canonical | 无重定向 | 正常 |
| canonical / `og:url` | 全部 HTTPS apex + 正确尾斜杠 | 一致 | 正常 |

没有循环。HTTPS www 不经过额外 HTTPS www 中间跳；HTTP apex 单跳到最终 HTTPS apex。

**需要 Cloudflare 人工配置修复**：HTTP www 深层路径的边缘重定向规则缺少 apex host 与 path 之间的 `/`。应使用能正确连接 `https://yardandhomecalc.com` 与原始 URI path、并保留 query 的 Single Redirect。该请求在到达 Pages middleware 前已被边缘层处理，因此本轮不能用仓库代码修复。

## 10. IndexNow

- sitemap 有 9 个页面及 `lastmod`。
- 邮件发生时最晚 `lastmod` 是 Paint 页的 2026-07-11，因此它是 1 条 notice 的最合理候选，但无逐 URL CSV，不能确证。
- 当前站点是低频更新的静态计算器站，没有持续高频发布需求。
- IndexNow 是可选发现机制，不保证索引。
- 结论：不新增密钥、Worker、依赖或提交动作；该 notice 不阻断技术 SEO。

## 11. 内链、canonical、robots、H1、资源与 JSON-LD

- Broken internal links：0
- Redirecting internal links：0
- Indexable orphan pages：0
- 每个正式页面的其他 HTML 入站来源：8
- sitemap/noindex 冲突：0
- canonical 错配：0
- 重复 title：0
- 重复 description：0
- H1：每页恰好 1 个
- 正文 `<img>`：0；因此不存在信息性图片缺 alt，也没有把合理空 alt 误判为错误
- Logo：文字链接，不是图片，不制造重复朗读
- CSS 背景：仅颜色/样式，无背景图片
- 社交图片：仅 metadata 引用，使用独立 `og:image:alt` 和 `twitter:image:alt`
- 构建后 CSS/JavaScript/图片资源缺失：0
- 图片资源 404：0（本地）
- JSON-LD：Organization、WebApplication、FAQPage、BreadcrumbList 均成功解析

没有弱内链页面，因此未添加机械式 Footer 或计算器互链。

## 12. 404 与 soft 404

生产当前行为：

| 路径 | 当前生产行为 |
|---|---|
| `/this-page-does-not-exist/` | 404 |
| `/missing-page` | 301 到 `/missing-page/`，最终 404 |
| `/missing/nested/path/` | 404 |
| `/privacy/not-real/` | 404 |
| `/missing-page?ref=audit` | 301 到带尾斜杠且保留 query，最终 404 |
| `/404` | 301 到 `/404/`，最终 200 |
| `/404/` | 200，内容为 404 页面 |
| `/404.html` | 308 到 `/404` → 301 到 `/404/` → 200 |

普通未知路径不是 soft 404，也不会跳首页。生产现有 404 HTML虽然状态正确，但错误继承首页 canonical 与 `og:url`。

本轮新增 `app/not-found.tsx` 后，经 Wrangler Pages 真实运行时验证：

- 普通未知路径真实返回 404。
- `<head>` 含 `noindex, follow`；Next 同时自动添加一个 `noindex`，两者不冲突。
- 无 canonical、`og:url`、`og:image`、Twitter 图片。
- 有一个 H1 和普通 `/` Return home 链接。
- 无自动跳转。
- 不进入 sitemap。

显式 `/404/` 的 200 是 Next static export / Pages 的特殊文件别名行为，不是普通未知路径 soft 404；它没有 sitemap 或站内入口，并带 noindex。没有循环。本轮不为该特殊别名增加猜测性中间件规则。

生产 404 metadata 修复只有部署后才能生效。

## 13. EmailLink 回归

本地浏览器最终状态：

- 可见文本：`hello@yardandhomecalc.com`
- href：`mailto:hello@yardandhomecalc.com`
- 页面出现次数：1
- `/cdn-cgi/l/email-protection`：0
- 无重复、遮蔽或损坏邮箱
- 键盘聚焦时 outline：3px clay 半透明实线，offset 2px

远端实现被完整保留，没有退回裸写方案。

## 14. 计算器功能回归

没有修改计算公式、单位换算、默认值、校验、舍入、结果逻辑、URL 参数、Analytics、隐私、AdSense/CMP 或来源事实。

### Mulch

- 默认：12 ft × 6 ft × 3 in，waste 10%，bag 2 cu ft，price 45 → 19.8 cu ft、0.73 cu yd、10 bags、$33.00。
- 代表输入：20 × 10 × 4，waste 5%，bag 2，price 50 → 70 cu ft、2.59 cu yd、35 bags、$129.63。
- 边界：length 0 → 全部数量 0，cost `Not entered`。
- 单位切换：meters 选项生效；默认数字按米/厘米重新计算为 83.91 cu ft、3.11 cu yd。
- 刷新：恢复并重现默认结果。

### Concrete

- 默认：10 ft × 8 ft × 4 in，waste 10%，price 150 → 29.33 cu ft、1.09 cu yd、98/66/49 bags、$162.96。
- 代表输入：12 × 10 × 6，waste 5%，price 160 → 63 cu ft、2.33 cu yd、210/140/105 bags、$373.33。
- 边界：thickness 0 → 全部数量 0，cost `Not entered`。
- 单位切换：meters/centimeters 生效；默认数字重新计算为 124.31 cu ft、4.6 cu yd。
- 刷新：恢复并重现默认结果。

### Paint

- 默认：12 × 10 × 8 ft，1 door、2 windows、2 coats、375 coverage、10% waste、$38 → 352 sq ft、301 sq ft、1.77 gal、建议 2 gal、$67.10。
- 代表输入：15 × 12 × 9，2 doors、3 windows、2 coats、350 coverage、5% waste、$42 → 486 sq ft、399 sq ft、2.39 gal、建议 3 gal、$100.55。
- 边界：100 doors → paintable area 与 gallons 为 0，cost `Not entered`。
- Project type 切换为 garage 成功；单位切换为 meters 成功；rough exterior preset 自动把 coverage 更新为 250。
- 刷新：恢复并重现默认结果。

所有交互均在 390×844 移动视口完成；控件唯一、可操作，结果即时刷新。

## 15. 构建、审计与视觉结果

仓库实际脚本：

- `pnpm typecheck`：通过
- `pnpm build`：通过
- `pnpm seo:audit`：通过，0 failures
- lint：package.json 不存在
- test：package.json 不存在
- `git diff --check`：通过

新增轻量 `scripts/seo-audit.mjs`，验证正式页面与 sitemap 集合、title/description、canonical、robots、OG/Twitter、H1、链接、资源、图片 alt、JSON-LD、404 metadata 和社交 PNG。

首次双构建发现 Next 随机 build ID 导致聚合哈希变化。逐文件定位后，在 `next.config.mjs` 加入确定性 `generateBuildId`：Cloudflare 构建使用 `CF_PAGES_COMMIT_SHA` 前 20 字符，本地使用固定回退值。再次连续构建：

- Build 1 聚合 SHA-256：`32546c85a8fac631e2c5052c189550a8623e3872aa80877d971921394a2e1a01`
- Build 2 聚合 SHA-256：`32546c85a8fac631e2c5052c189550a8623e3872aa80877d971921394a2e1a01`

视觉覆盖 1440×900 与 390×844：

- 首页
- 3 个核心计算器
- About、Contact、Privacy、Terms、Disclaimer
- 自定义 404
- 1200×630 分享图及 400×210 缩略图

结果：

- Header、Footer、导航、H1 正常。
- 无页面级横向溢出、元素重叠或破图。
- Paint 表格未造成页面级溢出。
- metadata 未进入正文。
- 404 Return home 正常。
- EmailLink 正常。
- 新标签页全页面复跑后 console error/warning：0。

## 16. 修改文件

本轮修改：

- `app/about/page.tsx`
- `app/concrete-calculator/page.tsx`
- `app/contact/page.tsx`
- `app/disclaimer/page.tsx`
- `app/layout.tsx`
- `app/mulch-calculator/page.tsx`
- `app/paint-calculator/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `lib/metadata.ts`
- `next.config.mjs`
- `package.json`

本轮新增：

- `app/not-found.tsx`
- `public/yard-home-calc-share.svg`
- `public/yard-home-calc-share.png`
- `scripts/seo-audit.mjs`
- `reports/ahrefs-technical-seo-audit-2026-07-23.md`

Wrangler 生成的 `.wrangler/` 临时缓存已在停止本地服务器后移出仓库，没有作为项目修改保留。

## 17. Cloudflare 配置与部署后确认

需要人工处理：

1. 修正 HTTP www 深层路径的 Cloudflare 重定向目标拼接，确保 `/` 分隔符和 query 保留。

不需要：

- 关闭 HTTPS 强制。
- 删除正常 HTTP→HTTPS、www→apex 或尾斜杠规范化。
- 新增 IndexNow Worker。

待部署后确认：

- 9 页新的 OG/Twitter 字段和分享图生产响应。
- 5 个 description 与 3 个 title 的生产输出。
- 自定义 404 的 canonical/OG 移除。
- Ahrefs 下次 crawl 的告警消退情况。

本轮未部署、未修改 Cloudflare。

## 18. 遗留问题与人工决定

- 无 Ahrefs 逐 URL CSV，邮件中的两个具体 3XX 和一个具体 IndexNow URL无法精确归因；报告保留不确定性，没有为了匹配数量虚构 URL。
- 生产 HTTP www 深层重定向为真实线上配置缺陷，需要 Cloudflare 人工修复。
- 显式 `/404/` 特殊别名返回 200，但普通未知路径真实 404；是否专门拦截该别名属于后续人工产品/平台决定，不影响本轮 soft-404 结论。
- 生产结果需部署后复核；本轮停止在本地整改和验证。

## 19. 最终 Git 状态

```text
 M app/about/page.tsx
 M app/concrete-calculator/page.tsx
 M app/contact/page.tsx
 M app/disclaimer/page.tsx
 M app/layout.tsx
 M app/mulch-calculator/page.tsx
 M app/paint-calculator/page.tsx
 M app/privacy/page.tsx
 M app/terms/page.tsx
 M lib/metadata.ts
 M next.config.mjs
 M package.json
?? app/not-found.tsx
?? public/yard-home-calc-share.png
?? public/yard-home-calc-share.svg
?? reports/ahrefs-technical-seo-audit-2026-07-23.md
?? reports/gsc-weekly/2026-07-23-yardandhomecalc.com-gsc-weekly-review.md
?? scripts/seo-audit.mjs
```

任务前已有且未触碰：

- `reports/gsc-weekly/2026-07-23-yardandhomecalc.com-gsc-weekly-review.md`
