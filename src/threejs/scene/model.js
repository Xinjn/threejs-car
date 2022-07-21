// 引入Three.js
import * as THREE from "three/build/three.module.js";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// 设置贴图
import { SetCarMaterial } from "./SetCarMaterial.js";
// 标注热点
import { CreateCarTags } from "./PointsTag.js";
// 开门动画
import { open } from "./open.js";
// 加载轿车前灯发光模拟
import { lensflare1, lensflare2 } from "./carLight.js";

var model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
var loader = new GLTFLoader(); //创建一个GLTF加载器

loader.load("./model/轿车.glb", function (gltf) {
  //gltf加载成功后返回一个对象
  // console.log('控制台查看gltf对象结构', gltf);
  SetCarMaterial(gltf.scene); //代码设置车模型不同零部件的材质效果
  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);

  // 标注热点
  CreateCarTags(gltf.scene);

  open(gltf.scene); //车门打开

  // 开关车门旋转测试
  // 通过坐标系判断一下可以绕哪个轴旋转，至于旋转值是负数还是正数可以代码测试下
  // gltf.scene.getObjectByName('右前门').rotateY(Math.PI / 3);
  // gltf.scene.getObjectByName('右后门').rotateY(Math.PI / 3);
  // gltf.scene.getObjectByName('左前门').rotateY(-Math.PI / 3);
  // gltf.scene.getObjectByName('左后门').rotateY(-Math.PI / 3);
  // gltf.scene.getObjectByName('后备箱').rotateZ(Math.PI / 3);

  // 访问需要标注特点的位置
  // console.log(gltf.scene.getObjectByName('右前光标'));

  /**
   *  灯光载入模型
   */
  // glrt模型中用来给车灯定位的空物体,获取坐标，用来在openCarLight.js文件中生成发光效果
  var light1 = gltf.scene.getObjectByName("镜头光晕1");
  var light2 = gltf.scene.getObjectByName("镜头光晕2");
  light1.add(lensflare1);
  light2.add(lensflare2);
});
export { model };
