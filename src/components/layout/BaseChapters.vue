<template>
  <ul type="none">
    <li>
      <span class="left">
        <label class="chapterNum"> Chapter <slot name="num"></slot> </label>
      </span>
      <span class="title"><slot></slot></span>
      <span class="right">
        <slot name="page"></slot>
      </span>
    </li>
  </ul>
</template>

<style scoped>
li {
  font-size: 15px;
  border-bottom: 1px solid #838995;
  padding: 20px;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

/* .left {
  margin-left: 5vw;
  float: left;
} */

.chapterNum {
  color: #838995;
}

/* span {
  float: left;
  margin-left: 5vw;
}

.right {
  float: right;
  margin-right: 5vw;
} */

.title {
  white-space: nowrap; 
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
 
@media (max-width: 766px) {
  ul {
    margin-left: -50px;
  }

  li {
    flex-direction: column;
    row-gap: 15px;
    align-items: start;
    width: 80vw;
  }

  .title  {
    max-width: 100%;
  }
} 
</style>