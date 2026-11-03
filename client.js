window.__ModuleLoader__.load({
  id: 'dsh-session-topics-tree',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { Fragment, useState, useEffect, useMemo, useRef, useSyncExternalStore } = React;

    const NS = 'sessionTopicsTree';
    const STORAGE_KEY = 'dsh.session-topics.v1';

    // #region styles

    const CSS = `
.st-root{box-sizing:border-box;display:flex;flex-direction:column;flex:1;min-height:0;padding-right:var(--dsh-sidebar-inline-padding,8px);color:var(--dsw-alias-label-primary);font-size:14px;line-height:20px}
.st-header{box-sizing:border-box;display:flex;align-items:center;gap:4px;flex:none;height:36px;margin:2px 0 4px;padding-left:4px}
.st-headerLabel{flex:1;min-width:0;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-iconBtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:28px;height:28px;padding:0;border:none;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.st-iconBtn:hover{background:var(--dsw-alias-interactive-bg-hover)}
.st-iconBtn:focus-visible,.st-rowAction:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-alias-state-business-primary);outline-offset:-2px}
.st-search{box-sizing:border-box;display:flex;align-items:center;flex:1;min-width:0;height:30px;padding:0 2px;border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md);color:var(--dsw-alias-label-caption)}
.st-searchInput{flex:1;min-width:0;margin-left:2px;border:none;background:transparent;outline:none;color:var(--dsw-alias-label-primary);font-size:13px;line-height:18px}
.st-searchInput::placeholder{color:var(--dsw-alias-label-tertiary)}
.st-list{flex:1;min-height:0;overflow-y:auto;padding:0 4px 16px;margin:0 -4px;scrollbar-gutter:stable}
.st-wsRow{box-sizing:border-box;display:flex;align-items:center;height:34px;padding:0 8px;border-radius:var(--dsw-radius-md);cursor:pointer;user-select:none}
.st-wsRow:hover{background:var(--dsw-alias-interactive-bg-hover)}
.st-arrowSlot{display:inline-grid;place-items:center;flex:none;width:16px;height:20px;color:var(--dsw-alias-label-caption)}
.st-arrowSlot>*{grid-area:1/1}
.st-chevron{display:none}
.st-chevronAlways{display:inline-flex}
.st-wsRow:hover .st-chevron{display:inline-flex}
.st-folder{display:inline-flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary)}
.st-wsRow:hover .st-folder{display:none}
.st-wsRowActive .st-folder{color:var(--dsw-alias-state-business-primary)}
.st-arrow{transition:transform .15s var(--ds-ease-in-out,ease)}
.st-arrowOpen{transform:rotate(90deg)}
.st-wsTitle{flex:1;min-width:0;margin:0 6px 0 4px;font-size:14px;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-count{flex:none;margin-right:2px;color:var(--dsw-alias-label-caption);font-size:11px;line-height:16px;font-variant-numeric:tabular-nums}
.st-actions{display:none;align-items:center;gap:2px;flex:none}
.st-row:hover .st-actions,.st-wsRow:hover .st-actions,.st-groupRow:hover .st-actions{display:inline-flex}
.st-groupRow{box-sizing:border-box;display:flex;align-items:center;height:30px;margin-top:2px;padding:0 8px;border-radius:var(--dsw-radius-md);cursor:pointer;user-select:none;color:var(--dsw-alias-label-secondary)}
.st-groupRow:hover{background:var(--dsw-alias-interactive-bg-hover)}
.st-groupRowStatic{cursor:default}
.st-groupRowStatic:hover{background:transparent}
.st-groupName{flex:1;min-width:0;margin:0 6px 0 4px;font-size:13px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-tagSlot{display:inline-flex;align-items:center;justify-content:center;flex:none;width:16px;height:20px;color:var(--dsw-alias-label-caption)}
.st-row{box-sizing:border-box;display:flex;align-items:center;height:32px;margin-top:2px;padding:0 8px;border-radius:var(--dsw-radius-md);cursor:pointer;user-select:none;outline:none}
.st-row:hover,.st-rowSelected{background:var(--dsw-alias-interactive-bg-hover)}
.st-row:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-alias-state-business-primary);outline-offset:-2px}
.st-dotSlot{display:inline-flex;align-items:center;justify-content:center;flex:none;width:16px;height:20px}
.st-dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-label-caption)}
.st-dotWarn{background:var(--dsw-alias-state-warn-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-state-warn-primary) 22%,transparent)}
.st-dotRun{background:var(--dsw-alias-state-business-primary);animation:st-pulse 1.2s ease-in-out infinite}
.st-dotDone{background:var(--dsw-alias-state-success-primary)}
@keyframes st-pulse{0%,100%{opacity:1}50%{opacity:.3}}
.st-title{flex:1;min-width:0;margin:0 6px 0 4px;font-size:14px;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-row:hover .st-title{text-overflow:clip}
.st-time{flex:none;color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:16px;font-variant-numeric:tabular-nums}
.st-row:hover .st-time{display:none}
.st-rowArchived .st-title{color:var(--dsw-alias-label-caption)}
.st-rowArchived{cursor:default}
.st-rowAction{display:inline-flex;align-items:center;justify-content:center;flex:none;width:20px;height:20px;padding:0;border:none;border-radius:var(--dsw-radius-xs);background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}
.st-rowAction:hover{color:var(--dsw-alias-label-primary)}
.st-meta{flex:none;margin-right:6px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.st-empty{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:72px;padding:0 12px;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;text-align:center}
.st-emptyAction{border:none;background:transparent;padding:0;color:var(--dsw-alias-link);font-size:13px;line-height:20px;cursor:pointer}
.st-skeleton{padding:10px 12px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
.st-dropActive{background:var(--dsw-alias-interactive-bg-hover);outline:1px dashed var(--dsw-alias-state-business-primary);outline-offset:-2px}
.st-dragging{opacity:.45}
.st-scrim{position:fixed;inset:0;z-index:999;pointer-events:auto}
.st-menu{position:fixed;z-index:1000;pointer-events:auto;box-sizing:border-box;display:flex;flex-direction:column;min-width:232px;max-width:288px;max-height:min(60vh,420px);overflow-y:auto;padding:4px;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-overlay);box-shadow:0 10px 30px rgba(0,0,0,.28)}
.st-menuLabel{flex:none;padding:4px 8px 6px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-menuItem{box-sizing:border-box;display:flex;align-items:center;gap:8px;flex:none;width:100%;height:30px;padding:0 8px;border:none;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;line-height:18px;text-align:left;cursor:pointer}
.st-menuItem:hover{background:var(--dsw-alias-interactive-bg-hover)}
.st-menuItem:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-alias-state-business-primary);outline-offset:-2px}
.st-menuItemDanger{color:var(--dsw-alias-state-error-primary)}
.st-menuText{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-menuCheck{margin-left:auto;color:var(--dsw-alias-state-business-primary);flex:none;display:inline-flex}
.st-sep{flex:none;height:1px;margin:4px 6px;background:var(--dsw-alias-border-l1)}
.st-dialogScrim{position:fixed;inset:0;z-index:1001;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.36);pointer-events:auto}
.st-dialog{box-sizing:border-box;width:min(400px,100%);padding:18px;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-overlay);box-shadow:0 18px 48px rgba(0,0,0,.36)}
.st-dialogTitle{margin:0 0 6px;font-size:15px;line-height:22px;font-weight:600;color:var(--dsw-alias-label-primary)}
.st-dialogDesc{margin:0 0 12px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary)}
.st-dialogInput{box-sizing:border-box;width:100%;height:36px;padding:0 10px;border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md);background:transparent;color:var(--dsw-alias-label-primary);font-size:14px;line-height:20px;outline:none}
.st-dialogInput:focus{border-color:var(--dsw-alias-state-business-primary)}
.st-dialogError{margin-top:8px;color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px}
.st-dialogActions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}
.st-button{box-sizing:border-box;height:32px;padding:0 14px;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md);background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;line-height:18px;cursor:pointer}
.st-button:hover{background:var(--dsw-alias-interactive-bg-hover)}
.st-buttonPrimary{border-color:transparent;background:var(--dsw-alias-brand-primary);color:#fff}
.st-buttonPrimary:hover{opacity:.9}
.st-buttonDanger{border-color:transparent;background:var(--dsw-alias-state-error-primary);color:#fff}
.st-button:disabled{opacity:.5;cursor:default}
@media (prefers-reduced-motion:reduce){.st-arrow{transition:none}.st-dotRun{animation:none}}
`;

    // #endregion

    // #region locale

    const en = {
      'section.label': 'Sessions',
      'search.placeholder': 'Search sessions',
      'search.clear': 'Clear search',
      'search.none': 'No matching sessions',
      'action.search': 'Search sessions',
      'action.newSession': 'New session',
      'action.viewOptions': 'View options',
      'action.newGroup': 'New topic group…',
      'action.newSubgroup': 'New subgroup…',
      'action.moveGroup': 'Move to group…',
      'action.moveToTop': 'Top level',
      'menu.moveTitle': 'Move “{name}” under',
      'action.renameGroup': 'Rename group',
      'action.deleteGroup': 'Delete group',
      'action.renameWorkspace': 'Rename workspace',
      'action.deleteWorkspace': 'Remove workspace',
      'action.renameSession': 'Rename session',
      'action.fork': 'Fork session',
      'action.archive': 'Archive session',
      'action.unarchive': 'Unarchive session',
      'action.copyId': 'Copy session ID',
      'action.addWorkspace': 'Add workspace…',
      'action.registerWorkspace': 'Register its folder as a workspace',
      'action.openMenu': 'Session actions',
      'action.rowMenu': 'More actions',
      'view.showArchived': 'Show archived',
      'view.expandAll': 'Expand all',
      'view.collapseAll': 'Collapse all',
      'group.ungrouped': 'Ungrouped',
      'group.menuLabel': 'Topic group',
      'strays.label': 'No workspace',
      'strays.hint': 'Sessions the registry does not account to any workspace.',
      'session.new': 'New session',
      'session.untitled': 'Untitled',
      'session.archived': 'Archived · unarchive to open',
      'archive.stop.title': 'Stop running work and archive?',
      'archive.stop.desc': 'This session still has work running. Stop it, then archive the session.',
      'archive.stop.confirm': 'Stop and archive',
      'status.approval': 'Waiting for approval',
      'status.plan': 'Plan awaiting review',
      'status.question': 'Waiting for answer',
      'time.now': 'now',
      'time.min': 'm',
      'time.hour': 'h',
      'time.day': 'd',
      'empty.title': 'No sessions yet',
      'empty.addWorkspace': 'Choose a folder',
      'loading': 'Loading sessions…',
      'dialog.ok': 'OK',
      'dialog.cancel': 'Cancel',
      'dialog.delete': 'Delete',
      'dialog.remove': 'Remove',
      'dialog.newGroup.title': 'New topic group',
      'dialog.newGroup.desc': 'Name the topic, then send sessions into it from their row menu.',
      'dialog.newGroup.placeholder': 'e.g. PC build / Bilibili plugin',
      'dialog.renameGroup.title': 'Rename topic group',
      'dialog.renameWorkspace.title': 'Rename workspace',
      'dialog.renameSession.title': 'Rename session',
      'dialog.deleteGroup.title': 'Delete this topic group?',
      'dialog.deleteGroup.desc': 'Its sessions stay in the workspace and return to Ungrouped; its subgroups are deleted with it.',
      'dialog.deleteWorkspace.title': 'Remove this workspace?',
      'dialog.deleteWorkspace.desc': 'Only the registration is removed; the folder and its session logs stay on disk.',
      'dialog.nameEmpty': 'Name cannot be empty.',
    };

    const zh = {
      'section.label': '会话',
      'search.placeholder': '搜索会话',
      'search.clear': '清除搜索',
      'search.none': '没有匹配的会话',
      'action.search': '搜索会话',
      'action.newSession': '新建会话',
      'action.viewOptions': '视图选项',
      'action.newGroup': '新建话题分组…',
      'action.newSubgroup': '新建子分组…',
      'action.moveGroup': '移动到分组…',
      'action.moveToTop': '顶层',
      'menu.moveTitle': '把「{name}」移到',
      'action.renameGroup': '重命名分组',
      'action.deleteGroup': '删除分组',
      'action.renameWorkspace': '重命名工作区',
      'action.deleteWorkspace': '移除工作区',
      'action.renameSession': '重命名会话',
      'action.fork': '创建分支',
      'action.archive': '归档会话',
      'action.unarchive': '取消归档',
      'action.copyId': '复制会话 ID',
      'action.addWorkspace': '添加工作区…',
      'action.registerWorkspace': '把所在目录登记为工作区',
      'action.openMenu': '会话操作',
      'action.rowMenu': '更多操作',
      'view.showArchived': '显示已归档',
      'view.expandAll': '全部展开',
      'view.collapseAll': '全部折叠',
      'group.ungrouped': '未分组',
      'group.menuLabel': '话题分组',
      'strays.label': '未归属工作区',
      'strays.hint': '没有登记到任何工作区的会话，暂存在这里。',
      'session.new': '新会话',
      'session.untitled': '未命名',
      'session.archived': '已归档 · 取消归档后才能打开',
      'archive.stop.title': '停止任务并归档？',
      'archive.stop.desc': '这个会话还有任务在跑。停止它，再归档这个会话。',
      'archive.stop.confirm': '停止并归档',
      'status.approval': '等待审批',
      'status.plan': '计划待确认',
      'status.question': '等待回答',
      'time.now': '刚刚',
      'time.min': '分',
      'time.hour': '时',
      'time.day': '天',
      'empty.title': '还没有会话',
      'empty.addWorkspace': '选择文件夹',
      'loading': '正在载入会话…',
      'dialog.ok': '确定',
      'dialog.cancel': '取消',
      'dialog.delete': '删除',
      'dialog.remove': '移除',
      'dialog.newGroup.title': '新建话题分组',
      'dialog.newGroup.desc': '给这个工作区分一个话题，之后在会话行的菜单里把它归进来。',
      'dialog.newGroup.placeholder': '比如：装机 / B站插件',
      'dialog.renameGroup.title': '重命名话题分组',
      'dialog.renameWorkspace.title': '重命名工作区',
      'dialog.renameSession.title': '重命名会话',
      'dialog.deleteGroup.title': '删除这个分组？',
      'dialog.deleteGroup.desc': '分组里的会话会留在工作区，退回「未分组」；它下面的子分组会一起删掉。',
      'dialog.deleteWorkspace.title': '移除这个工作区？',
      'dialog.deleteWorkspace.desc': '只移除登记，文件夹和会话记录都还在磁盘上。',
      'dialog.nameEmpty': '名字不能为空。',
    };

    // #endregion

    // #region persistence

    const EMPTY = {
      groupsByWorkspace: {},
      assignment: {},
      collapsedGroups: {},
      collapsedWorkspaces: {},
      showArchived: false,
    };

    function readPersisted() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return EMPTY;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return EMPTY;
        const asObject = (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value : {});
        const groups = {};
        for (const [key, list] of Object.entries(asObject(parsed.groupsByWorkspace))) {
          if (!Array.isArray(list)) continue;
          const clean = list
            .filter((item) => item && typeof item.id === 'string' && typeof item.name === 'string')
            .map((item) => ({ id: item.id, name: item.name }));
          if (clean.length > 0) groups[key] = clean;
        }
        return {
          groupsByWorkspace: groups,
          assignment: asObject(parsed.assignment),
          collapsedGroups: asObject(parsed.collapsedGroups),
          collapsedWorkspaces: asObject(parsed.collapsedWorkspaces),
          showArchived: parsed.showArchived === true,
        };
      } catch {
        return EMPTY;
      }
    }

    function persist(state) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            groupsByWorkspace: state.groupsByWorkspace,
            assignment: state.assignment,
            collapsedGroups: state.collapsedGroups,
            collapsedWorkspaces: state.collapsedWorkspaces,
            showArchived: state.showArchived,
          }),
        );
      } catch {
        // Storage may be full or denied; the in-memory state still works.
      }
    }

    function makeStore(initial, persistValue) {
      let value = initial;
      const listeners = new Set();
      return {
        get: () => value,
        set(updater) {
          const next = typeof updater === 'function' ? updater(value) : updater;
          if (next === value) return;
          value = next;
          if (persistValue) persist(next);
          for (const listener of [...listeners]) listener();
        },
        subscribe(listener) {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
      };
    }

    const dataStore = makeStore(readPersisted(), true);
    const uiStore = makeStore({ menu: null, dialog: null }, false);

    // #endregion

    // #region helpers

    const cls = (...names) => names.filter(Boolean).join(' ');

    function makeGroupId() {
      return `g${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
    }

    /**
     * Index one workspace's topic groups as a tree. A group whose parent is
     * missing (deleted, or data written by an older version) becomes a
     * top-level group, and a parent cycle is broken by the visited set, so a
     * damaged record still renders every group exactly once.
     */
    function groupTree(groups) {
      const ids = new Set(groups.map((group) => group.id));
      const children = new Map();
      for (const group of groups) {
        const parent = group.parentId && ids.has(group.parentId) ? group.parentId : '';
        if (!children.has(parent)) children.set(parent, []);
        children.get(parent).push(group);
      }
      const flat = [];
      const seen = new Set();
      const walk = (parent, depth) => {
        for (const group of children.get(parent) || []) {
          if (seen.has(group.id)) continue;
          seen.add(group.id);
          flat.push({ group, depth });
          walk(group.id, depth + 1);
        }
      };
      walk('', 0);
      return { children, flat };
    }

    /** Every group below one group, in tree order (the group itself excluded). */
    function descendantIds(groups, groupId) {
      const byParent = new Map();
      for (const group of groups) {
        const parent = group.parentId || '';
        if (!byParent.has(parent)) byParent.set(parent, []);
        byParent.get(parent).push(group.id);
      }
      const result = [];
      const stack = [...(byParent.get(groupId) || [])];
      while (stack.length > 0) {
        const id = stack.pop();
        result.push(id);
        stack.push(...(byParent.get(id) || []));
      }
      return result;
    }

    /** Whether one group may become a child of `parentId` (empty means top level). */
    function canReparent(groups, groupId, parentId) {
      if (!parentId) return true;
      if (parentId === groupId) return false;
      return !descendantIds(groups, groupId).includes(parentId);
    }

    /** State with one group moved under `parentId` (empty removes its parent). */
    function reparentGroup(state, workspaceId, groupId, parentId) {
      const groups = state.groupsByWorkspace[workspaceId] || [];
      if (!canReparent(groups, groupId, parentId)) return state;
      return {
        ...state,
        groupsByWorkspace: {
          ...state.groupsByWorkspace,
          [workspaceId]: groups.map((group) => {
            if (group.id !== groupId) return group;
            if (!parentId) {
              const copy = { ...group };
              delete copy.parentId;
              return copy;
            }
            return { ...group, parentId };
          }),
        },
        collapsedGroups: parentId ? { ...state.collapsedGroups, [parentId]: false } : state.collapsedGroups,
      };
    }

    function formatTime(ms, now, t) {
      if (!Number.isFinite(ms) || ms <= 0) return '';
      const diff = now - ms;
      if (diff < 60000) return t('time.now');
      const minutes = Math.floor(diff / 60000);
      if (minutes < 60) return `${minutes}${t('time.min')}`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}${t('time.hour')}`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days}${t('time.day')}`;
      const date = new Date(ms);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }

    function rowTitle(row, t) {
      if (row.blank) return t('session.new');
      const title = (row.title || '').trim();
      return title || t('session.untitled');
    }

    function findCurrentId(list) {
      for (const row of Object.values(list.byId)) {
        const retained = row.retainedBy ? row.retainedBy.mainView : 0;
        if ((retained || 0) > 0) return row.id;
      }
      return undefined;
    }

    function pendingKind(status) {
      const kind = status && status.pendingInteraction ? status.pendingInteraction.kind : undefined;
      return kind === 'approval' || kind === 'plan-review' || kind === 'question' ? kind : undefined;
    }

    function closeMenu() {
      if (uiStore.get().menu) uiStore.set((state) => ({ ...state, menu: null }));
    }

    function openMenu(menu, event) {
      const rect = event.currentTarget.getBoundingClientRect();
      uiStore.set((state) => ({
        ...state,
        menu: { ...menu, left: rect.left, top: rect.top, bottom: rect.bottom },
      }));
    }

    /** Open a follow-up menu at the position of the menu it is raised from. */
    function openMenuAt(menu, anchor) {
      uiStore.set((state) => ({
        ...state,
        menu: { ...menu, left: anchor.left, top: anchor.top, bottom: anchor.bottom },
      }));
    }

    function openDialog(dialog) {
      uiStore.set((state) => ({ ...state, menu: null, dialog }));
    }

    // #endregion

    // #region icons

    const svgProps = {
      width: 16,
      height: 16,
      viewBox: '0 0 16 16',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.4,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true,
      focusable: false,
    };

    function icon(children, extra) {
      return h('svg', extra ? { ...svgProps, ...extra } : svgProps, children);
    }

    const Chevron = ({ open }) =>
      icon(h('path', { d: 'M6 3.5 10.5 8 6 12.5' }), {
        className: cls('st-arrow', open && 'st-arrowOpen'),
        width: 14,
        height: 14,
      });

    const FolderIcon = () =>
      icon(
        h('path', {
          d: 'M2.2 4.6c0-.66.54-1.2 1.2-1.2h2.43l1.3 1.6h5.47c.66 0 1.2.54 1.2 1.2v5.2c0 .66-.54 1.2-1.2 1.2H3.4c-.66 0-1.2-.54-1.2-1.2V4.6Z',
        }),
      );

    const TagIcon = () =>
      icon(
        h(
          Fragment,
          null,
          h('path', { d: 'M2.4 2.4h4.2l6.9 6.9-4.2 4.2-6.9-6.9V2.4Z' }),
          h('circle', { cx: 5, cy: 5, r: 0.9 }),
        ),
      );

    const PlusIcon = () => icon(h('path', { d: 'M8 3.5v9M3.5 8h9' }));

    const SearchIcon = () =>
      icon(h(Fragment, null, h('circle', { cx: 7, cy: 7, r: 4.2 }), h('path', { d: 'm10.2 10.2 3 3' })));

    const DotsIcon = () =>
      icon(
        h(
          Fragment,
          null,
          h('circle', { cx: 3.4, cy: 8, r: 1.1, fill: 'currentColor', stroke: 'none' }),
          h('circle', { cx: 8, cy: 8, r: 1.1, fill: 'currentColor', stroke: 'none' }),
          h('circle', { cx: 12.6, cy: 8, r: 1.1, fill: 'currentColor', stroke: 'none' }),
        ),
      );

    const CheckIcon = () => icon(h('path', { d: 'm3.5 8.5 3 3 6-7' }), { width: 14, height: 14 });

    const CloseIcon = () => icon(h('path', { d: 'm4 4 8 8M12 4l-8 8' }), { width: 14, height: 14 });

    // #endregion

    // #region menu and dialogs

    function menuStyle(menu) {
      const width = 248;
      const margin = 8;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const style = { left: Math.max(margin, Math.min(menu.left, vw - width - margin)), width };
      const below = vh - menu.bottom;
      if (below < 300 && menu.top > below) {
        style.bottom = Math.max(margin, vh - menu.top + 4);
      } else {
        style.top = Math.max(margin, Math.min(menu.bottom + 4, vh - 120));
      }
      return style;
    }

    function MenuButton({ label, onSelect, danger, checked, indent }) {
      return h(
        'button',
        {
          type: 'button',
          role: 'menuitem',
          className: cls('st-menuItem', danger && 'st-menuItemDanger'),
          style: indent ? { paddingInlineStart: `${8 + indent * 14}px` } : undefined,
          onClick: onSelect,
        },
        h('span', { className: 'st-menuText' }, label),
        checked ? h('span', { className: 'st-menuCheck' }, h(CheckIcon)) : null,
      );
    }

    function MenuLayer({ menu, actions, t }) {
      useEffect(() => {
        const onKey = (event) => {
          if (event.key === 'Escape') closeMenu();
        };
        const onResize = () => closeMenu();
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => {
          window.removeEventListener('keydown', onKey);
          window.removeEventListener('resize', onResize);
        };
      }, []);

      const data = useSyncExternalStore(dataStore.subscribe, dataStore.get);

      const withMenu = (fn) => () => {
        closeMenu();
        fn();
      };

      const promptName = (title, value, placeholder, submitLabel, onSubmit) =>
        openDialog({ kind: 'prompt', title, value, placeholder, submitLabel, onSubmit });

      const createGroup = (workspaceId, sessionId, parentId) => {
        promptName(t('dialog.newGroup.title'), '', t('dialog.newGroup.placeholder'), t('dialog.ok'), (value) => {
          const name = value.trim();
          if (!name) throw new Error(t('dialog.nameEmpty'));
          const created = { id: makeGroupId(), name };
          if (parentId) created.parentId = parentId;
          dataStore.set((state) => {
            const assignment = { ...state.assignment };
            if (sessionId) assignment[sessionId] = created.id;
            return {
              ...state,
              groupsByWorkspace: {
                ...state.groupsByWorkspace,
                [workspaceId]: [...(state.groupsByWorkspace[workspaceId] || []), created],
              },
              assignment,
              collapsedGroups: {
                ...state.collapsedGroups,
                [created.id]: false,
                ...(parentId ? { [parentId]: false } : {}),
              },
            };
          });
        });
      };

      const assignSession = (sessionId, groupId) =>
        dataStore.set((state) => {
          const assignment = { ...state.assignment };
          if (groupId) assignment[sessionId] = groupId;
          else delete assignment[sessionId];
          return { ...state, assignment };
        });

      let items = [];

      if (menu.kind === 'session') {
        const groups = data.groupsByWorkspace[menu.workspaceId] || [];
        const assigned = data.assignment[menu.sessionId];
        items = [
          h('div', { className: 'st-menuLabel', key: 'label' }, menu.title),
          menu.canGroup ? h('div', { className: 'st-menuLabel', key: 'groupLabel' }, t('group.menuLabel')) : null,
          menu.canGroup
            ? groupTree(groups).flat.map(({ group, depth }) =>
                h(MenuButton, {
                  key: `g:${group.id}`,
                  label: group.name,
                  indent: depth,
                  checked: assigned === group.id,
                  onSelect: withMenu(() => assignSession(menu.sessionId, group.id)),
                }),
              )
            : null,
          menu.canGroup
            ? h(MenuButton, {
                key: 'loose',
                label: t('group.ungrouped'),
                checked: assigned === undefined,
                onSelect: withMenu(() => assignSession(menu.sessionId, null)),
              })
            : null,
          menu.canGroup
            ? h(MenuButton, {
                key: 'new',
                label: t('action.newGroup'),
                onSelect: withMenu(() => createGroup(menu.workspaceId, menu.sessionId)),
              })
            : null,
          h('div', { className: 'st-sep', key: 'sep1' }),
          h(MenuButton, {
            key: 'rename',
            label: t('action.renameSession'),
            onSelect: withMenu(() =>
              promptName(t('dialog.renameSession.title'), menu.title, '', t('dialog.ok'), async (value) => {
                const title = value.trim();
                if (!title) throw new Error(t('dialog.nameEmpty'));
                await actions.renameSession(menu.sessionId, title);
              }),
            ),
          }),
          menu.archived
            ? h(MenuButton, {
                key: 'unarchive',
                label: t('action.unarchive'),
                onSelect: withMenu(() => actions.unarchiveSession(menu.sessionId)),
              })
            : h(MenuButton, {
                key: 'fork',
                label: t('action.fork'),
                onSelect: withMenu(() => actions.forkSession(menu.sessionId)),
              }),
          menu.archived
            ? null
            : h(MenuButton, {
                key: 'archive',
                label: t('action.archive'),
                onSelect: withMenu(() => actions.archiveSession(menu.sessionId)),
              }),
          h(MenuButton, {
            key: 'copy',
            label: t('action.copyId'),
            onSelect: withMenu(() => actions.copySessionId(menu.sessionId)),
          }),
        ];
        if (menu.stray && menu.cwd) {
          items.push(h('div', { className: 'st-sep', key: 'sepStray' }));
          items.push(
            h(MenuButton, {
              key: 'registerWorkspace',
              label: t('action.registerWorkspace'),
              onSelect: withMenu(() => actions.registerWorkspace(menu.cwd)),
            }),
          );
        }
      } else if (menu.kind === 'workspace') {
        items = [
          h('div', { className: 'st-menuLabel', key: 'label' }, menu.title),
          h(MenuButton, {
            key: 'newSession',
            label: t('action.newSession'),
            onSelect: withMenu(() => actions.startSession(menu.workspaceId)),
          }),
          h(MenuButton, {
            key: 'newGroup',
            label: t('action.newGroup'),
            onSelect: withMenu(() => createGroup(menu.workspaceId)),
          }),
          h('div', { className: 'st-sep', key: 'sep' }),
          h(MenuButton, {
            key: 'renameWorkspace',
            label: t('action.renameWorkspace'),
            onSelect: withMenu(() =>
              promptName(t('dialog.renameWorkspace.title'), menu.title, '', t('dialog.ok'), async (value) => {
                const title = value.trim();
                if (!title) throw new Error(t('dialog.nameEmpty'));
                await actions.renameWorkspace(menu.workspaceId, title);
              }),
            ),
          }),
          h(MenuButton, {
            key: 'deleteWorkspace',
            label: t('action.deleteWorkspace'),
            danger: true,
            onSelect: withMenu(() =>
              openDialog({
                kind: 'confirm',
                title: t('dialog.deleteWorkspace.title'),
                description: t('dialog.deleteWorkspace.desc'),
                submitLabel: t('dialog.remove'),
                danger: true,
                onSubmit: () => actions.deleteWorkspace(menu.workspaceId),
              }),
            ),
          }),
        ];
      } else if (menu.kind === 'group') {
        items = [
          h('div', { className: 'st-menuLabel', key: 'label' }, menu.title),
          h(MenuButton, {
            key: 'renameGroup',
            label: t('action.renameGroup'),
            onSelect: withMenu(() =>
              promptName(t('dialog.renameGroup.title'), menu.title, '', t('dialog.ok'), (value) => {
                const name = value.trim();
                if (!name) throw new Error(t('dialog.nameEmpty'));
                dataStore.set((state) => ({
                  ...state,
                  groupsByWorkspace: {
                    ...state.groupsByWorkspace,
                    [menu.workspaceId]: (state.groupsByWorkspace[menu.workspaceId] || []).map((group) =>
                      group.id === menu.groupId ? { ...group, name } : group,
                    ),
                  },
                }));
              }),
            ),
          }),
          h(MenuButton, {
            key: 'newSubgroup',
            label: t('action.newSubgroup'),
            onSelect: withMenu(() => createGroup(menu.workspaceId, undefined, menu.groupId)),
          }),
          h(MenuButton, {
            key: 'moveGroup',
            label: t('action.moveGroup'),
            onSelect: withMenu(() =>
              openMenuAt({ kind: 'groupMove', workspaceId: menu.workspaceId, groupId: menu.groupId, title: menu.title }, menu),
            ),
          }),
          h(MenuButton, {
            key: 'deleteGroup',
            label: t('action.deleteGroup'),
            danger: true,
            onSelect: withMenu(() =>
              openDialog({
                kind: 'confirm',
                title: t('dialog.deleteGroup.title'),
                description: t('dialog.deleteGroup.desc'),
                submitLabel: t('dialog.delete'),
                danger: true,
                onSubmit: () => {
                  dataStore.set((state) => {
                    const groups = state.groupsByWorkspace[menu.workspaceId] || [];
                    const removed = new Set([menu.groupId, ...descendantIds(groups, menu.groupId)]);
                    const assignment = { ...state.assignment };
                    for (const [sessionId, id] of Object.entries(assignment)) {
                      if (removed.has(id)) delete assignment[sessionId];
                    }
                    const collapsedGroups = { ...state.collapsedGroups };
                    for (const id of removed) delete collapsedGroups[id];
                    return {
                      ...state,
                      groupsByWorkspace: {
                        ...state.groupsByWorkspace,
                        [menu.workspaceId]: groups.filter((group) => !removed.has(group.id)),
                      },
                      assignment,
                      collapsedGroups,
                    };
                  });
                },
              }),
            ),
          }),
        ];
      } else if (menu.kind === 'groupMove') {
        const groups = data.groupsByWorkspace[menu.workspaceId] || [];
        const current = groups.find((group) => group.id === menu.groupId);
        const options = groupTree(groups).flat.filter(
          ({ group }) => group.id !== menu.groupId && canReparent(groups, menu.groupId, group.id),
        );
        items = [
          h('div', { className: 'st-menuLabel', key: 'label' }, t('menu.moveTitle', { name: menu.title })),
          h(MenuButton, {
            key: 'top',
            label: t('action.moveToTop'),
            checked: !current || !current.parentId,
            onSelect: withMenu(() => dataStore.set((state) => reparentGroup(state, menu.workspaceId, menu.groupId, ''))),
          }),
          ...options.map(({ group, depth }) =>
            h(MenuButton, {
              key: `gm:${group.id}`,
              label: group.name,
              indent: depth,
              checked: Boolean(current && current.parentId === group.id),
              onSelect: withMenu(() =>
                dataStore.set((state) => reparentGroup(state, menu.workspaceId, menu.groupId, group.id)),
              ),
            }),
          ),
        ];
      } else if (menu.kind === 'view') {
        items = [
          h(MenuButton, {
            key: 'archived',
            label: t('view.showArchived'),
            checked: data.showArchived,
            onSelect: withMenu(() => dataStore.set((state) => ({ ...state, showArchived: !state.showArchived }))),
          }),
          h('div', { className: 'st-sep', key: 'sep' }),
          h(MenuButton, {
            key: 'expand',
            label: t('view.expandAll'),
            onSelect: withMenu(() => dataStore.set((state) => ({ ...state, collapsedGroups: {}, collapsedWorkspaces: {} }))),
          }),
          h(MenuButton, {
            key: 'collapse',
            label: t('view.collapseAll'),
            onSelect: withMenu(() => {
              const collapsedGroups = {};
              for (const groups of Object.values(data.groupsByWorkspace)) {
                for (const group of groups) collapsedGroups[group.id] = true;
              }
              const collapsedWorkspaces = {};
              for (const workspaceId of menu.workspaceIds) collapsedWorkspaces[workspaceId] = true;
              dataStore.set((state) => ({ ...state, collapsedGroups, collapsedWorkspaces }));
            }),
          }),
          h('div', { className: 'st-sep', key: 'sep2' }),
          h(MenuButton, {
            key: 'add',
            label: t('action.addWorkspace'),
            onSelect: withMenu(() => actions.addWorkspace()),
          }),
        ];
      }

      return h(
        Fragment,
        null,
        h('div', {
          className: 'st-scrim',
          onMouseDown: (event) => {
            event.preventDefault();
            closeMenu();
          },
          onContextMenu: (event) => {
            event.preventDefault();
            closeMenu();
          },
        }),
        h('div', { className: 'st-menu', style: menuStyle(menu), role: 'menu' }, items),
      );
    }

    function DialogLayer({ dialog, t }) {
      const [value, setValue] = useState(dialog.value || '');
      const [error, setError] = useState(null);
      const [busy, setBusy] = useState(false);
      const inputRef = useRef(null);
      const isPrompt = dialog.kind === 'prompt';

      useEffect(() => {
        if (isPrompt && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, [isPrompt]);

      useEffect(() => {
        const onKey = (event) => {
          if (event.key === 'Escape') uiStore.set((state) => ({ ...state, dialog: null }));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      }, []);

      const close = () => uiStore.set((state) => ({ ...state, dialog: null }));

      const submit = async () => {
        if (busy) return;
        setBusy(true);
        setError(null);
        try {
          await dialog.onSubmit(value);
          close();
        } catch (reason) {
          setError(reason && reason.message ? reason.message : String(reason));
          setBusy(false);
        }
      };

      return h(
        'div',
        {
          className: 'st-dialogScrim',
          onMouseDown: (event) => {
            if (event.target === event.currentTarget) close();
          },
        },
        h(
          'div',
          { className: 'st-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': dialog.title },
          h('h2', { className: 'st-dialogTitle' }, dialog.title),
          dialog.description ? h('p', { className: 'st-dialogDesc' }, dialog.description) : null,
          isPrompt
            ? h('input', {
                ref: inputRef,
                className: 'st-dialogInput',
                value,
                placeholder: dialog.placeholder || '',
                onChange: (event) => setValue(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === 'Enter') submit();
                },
              })
            : null,
          error ? h('div', { className: 'st-dialogError' }, error) : null,
          h(
            'div',
            { className: 'st-dialogActions' },
            h('button', { type: 'button', className: 'st-button', onClick: close }, t('dialog.cancel')),
            h(
              'button',
              {
                type: 'button',
                className: cls('st-button', dialog.danger ? 'st-buttonDanger' : 'st-buttonPrimary'),
                disabled: busy,
                onClick: submit,
              },
              dialog.submitLabel || t('dialog.ok'),
            ),
          ),
        ),
      );
    }

    function TopicsOverlay({ actions, t }) {
      const ui = useSyncExternalStore(uiStore.subscribe, uiStore.get);
      return h(
        Fragment,
        null,
        ui.menu ? h(MenuLayer, { menu: ui.menu, actions, t }) : null,
        ui.dialog ? h(DialogLayer, { dialog: ui.dialog, t }) : null,
      );
    }

    // #endregion

    // #region rows

    function StatusDot({ status, t }) {
      const pending = pendingKind(status);
      if (pending) {
        const label =
          pending === 'approval' ? t('status.approval') : pending === 'plan-review' ? t('status.plan') : t('status.question');
        return h('span', { className: 'st-dotSlot', title: label }, h('span', { className: 'st-dot st-dotWarn' }));
      }
      if (status && status.running) {
        return h('span', { className: 'st-dotSlot' }, h('span', { className: 'st-dot st-dotRun' }));
      }
      if (status && status.completionUnread) {
        return h('span', { className: 'st-dotSlot' }, h('span', { className: 'st-dot st-dotDone' }));
      }
      return h('span', { className: 'st-dotSlot' });
    }

    function SessionRow({ row, status, selected, archived, indent, now, t, onOpen, onMenu, dragProps, dragging }) {
      const title = rowTitle(row, t);
      const openMenuFor = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onMenu(event);
      };
      return h(
        'div',
        {
          className: cls('st-row', selected && 'st-rowSelected', archived && 'st-rowArchived', dragging && 'st-dragging'),
          style: { paddingInlineStart: `${8 + indent}px` },
          ...(dragProps || null),
          role: 'treeitem',
          tabIndex: 0,
          'aria-selected': selected === true,
          'aria-label': title,
          title: archived ? t('session.archived') : title,
          onClick: () => {
            if (!archived) onOpen(row.id);
          },
          onKeyDown: (event) => {
            if (archived) return;
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onOpen(row.id);
            }
          },
          onContextMenu: openMenuFor,
        },
        h(StatusDot, { status, t }),
        h('span', { className: 'st-title' }, title),
        h('span', { className: 'st-time' }, formatTime(row.updatedAt, now, t)),
        h(
          'span',
          { className: 'st-actions' },
          h(
            'button',
            {
              type: 'button',
              className: 'st-rowAction',
              'aria-label': t('action.openMenu'),
              title: t('action.openMenu'),
              onClick: openMenuFor,
            },
            h(DotsIcon),
          ),
        ),
      );
    }

    function GroupHeader({ group, count, collapsed, depth, t, onToggle, onMenu, dragProps, dragging, dropProps, dropActive }) {
      const openMenuFor = onMenu
        ? (event) => {
            event.preventDefault();
            event.stopPropagation();
            onMenu(event);
          }
        : undefined;
      return h(
        'div',
        {
          className: cls('st-groupRow', dropActive && 'st-dropActive', dragging && 'st-dragging'),
          style: { paddingInlineStart: `${20 + (depth || 0) * 20}px` },
          ...(dragProps || null),
          ...(dropProps || null),
          onClick: onToggle,
          role: 'treeitem',
          tabIndex: 0,
          'aria-expanded': !collapsed,
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onToggle();
            }
          },
          onContextMenu: openMenuFor,
        },
        h('span', { className: 'st-arrowSlot' }, h('span', { className: 'st-chevronAlways' }, h(Chevron, { open: !collapsed }))),
        h('span', { className: 'st-tagSlot' }, h(TagIcon)),
        h('span', { className: 'st-groupName' }, group.name),
        h('span', { className: 'st-count' }, String(count)),
        onMenu
          ? h(
              'span',
              { className: 'st-actions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'st-rowAction',
                  'aria-label': t('action.rowMenu'),
                  title: t('action.rowMenu'),
                  onClick: openMenuFor,
                },
                h(DotsIcon),
              ),
            )
          : null,
      );
    }

    // #endregion

    // #region browser

    function TopicsBrowser(props) {
      const { wide, expandSidebar, useSessions, useSessionStatus, useWorkspaces, usePanelInfo, actions, t } = props;
      const data = useSyncExternalStore(dataStore.subscribe, dataStore.get);
      const snapshot = useWorkspaces((value) => value);
      const list = useSessions((value) => value);
      const statuses = useSessionStatus((value) => value);
      const panelActive = usePanelInfo((info) => info.activePanelId !== null);
      const [query, setQuery] = useState('');
      const [searchOpen, setSearchOpen] = useState(false);
      const [now, setNow] = useState(() => Date.now());
      const searchRef = useRef(null);

      useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 30000);
        return () => window.clearInterval(timer);
      }, []);

      useEffect(() => {
        if (searchOpen && searchRef.current) searchRef.current.focus();
      }, [searchOpen]);

      const currentId = panelActive ? undefined : findCurrentId(list);
      const archived = useMemo(() => new Set(snapshot.archivedSessionIds || []), [snapshot.archivedSessionIds]);

      const sections = useMemo(() => {
        const result = [];
        const accounted = new Set();
        const visible = (row) => {
          if (!row) return false;
          if (row.origin === 'subagent') return false;
          if (row.blank && row.id !== currentId) return false;
          if (archived.has(row.id) && !data.showArchived) return false;
          return true;
        };
        for (const workspace of snapshot.items || []) {
          const ids = [];
          for (const id of workspace.sessionIds || []) {
            accounted.add(id);
            const row = list.byId[id];
            if (visible(row)) ids.push(id);
          }
          result.push({ workspace, ids });
        }
        const strays = [];
        for (const id of list.ids || []) {
          if (accounted.has(id)) continue;
          const row = list.byId[id];
          if (visible(row)) strays.push(id);
        }
        if (strays.length > 0) result.push({ workspace: undefined, ids: strays });
        return result;
      }, [snapshot.items, list, archived, data.showArchived, currentId]);

      useEffect(() => {
        if (currentId === undefined) return;
        const workspace = (snapshot.items || []).find((item) => (item.sessionIds || []).includes(currentId));
        if (!workspace) return;
        if (data.collapsedWorkspaces[workspace.workspaceId]) {
          dataStore.set((state) => ({
            ...state,
            collapsedWorkspaces: { ...state.collapsedWorkspaces, [workspace.workspaceId]: false },
          }));
        }
      }, [currentId, snapshot.items, data.collapsedWorkspaces]);

      const openWorkspaceMenu = (workspace, event) =>
        openMenu({ kind: 'workspace', workspaceId: workspace.workspaceId, title: workspace.title || workspace.path }, event);

      const openGroupMenu = (workspaceId, group, event) =>
        openMenu({ kind: 'group', workspaceId, groupId: group.id, title: group.name }, event);

      const openSessionMenu = (workspaceId, row, event, stray) =>
        openMenu(
          {
            kind: 'session',
            workspaceId,
            canGroup: true,
            stray: stray === true,
            cwd: row.cwd,
            sessionId: row.id,
            title: rowTitle(row, t),
            archived: archived.has(row.id),
          },
          event,
        );

      const toggleWorkspace = (workspaceId) =>
        dataStore.set((state) => ({
          ...state,
          collapsedWorkspaces: { ...state.collapsedWorkspaces, [workspaceId]: !state.collapsedWorkspaces[workspaceId] },
        }));

      const toggleGroup = (id) =>
        dataStore.set((state) => ({
          ...state,
          collapsedGroups: { ...state.collapsedGroups, [id]: !state.collapsedGroups[id] },
        }));

      const [dragItem, setDragItem] = useState(null);
      const [dropKey, setDropKey] = useState(null);

      const endDrag = () => {
        setDragItem(null);
        setDropKey(null);
      };

      const dragSource = (payload, dragging) => ({
        draggable: true,
        onDragStart: (event) => {
          setDragItem(payload);
          try {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', payload.id);
          } catch {
            // Some browsers refuse custom drag data; the in-memory item suffices.
          }
        },
        onDragEnd: endDrag,
        'data-dragging': dragging ? 'true' : undefined,
      });

      const dropZone = (key, accept) => ({
        onDragOver: (event) => {
          if (!dragItem) return;
          event.preventDefault();
          try {
            event.dataTransfer.dropEffect = 'move';
          } catch {
            // Ignore a read-only drag store.
          }
          if (dropKey !== key) setDropKey(key);
        },
        onDragLeave: (event) => {
          if (event.currentTarget.contains(event.relatedTarget)) return;
          if (dropKey === key) setDropKey(null);
        },
        onDrop: (event) => {
          event.preventDefault();
          event.stopPropagation();
          const item = dragItem;
          endDrag();
          if (item) accept(item);
        },
      });

      const assignTo = (sessionId, groupId) =>
        dataStore.set((state) => {
          const assignment = { ...state.assignment };
          if (groupId) assignment[sessionId] = groupId;
          else delete assignment[sessionId];
          return { ...state, assignment };
        });

      if (!wide) {
        return h(
          'div',
          { className: 'st-root' },
          h(
            'button',
            {
              type: 'button',
              className: 'st-iconBtn',
              'aria-label': t('action.newSession'),
              title: t('action.newSession'),
              onClick: () => {
                expandSidebar();
                const first = sections.find((section) => section.workspace);
                actions.startSession(first ? first.workspace.workspaceId : undefined);
              },
            },
            h(PlusIcon),
          ),
        );
      }

      const normalized = query.trim().toLowerCase();
      let body;

      if (normalized.length > 0) {
        const results = [];
        for (const section of sections) {
          const workspace = section.workspace;
          const groups = workspace ? data.groupsByWorkspace[workspace.workspaceId] || [] : [];
          const groupName = (id) => {
            const found = groups.find((group) => group.id === id);
            return found ? found.name : '';
          };
          for (const id of section.ids) {
            const row = list.byId[id];
            const title = rowTitle(row, t);
            const workspaceTitle = workspace ? workspace.title || workspace.path : '';
            const tag = groupName(data.assignment[id]);
            if (
              title.toLowerCase().includes(normalized) ||
              workspaceTitle.toLowerCase().includes(normalized) ||
              tag.toLowerCase().includes(normalized)
            ) {
              results.push({ row, workspaceTitle, tag });
            }
          }
        }
        body =
          results.length === 0
            ? h('div', { className: 'st-skeleton' }, t('search.none'))
            : results.map((item) =>
                h(
                  'div',
                  {
                    key: item.row.id,
                    className: cls('st-row', item.row.id === currentId && 'st-rowSelected'),
                    style: { paddingInlineStart: '8px' },
                    role: 'treeitem',
                    tabIndex: 0,
                    title: rowTitle(item.row, t),
                    onClick: () => {
                      if (archived.has(item.row.id)) return;
                      setQuery('');
                      setSearchOpen(false);
                      actions.openSession(item.row.id);
                    },
                  },
                  h(StatusDot, { status: statuses.get(item.row.id), t }),
                  h('span', { className: 'st-title' }, rowTitle(item.row, t)),
                  h('span', { className: 'st-meta' }, item.tag ? `${item.tag} · ${item.workspaceTitle}` : item.workspaceTitle),
                  h('span', { className: 'st-time' }, formatTime(item.row.updatedAt, now, t)),
                ),
              );
      } else if (sections.length === 0) {
        body =
          list.phase === 'pending'
            ? h('div', { className: 'st-skeleton' }, t('loading'))
            : h(
                'div',
                { className: 'st-empty' },
                h('span', null, t('empty.title')),
                h(
                  'button',
                  { type: 'button', className: 'st-emptyAction', onClick: () => actions.addWorkspace() },
                  t('empty.addWorkspace'),
                ),
              );
      } else {
        body = [];
        for (const section of sections) {
          const workspace = section.workspace;
          const groupKey = workspace ? workspace.workspaceId : '__strays__';
          const groups = data.groupsByWorkspace[groupKey] || [];
          const buckets = new Map(groups.map((group) => [group.id, []]));
          const loose = [];
          for (const id of section.ids) {
            const assigned = data.assignment[id];
            if (assigned && buckets.has(assigned)) buckets.get(assigned).push(id);
            else loose.push(id);
          }

          // Sessions the registry does not account to any Workspace share one
          // section of their own ("No workspace") that still supports topic
          // groups, so they stay organizable without inventing a Workspace.
          const workspaceTitle = workspace ? workspace.title || workspace.path : t('strays.label');
          const collapsed = data.collapsedWorkspaces[groupKey] === true;
          const containsCurrent = currentId !== undefined && section.ids.includes(currentId);
          body.push(
            h(
              'div',
              {
                key: `ws:${groupKey}`,
                className: cls('st-wsRow', containsCurrent && 'st-wsRowActive', dropKey === `ws:${groupKey}` && 'st-dropActive'),
                onClick: () => toggleWorkspace(groupKey),
                ...dropZone(`ws:${groupKey}`, (item) => {
                  if (item.workspaceKey !== groupKey) return;
                  if (item.kind === 'session') assignTo(item.id, null);
                  else dataStore.set((state) => reparentGroup(state, groupKey, item.id, ''));
                }),
                role: 'treeitem',
                tabIndex: 0,
                'aria-expanded': !collapsed,
                'aria-label': workspaceTitle,
                title: workspace ? workspace.path : t('strays.hint'),
                onKeyDown: (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleWorkspace(groupKey);
                  }
                },
                onContextMenu: workspace
                  ? (event) => {
                      event.preventDefault();
                      openWorkspaceMenu(workspace, event);
                    }
                  : undefined,
              },
              h(
                'span',
                { className: 'st-arrowSlot' },
                h('span', { className: 'st-folder' }, h(FolderIcon)),
                h('span', { className: 'st-chevron' }, h(Chevron, { open: !collapsed })),
              ),
              h('span', { className: 'st-wsTitle' }, workspaceTitle),
              h('span', { className: 'st-count' }, String(section.ids.length)),
              workspace
                ? h(
                    'span',
                    { className: 'st-actions' },
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'st-rowAction',
                        'aria-label': t('action.newSession'),
                        title: t('action.newSession'),
                        onClick: (event) => {
                          event.stopPropagation();
                          actions.startSession(workspace.workspaceId);
                        },
                      },
                      h(PlusIcon),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'st-rowAction',
                        'aria-label': t('action.rowMenu'),
                        title: t('action.rowMenu'),
                        onClick: (event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          openWorkspaceMenu(workspace, event);
                        },
                      },
                      h(DotsIcon),
                    ),
                  )
                : null,
            ),
          );

          if (collapsed) continue;

          const tree = groupTree(groups);
          const renderGroup = (group, depth) => {
            const ids = buckets.get(group.id) || [];
            const groupCollapsed = data.collapsedGroups[group.id] === true;
            body.push(
              h(GroupHeader, {
                key: `g:${group.id}`,
                group,
                count: ids.length,
                collapsed: groupCollapsed,
                depth,
                t,
                onToggle: () => toggleGroup(group.id),
                onMenu: (event) => openGroupMenu(groupKey, group, event),
                dragProps: dragSource(
                  { kind: 'group', id: group.id, workspaceKey: groupKey },
                  dragItem && dragItem.kind === 'group' && dragItem.id === group.id,
                ),
                dragging: dragItem && dragItem.kind === 'group' && dragItem.id === group.id,
                dropProps: dropZone(`g:${group.id}`, (item) => {
                  if (item.workspaceKey !== groupKey) return;
                  if (item.kind === 'session') assignTo(item.id, group.id);
                  else if (item.kind === 'group') {
                    dataStore.set((state) => reparentGroup(state, groupKey, item.id, group.id));
                  }
                }),
                dropActive: dropKey === `g:${group.id}`,
              }),
            );
            if (groupCollapsed) return;
            for (const child of tree.children.get(group.id) || []) renderGroup(child, depth + 1);
            for (const id of ids) {
              const row = list.byId[id];
              body.push(
                h(SessionRow, {
                  key: `s:${id}`,
                  row,
                  status: statuses.get(id),
                  selected: id === currentId,
                  archived: archived.has(id),
                  indent: 32 + depth * 20,
                  now,
                  t,
                  onOpen: (sessionId) => actions.openSession(sessionId),
                  onMenu: (event) => openSessionMenu(groupKey, row, event, !workspace),
                  dragProps: dragSource(
                    { kind: 'session', id: row.id, workspaceKey: groupKey },
                    dragItem && dragItem.kind === 'session' && dragItem.id === row.id,
                  ),
                  dragging: dragItem && dragItem.kind === 'session' && dragItem.id === row.id,
                }),
              );
            }
          };
          for (const group of tree.children.get('') || []) renderGroup(group, 0);

          const looseKey = `loose:${groupKey}`;
          const looseCollapsed = data.collapsedGroups[looseKey] === true;
          if (loose.length > 0 && groups.length > 0) {
            body.push(
              h(GroupHeader, {
                key: looseKey,
                group: { id: looseKey, name: t('group.ungrouped') },
                count: loose.length,
                collapsed: looseCollapsed,
                t,
                onToggle: () => toggleGroup(looseKey),
                dropProps: dropZone(`loose:${groupKey}`, (item) => {
                  if (item.workspaceKey !== groupKey) return;
                  if (item.kind === 'session') assignTo(item.id, null);
                  else dataStore.set((state) => reparentGroup(state, groupKey, item.id, ''));
                }),
                dropActive: dropKey === `loose:${groupKey}`,
              }),
            );
          }
          if (loose.length > 0 && groups.length > 0 && looseCollapsed) continue;
          for (const id of loose) {
            const row = list.byId[id];
            body.push(
              h(SessionRow, {
                key: `s:${id}`,
                row,
                status: statuses.get(id),
                selected: id === currentId,
                archived: archived.has(id),
                indent: groups.length > 0 ? 32 : 16,
                now,
                t,
                onOpen: (sessionId) => actions.openSession(sessionId),
                onMenu: (event) => openSessionMenu(groupKey, row, event, !workspace),
                dragProps: dragSource(
                  { kind: 'session', id: row.id, workspaceKey: groupKey },
                  dragItem && dragItem.kind === 'session' && dragItem.id === row.id,
                ),
                dragging: dragItem && dragItem.kind === 'session' && dragItem.id === row.id,
              }),
            );
          }
        }
      }

      const target = sections.find((section) => section.workspace);

      return h(
        'div',
        { className: 'st-root' },
        h(
          'div',
          { className: 'st-header' },
          searchOpen
            ? h(
                'div',
                { className: 'st-search' },
                h('span', { className: 'st-iconBtn', style: { width: '24px', height: '24px', cursor: 'default' } }, h(SearchIcon)),
                h('input', {
                  ref: searchRef,
                  className: 'st-searchInput',
                  value: query,
                  placeholder: t('search.placeholder'),
                  onChange: (event) => setQuery(event.target.value),
                  onKeyDown: (event) => {
                    if (event.key === 'Escape') {
                      event.preventDefault();
                      setQuery('');
                      setSearchOpen(false);
                    }
                  },
                }),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'st-iconBtn',
                    style: { width: '24px', height: '24px' },
                    'aria-label': t('search.clear'),
                    title: t('search.clear'),
                    onClick: () => {
                      setQuery('');
                      setSearchOpen(false);
                    },
                  },
                  h(CloseIcon),
                ),
              )
            : h('span', { className: 'st-headerLabel' }, t('section.label')),
          searchOpen
            ? null
            : h(
                'button',
                {
                  type: 'button',
                  className: 'st-iconBtn',
                  'aria-label': t('action.search'),
                  title: t('action.search'),
                  onClick: () => setSearchOpen(true),
                },
                h(SearchIcon),
              ),
          searchOpen
            ? null
            : h(
                'button',
                {
                  type: 'button',
                  className: 'st-iconBtn',
                  'aria-label': t('action.newSession'),
                  title: t('action.newSession'),
                  onClick: () => actions.startSession(target ? target.workspace.workspaceId : undefined),
                },
                h(PlusIcon),
              ),
          h(
            'button',
            {
              type: 'button',
              className: 'st-iconBtn',
              'aria-label': t('action.viewOptions'),
              title: t('action.viewOptions'),
              onClick: (event) =>
                openMenu(
                  {
                    kind: 'view',
                    title: t('action.viewOptions'),
                    workspaceIds: (snapshot.items || []).map((workspace) => workspace.workspaceId),
                  },
                  event,
                ),
            },
            h(DotsIcon),
          ),
        ),
        h('div', { className: 'st-list', role: 'tree', 'aria-label': t('section.label') }, body),
      );
    }

    // #endregion

    // #region actions

    function createActions({ sessions, workspaces, uiWorkspace, t }) {
      return {
        openSession(sessionId) {
          uiWorkspace.openSession(sessionId);
        },
        startSession(workspaceId) {
          uiWorkspace.startSession(workspaceId);
        },
        archiveSession(sessionId) {
          uiWorkspace.archiveSession(sessionId).catch((reason) => {
            const code = reason && reason.rpcError ? reason.rpcError.code : undefined;
            if (code !== 'workspace/session-active') {
              console.warn('session archive rejected:', reason);
              return;
            }
            openDialog({
              kind: 'confirm',
              title: t('archive.stop.title'),
              description: t('archive.stop.desc'),
              submitLabel: t('archive.stop.confirm'),
              danger: true,
              onSubmit: () => uiWorkspace.archiveSession(sessionId, { stopActivity: true }),
            });
          });
        },
        unarchiveSession(sessionId) {
          return uiWorkspace.unarchiveSession(sessionId);
        },
        forkSession(sessionId) {
          return uiWorkspace.forkSession(sessionId);
        },
        async renameSession(sessionId, title) {
          const result = await sessions.using(sessionId, { source: 'workspaceOperation' }, (reference) =>
            reference.binding.session.rename(title),
          );
          if (result && result.ok === false) throw new Error(result.error.message);
        },
        async renameWorkspace(workspaceId, title) {
          await workspaces.rename(workspaceId, title);
        },
        async deleteWorkspace(workspaceId) {
          await workspaces.delete(workspaceId);
        },
        async addWorkspace() {
          const path = await uiWorkspace.pickDirectory();
          if (!path) return null;
          return workspaces.create({ path });
        },
        async registerWorkspace(path) {
          if (!path) return null;
          return workspaces.create({ path });
        },
        async copySessionId(sessionId) {
          try {
            await navigator.clipboard.writeText(sessionId);
          } catch (reason) {
            console.warn('copy session id rejected:', reason);
          }
        },
      };
    }

    // #endregion

    function apply(ctx) {
      ctx.effect(() => {
        const tag = document.createElement('style');
        tag.dataset.pluginCss = 'dsh-session-topics-tree';
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return () => tag.remove();
      }, 'dsh-session-topics-tree: styles');

      ctx.effect(() => ctx.locale.register(NS, { en, zh }), 'dsh-session-topics-tree: dictionaries');

      const sessions = ctx.get('sessions');
      const workspaces = ctx.get('workspaces');
      const uiWorkspace = ctx.get('uiWorkspace');
      const t = ctx.locale.bind(NS);
      const actions = createActions({ sessions, workspaces, uiWorkspace, t });
      const injected = () => ({ actions });

      const registerBrowser = (options) =>
        ctx.slots.register(
          {
            name: 'sidebar.workspaces',
            locale: NS,
            inject: injected,
            ...options,
          },
          TopicsBrowser,
        );

      ctx.slots.inject('sidebar.workspaces', () => {
        try {
          // In a single slot the lower priority wins, so a contributor has to
          // register below the shipped entry (0) to replace the browsing region.
          return registerBrowser({ priority: -10 });
        } catch (reason) {
          console.warn('dsh-session-topics-tree: priority option rejected, registering without it', reason);
          return registerBrowser({});
        }
      });

      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register(
          {
            name: 'shell.overlay',
            id: 'session-topics-tree.overlay',
            order: 500,
            locale: NS,
            inject: injected,
          },
          TopicsOverlay,
        ),
      );
    }

    return { inject: ['slots', 'locale', 'sessions', 'workspaces', 'uiWorkspace'], apply };
  },
});
