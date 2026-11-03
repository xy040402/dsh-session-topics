# dsh-session-topics-tree

会话话题分组 — a DSH (DeepSeek Harness) web plugin that replaces the sidebar browsing region with a three-level tree:

```
工作区 (Workspace)
└── 话题分组 (topic group, nestable)
    └── 会话 (Session)
```

同一个工作区里的会话可以按话题收进分组，分组还能继续嵌套；官方的会话列表只能按工作区一层分组。

## 功能

- **多级分组**：分组可以嵌分组，任意层级；每层单独折叠，状态记在浏览器里。
- **拖拽**：
  - 会话拖到分组标题上 = 归入该分组；拖到工作区标题或「未分组」= 移出分组。
  - 分组拖到另一个分组上 = 变成子分组；拖到工作区标题或「未分组」= 回到顶层。
- **菜单**：分组行 `⋯` 里有「新建子分组…」「移动到分组…」「重命名」「删除（连同子分组）」，父级/子孙互斥，不会拖出环。
- **会话操作**：重命名、创建分支、归档/取消归档、复制会话 ID、归入分组。
- **工作区操作**：新建会话、新建分组、重命名、移除工作区、添加工作区。
- **搜索**：按标题 / 工作区 / 分组名过滤。
- **空工作区会话**：不属于任何工作区的会话集中在「未归属工作区」一节，也能建分组；行菜单里可以「把所在目录登记为工作区」。

## 安装

```bash
dsh plugin add dsh-session-topics-tree
```

或者在 Web UI 的「设置 → 插件」里安装本包，然后在插件市场/配置文件里启用 `dsh-session-topics-tree` bundle。装好后刷新页面，左侧栏即变成三级结构。

需要 DSH `>= 0.2.1-rc.5`（用到了 `sidebar.workspaces` 单槽替换与 `priority` 语义）。

## 数据

分组数据存在浏览器 `localStorage`（键 `dsh.session-topics.v1`），不写入 Host、不改会话日志：

```json
{
  "groupsByWorkspace": { "<workspaceId>": [{ "id": "g...", "name": "装机", "parentId": "g..." }] },
  "assignment": { "<sessionId>": "g..." },
  "collapsedGroups": {},
  "collapsedWorkspaces": {},
  "showArchived": false
}
```

卸载插件后，左侧自动回到官方列表；会话不受影响。

## 已知限制

- 会话属于哪个工作区由 Host 按「会话工作目录 == 工作区目录」判定，插件不改这个关系，所以不能把会话搬到别的工作区。
- 分组不能跨工作区：会话只能归进它所属工作区的分组。
- 只做「整组归入」，不做组内手动排序。
- 替换了官方的 `sidebar.workspaces` 组件，官方升级若改动该槽位/优先级语义，需要跟着适配。

## License

MIT
