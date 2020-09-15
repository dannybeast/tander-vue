<template lang="pug">
  include ../utils/bem/index.pug

  +b.not-found
    +e.P.marker {{title}}
    img(:src="imageUrl", :alt="title")
    +e.H3.title {{description}}

</template>

<script>
const title = "Ошибка 404";

export default {
  name: "NotFound",
  data() {
    return {
      title: title,
      description: "Такой страницы не существует",
      imageUrl: "/images/404.png"
    };
  },
  metaInfo: {
    title: title
  }
};
</script>

<style lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 30px $offset_one_side;
  img {
    margin-bottom: 30px;
  }
  &__marker {
    margin-bottom: 30px;
    background: $color-black;
    color: #fff;
    padding: 5px 10px;
    font-weight: 600;
    border-radius: 8px;
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
