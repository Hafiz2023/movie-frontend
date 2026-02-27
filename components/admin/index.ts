// ============================
// Admin Core Components
// ============================

// Common / Shared
export { AdminSearchInput, AdminFilterSelect, AdminPagination, AdminEmptyState, AdminSectionHeader } from './common';

// Sidebar
export { AdminSidebarPanel, SidebarContent, SidebarHeader, SidebarNavItem, SidebarFooter } from './sidebar';
export type { NavItemConfig } from './sidebar';

// Stats
export { AdminStats, StatCard, useAnimatedCount } from './stats';
export type { StatCardData } from './stats';

// Videos
export { VideoTable, VideoTableRow, VideoTableHeader, VideoTableToolbar, VideoFormDialog, DeleteConfirmDialog } from './videos';
export type { SortKey, SortOrder } from './videos';

// Community
export { CommunityManager, CommunityPostItem, CommunityDeleteModal } from './community';

// Messages
export { MessagesInbox, MessageRow, MessageCard, MessageExpandedView } from './messages';
export type { Message } from './messages';
