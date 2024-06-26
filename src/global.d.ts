export {}

declare global {
  interface Window {
    $message: import('naive-ui').MessageApi
    $dialog: import('naive-ui').DialogApi
    $notification: import('naive-ui').NotificationApi
    $loadingBar: import('naive-ui').LoadingBarApi
  }
  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare module 'element-resize-detector'
}
