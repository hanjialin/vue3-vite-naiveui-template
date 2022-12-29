<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
/**
 * @author HanJiaLin
 * @date 2022/12/28 14:12
 * @version 1.0
 * @description 挂载naive-ui的一系列提示组件，使其可以在setup以外任意使用。
 **/
import { useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui'
window.$message = useMessage()
window.$dialog = useDialog()
window.$notification = useNotification()
window.$loadingBar = useLoadingBar()
</script>
