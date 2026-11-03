# 发布新版本

这个仓库既是插件包（包根目录），也是插件市场的索引来源。
市场条目**钉死在一个 git 提交**上，所以「发版」= 新提交 + 改索引里的版本信息。

> 市场目前只有「安装」和「卸载重装」，没有原地升级。用户看到 `update-available` 后需要卸载再装。

## 0. 准备

- 改代码请改仓库根下的 `client.js`（浏览器端，纯 JS，无构建步骤）或 `index.js`（Host 端，本插件是空壳）。
- 三个版本号要保持一致：
  - `package.json` 的 `version`
  - `index.json` 的 `plugins[0].versions[0].version`
- 需要新功能/修 bug 才发版；只改 README 不必动索引。

## 1. 上传新文件，拿到提交 SHA

1. 仓库页 → **Add file → Upload files**，把改动过的文件拖进去（保持同样的目录结构）。
2. 提交信息建议 `dsh-session-topics-tree <新版本号>`，Commit。
3. 打开刚产生的提交页，地址形如：

   ```
   https://github.com/xy040402/dsh-session-topics/commit/5a30097b3b0b1f623730283ff0d6b57e8a8dae1f
   ```

   最后那段 40 位十六进制就是 `commit`。

也可以用命令行取最新提交（公共仓库不需要登录）：

```powershell
(Invoke-RestMethod "https://api.github.com/repos/xy040402/dsh-session-topics/commits?per_page=1").sha
```

## 2. 改索引 `index.json`

只改 `plugins[0].versions[0]` 这一段里的三个值：

```json
"versions": [
  {
    "version": "0.3.0",            // ← 新版本号，和 package.json 一致
    "publishTimestamp": 1793687442, // ← 改成当前时间的 Unix 秒
    "source": {
      "type": "git",
      "url": "https://github.com/xy040402/dsh-session-topics",
      "commit": "5a30097b3b0b1f623730283ff0d6b57e8a8dae1f"  // ← 第 1 步的新 SHA
    },
    "engines": { "dsh": ">=0.2.1-rc.5" }  // ← 用到新 API 时才调
  }
]
```

生成 `publishTimestamp`（PowerShell）：

```powershell
[int][double]::Parse((Get-Date -UFormat %s))
```

也可以加**多个版本**：往 `versions` 数组里追加一个对象，市场按 SemVer 从高到低展示，默认版本取最高且兼容的那个。
旧版本的 `commit` 不用动，它们仍然指向旧提交，可以回装。

## 3. 覆盖上传 `index.json`

仓库页 → 打开 `index.json` → 铅笔图标编辑（或 Add file → Upload files 覆盖）→ Commit。

索引地址不变，Discover 里加过一次就不用再加：

```
https://raw.githubusercontent.com/xy040402/dsh-session-topics/main/index.json
```

## 4. 自检

- 打开索引地址，确认 JSON 合法、`version` / `commit` 是新的；
- 在 DSH 的「设置 → 插件 → Discover」刷新，条目应显示 `update-available`；
- 想在本机试装，机器上必须有 `git`（pnpm 拉 git 依赖要用它）：
  ```
  pnpm add git+https://github.com/xy040402/dsh-session-topics.git#<commit>
  ```
  本机已用 link 方式装着同名包，测试前先在设置里卸掉，否则同名冲突。

## 常见问题

| 现象 | 原因 |
|---|---|
| Discover 里条目还是旧版本 | `index.json` 没覆盖成功，或 Host 缓存了索引（默认 10 分钟，重开 DSH 可绕过） |
| 安装报 `engines` 不满足 | `engines.dsh` 高于当前 DSH 版本；要么放宽范围，要么升级 DSH |
| 安装报找不到 git | 安装方机器没装 git；改用 npm 发布即可消除这个依赖 |
| 装完左侧栏没变化 | 装插件的 profile 与当前页面不是同一个，或没刷新页面 |

## 为什么不发 npm

当前版本用 git 源发布，好处是完全不需要 npm 账号、包名、2FA；代价是安装方需要 git。
若以后要「零依赖安装」，在 `index.json` 的 `versions` 里加一个 npm 版本即可，两者可以并存：

```json
{
  "version": "0.3.0",
  "publishTimestamp": 1793687442,
  "source": { "type": "npm" },
  "engines": { "dsh": ">=0.2.1-rc.5" }
}
```

（需要先 `npm login` 再 `npm publish --access public`，包名 `dsh-session-topics-tree`。）
