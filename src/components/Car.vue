<template>
  <div>
    <!-- 购买/试驾跳转 -->
    <div style="position: absolute;right: 10px;top:10px;">
        <a class="gou" style="" href="https://www.bydauto.com.cn/news-id-2775.html">
          <img src="@/assets/购买.png" alt="" width="24" style="vertical-align: middle;">
          <span>购买</span>
        </a>

        <a class="gou" style="margin-top:10px;" href="https://www.bydauto.com.cn/news-id-2775.html">
          <img src="@/assets/试驾.png" alt="" width="24" style="vertical-align: middle;">
          <span>试驾</span>
        </a>

      </div>
                 <!-- 变色开关  -->
        <div id="changeColor">
        <img src="@/assets/变色.png" alt="" width="24" style="vertical-align: middle;">
        <span id="changeColorText">停止变色</span>
      </div>
           <!-- 颜色器  -->
      <div id="color" style="">
        <div class="colorChoose" id="color1"><img src="@/assets/绿.jpg"></div>
        <div class="colorChoose" id="color2"><img src="@/assets/灰.jpg"></div>
        <div class="colorChoose" id="color3"><img src="@/assets/红.jpg"></div>
        <div class="colorChoose" id="color4"><img src="@/assets/黑.jpg"></div>
        <div class="colorChoose" id="color5"><img src="@/assets/白.jpg"></div>
      </div>
      <!-- 左侧按钮 -->
      <div id="rotateAudio">
              <!-- 旋转  -->
            <div id="rotate">
              <img id="rotateimg" src="@/assets/旋转.png" alt="" width="24" style="vertical-align: middle;">
            </div>
            <!-- 背景音乐  -->
            <div id="audio" style="margin-top: 20px;">
              <img id="audioimg" src="@/assets/关闭声音.png" alt="" width="24" style="vertical-align: middle;">
            </div>
                  <!-- 开车灯  -->
          <div style="margin-top: 20px;">
            <img id="light" src="@/assets/开车灯.png" alt="" width="24" style="vertical-align: middle;">
          </div>
      </div>

  </div>
</template>

<script>
// 渲染
import {
  renderer, 
  loop,
  stopLoop
} from '../threejs/RenderLoop'
//车模型
import { model } from '../threejs/scene/model'
// 颜色动画
import { colorTween } from '../threejs/scene/colorTween'
// 背景音乐
import { backgroundAudio } from '../threejs/scene/backgroundAudio.js'
// 车灯
import { openCarLight, closeCarLight } from '../threejs/scene/carLight.js'
        
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Car',
  props: {
    msg: String
  },
  data() {
    return {
      colorAuto: false, // 变色动画开关
      rotate: false, // 旋转开关
      audio: false, //背景音乐 
      light:false // 灯
    }
  },
  mounted: function () {
    // Three.js渲染结果Canvas画布插入到body元素中
    document.body.appendChild(renderer.domElement);
    // 颜色dom监听
    this.colorEvent()
    // 颜色自动改变监听
    this.colorAutoEvent()
    // 自动旋转监听
    if (!this.rotate) document.getElementById('rotateimg').src = './assets/停止旋转.png';
    this.rotateEvent()
    // 背景音乐监听
    this.audioEvent()
    // 车灯监听
    this.lightEvent()
  },
  methods: {
    colorAutoEvent: function () {
      if(!this.colorAuto)document.getElementById('changeColorText').innerHTML = '开始变色';

      // 颜色变化动画开关
      document.getElementById('changeColor').onclick = function () {

      if (this.colorAuto) {
        colorTween.stop();//停止动画
        this.colorAuto = false;
        document.getElementById('changeColorText').innerHTML = '开始变色';
        this.setColor(0x023911);//动画停止，颜色回到最初的状态
      }else {
        colorTween.start();//开始动画
        this.colorAuto = true;
        document.getElementById('changeColorText').innerHTML = '停止变色';
      }
    }
    },
    setColor: function (color) {
      model.traverse(function (object) {
        if (object.type === 'Mesh') {
          if (object.name.slice(0, 2) == "外壳") { //外壳颜色设置
            object.material.color.set(color);
          }
        }
      })
    },
    colorEvent: function () {
      const _this = this
      var colorArr = [0x023911, 0x222222, 0x6a030a, 0x000000, 0xffffff];
      colorArr.forEach(function (value, i) {
        var dom = document.getElementById('color' + (i+1));
        // 单击按钮切换颜色
        dom.onclick = function () {
          _this.setColor(value)
        }
      })
    },
    rotateEvent: function () {
      document.getElementById('rotate').onclick = function () {
        if (this.rotate) {
          // cancelAnimationFrame(rotateAnimation);
          stopLoop();
          this.rotate = false;
          document.getElementById('rotateimg').src = './assets/停止旋转.png';
        } else {
          loop();
          this.rotate = true;
          document.getElementById('rotateimg').src = './assets/旋转.png';
        }
      }
    },
    audioEvent: function () {
    document.getElementById('audio').onclick = function () {
      if (this.audio) {
        backgroundAudio.pause();
        this.audio = false;
        document.getElementById('audioimg').src = './assets/关闭声音.png';
      } else {
        backgroundAudio.play();
        this.audio = true;
        document.getElementById('audioimg').src = './assets/打开声音.png';
      }
    }
    },
    lightEvent: function () {
     document.getElementById('light').onclick = function () {
      if (this.light) {
        closeCarLight(); 
        this.light = false;
        document.getElementById('light').src = './assets/开车灯.png';
      } else {
        openCarLight();
        this.light = true;
        document.getElementById('light').src = './assets/关车灯.png';
      }
    }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
      margin: 0;
      overflow: hidden;
      background: #f0f0f0;
    }
    .colorChoose {
      display: inline-block;
      margin-left: 20px;
      cursor: pointer;
    }

    .colorChoose img {
      width: 50px;
      border-radius: 25px;
    }

    #color {
      width: 410px;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      padding: 10px 16px;
      border-radius: 6px;
      left: 50%;
      margin-left: -190px;
      top: 100%;
      margin-top: -80px;
    }

    .gou {
      color: #ffffff;
      text-decoration: none;
      font-size: 16px;
      display: block;
      padding: 8px 16px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 30px;
      height: 42px;
      line-height: 28px;
    }

    #changeColor {
      color: #ffffff;
      font-size: 16px;
      padding: 8px 16px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 30px;
      height: 42px;
      line-height: 28px;

      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -22px;
    }

    #rotateAudio {
      position: absolute;
      left: 10px;
      top: 50%;
      margin-top: -55px;
    }

    #rotateAudio div {
      padding: 10px 10px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 22px;
      cursor: pointer;
    }
</style>
