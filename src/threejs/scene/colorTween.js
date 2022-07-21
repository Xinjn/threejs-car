import * as THREE from "three/build/three.module.js";
// 模型
import { model } from "../scene/model.js";

// 颜色数组16进值
var colorArr16 = [0x023911, 0x222222, 0x6a030a, 0x000000, 0xffffff];
// 颜色数组10进值
var colorArr = [];
// 转为十进制
for (let i = 0; i < colorArr16.length; i++) {
  var color = new THREE.Color(colorArr16[i]);
  colorArr.push({
    r: color.r,
    g: color.g,
    b: color.b,
  });
}

// mesh颜色值(RBG):初始值
var color = {
  r: colorArr[0].r,
  g: colorArr[0].g,
  b: colorArr[0].b,
};
/**
 * 变色动画原理：
 * 变色动画拆分为两部分：每种颜色都对应两个tweenjs动画，阶段一：一个是颜色不变状态，阶段二：一个是颜色变为下一个状态。
 * 通过tweenjs的方法`.chain()`,把所有颜色对应的动画，串联起来，就可以变成一个整体动画。
 * 5种颜色，每种2个动画阶段，共10种动画阶段（补间动画）
 */
// 方法：设置模型颜色
function setColor(r, g, b) {
  model.traverse(function (object) {
    if (object.type === "Mesh") {
      if (object.name.slice(0, 2) == "外壳") {
        //外壳颜色设置
        object.material.color.setRGB(r, g, b);
      }
    }
  });
}

// 所有动画片段tween的集合
var tweenArr = [];

// 1. 批量创建动画片段tween
for (var i = 0; i < colorArr.length; i++) {
  // 阶段一：保持当前颜色
  var tween1 = new TWEEN.Tween(color)
    .to(
      {
        r: colorArr[i].r,
        g: colorArr[i].g,
        b: colorArr[i].b,
      },
      1000
    )
    .onUpdate(function () {
      setColor(color.r, color.g, color.b);
    });
  // 阶段二：进入下一颜色
  var tween2 = new TWEEN.Tween(color);
  if (i < colorArr.length - 1) {
    tween2
      .to(
        {
          r: colorArr[i + 1].r,
          g: colorArr[i + 1].g,
          b: colorArr[i + 1].b,
        },
        1000
      )
      .onUpdate(function () {
        setColor(color.r, color.g, color.b);
      });
  } else {
    tween2
      .to(
        {
          r: colorArr[0].r,
          g: colorArr[0].g,
          b: colorArr[0].b,
        },
        1000
      )
      .onUpdate(function () {
        setColor(color.r, color.g, color.b);
      });
  }
  tweenArr.push(tween1, tween2);
}
/*
console.log("最终补间动画集合", tweenArr);
{
    0, // 1.绿色
    1, // 1.变灰色
    2, // 2.灰色
    3, // 2.变红色
    4, // 3.红色
    5, // 3.变蓝色
    6, // 4.蓝色
    7, // 4.变白色
    8, // 5.白色
    9; // 5.变绿色
}
*/

/**
 * chain连接补间动画
 */
// 批量连接所有动画片段:上一个补间结束的时候立即启动另外一个补间
for (var i = 0; i < tweenArr.length - 1; i++) {
  tweenArr[i].chain(tweenArr[i + 1]);
}
// 重要：首尾相接循环执行！！
tweenArr[tweenArr.length - 1].chain(tweenArr[0]);

//   批量生成动画，然后拼接
var colorTween = tweenArr[0];

// 控制一个补间:start 和 stop
// 播放动画：初始化
colorTween.start();

export { colorTween };
