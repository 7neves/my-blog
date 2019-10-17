<!-- 图片展示组件 -->
<template>
  <div class="img-wrapper">
    <img :src="imgInfo.src"
         :alt="imgInfo.description"
         class="zoom-img">
    <p>{{ imgInfo.description }}</p>
  </div>
</template>

<script>
export default {
  name: "ImgShow",
  props: {
    imgInfo: {
      required: true,
      type: Object
    }
  }
};
</script>

<style lang="css">
.img-wrapper {
  text-align: center;
}
.img-wrapper img {
  width: 350px;
}
.img-wrapper p {
  margin: 0;
  padding: 10px 0;
  font-size: 14px;
  color: #969696;
}
</style>