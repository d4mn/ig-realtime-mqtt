export enum DirectThreadEventEnum {
  /**
   * Indicates when someone writes to this thread
   */
  activityIndicator = 'direct-thread-activity-indicator',
  /**
   * Fires when new message received
   */
  message = 'direct-thread-message',
  /**
   * Fires when thread updated (not the messages, the thread itself, e.g change name of the group)
   */
  update = 'direct-thread-update',
  /**
   * Fires when someone has seen messages in the thread
   */
  hasSeen = 'direct-thread-has-seen',
  /**
   * Theme changed
   */
  theme = 'direct-thread-theme',
  /**
   * Someone reacted on message
   */
  reaction = 'direct-thread-reaction',
  adminUserIds = 'direct-thread-admin-user-ids',
  approvalRequired = 'direct-thread-approval-required',
  shhMode = 'direct-thread-shh-mode',
}
