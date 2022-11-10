<template>
  <div>
    <!-- <IframeBox :iframe-src="iframePageSrc" /> -->
    <iframe width="100%" height="850" :src="iframePageSrc" />
  </div>
</template>

<script>
export default {
  name: 'IframeBox',
  components: {
  },
  data() {
    return {
      iframePageSrc: 'http://192.168.88.115:19213?token=eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiI1NjIxNzQ2NDM0OTM1NDgwMzIiLCJzdWIiOiJvcGVyYXRlT3JkZXIiLCJjZmciOiJQTEFURk9STV9PUEVSQVRJT04iLCJ1dHlwZSI6IjEiLCJhaWQiOiI2MDU2NjA1OTgyNzk1NDg5MjgiLCJqdGkiOiI2MzZjYjNiM2ZiMzU0NzBkODUzNjc0OWFjZmI3NWIzMiIsImNpZCI6IjU2MjE2Mzc4NjE5MzcxMTEwNCJ9.GK8HYHwBzLuoS2QHJTECwYEaOqD15Y4uYwBk2EdfksItwhaPFuIZEXnfp58KA-pJx636c_D4C3nJSAtNHe9tbw'
    }
  }
}
</script>

