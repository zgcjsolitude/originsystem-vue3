<template>
  <div class="PCerror1">
    <h1>404访问错误</h1>
    <section class="PCerror1-container">
      <span>4</span>
      <span>
        <span class="PCerror1-0">0</span>
      </span>
      <span>4</span>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.PCerror1 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #416475;
  font-family: "Montserrat", Helvetica, sans-serif;
  color: #92a4ad;

  h1 {
    text-align: center;
    margin: 30px 15px;
    color: #92a4ad;
  }
}
.PCerror1-container {
  text-align: center;
  font-size: 180px;
  font-family: "Catamaran", sans-serif;
  font-weight: 800;
  margin: 20px 15px;

  & > span {
    display: inline-block;
    line-height: 0.7;
    position: relative;
    color: #ffb485;
    vertical-align: middle;
  }
  & > span:nth-of-type(1) {
    color: #d1f2a5;
    animation: PCerror1frames2 4s infinite;
  }
  & > span:nth-of-type(3) {
    color: #f56991;
    animation: PCerror1frames3 4s infinite;
  }
  & > span:nth-of-type(2) {
    width: 120px;
    height: 120px;
    border-radius: 999px;
  }
  & > span:nth-of-type(2):before,
  & > span:nth-of-type(2):after {
    border-radius: 0%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 999px;
    box-shadow: inset 25px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 25px 0 rgba(239, 250, 180, 0.4),
      inset -25px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -25px 0 rgba(245, 105, 145, 0.4);
    animation: PCerror1frames1 4s infinite;
  }
  & > span:nth-of-type(2):before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
.PCerror1-0 {
  position: absolute;
  top: -9999em;
  left: -9999em;
}

@media (max-width: 770px) {
  .PCerror1-container {
    font-size: 120px;

    & > span:nth-of-type(2) {
      width: 90px;
      height: 90px;
      border-radius: 999px;
    }
  }
}
@keyframes PCerror1frames1 {
  0% {
    box-shadow: inset 25px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 25px 0 rgba(239, 250, 180, 0.4),
      inset -25px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -25px 0 rgba(245, 105, 145, 0.4);
  }
  25% {
    box-shadow: inset 25px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 25px 0 rgba(209, 242, 165, 0.4),
      inset -25px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 -25px 0 rgba(255, 196, 140, 0.4);
  }
  50% {
    box-shadow: inset 25px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 25px 0 rgba(245, 105, 145, 0.4),
      inset -25px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 -25px 0 rgba(239, 250, 180, 0.4);
  }
  75% {
    box-shadow: inset 25px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 25px 0 rgba(255, 196, 140, 0.4),
      inset -25px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 -25px 0 rgba(209, 242, 165, 0.4);
  }
  100% {
    box-shadow: inset 25px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 25px 0 rgba(239, 250, 180, 0.4),
      inset -25px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -25px 0 rgba(245, 105, 145, 0.4);
  }
}
@keyframes PCerror1frames2 {
  0% {
    color: #d1f2a5;
  }
  25% {
    color: #f56991;
  }
  50% {
    color: #ffc48c;
  }
  75% {
    color: #effab4;
  }
  100% {
    color: #d1f2a5;
  }
}
@keyframes PCerror1frames3 {
  0% {
    color: #ffc48c;
  }
  25% {
    color: #effab4;
  }
  50% {
    color: #d1f2a5;
  }
  75% {
    color: #f56991;
  }
  100% {
    color: #ffc48c;
  }
}
</style>