// 场景总文件
// 引入Three.js
import * as THREE from "three/build/three.module.js";
import { model } from "./model.js";
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
scene.add(model); //产品三维模型添加到场景中
/**
 * 光源设置
 */
// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
var axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

/**
 * 地面
 */
var geometry = new THREE.PlaneGeometry(6000, 6000); //矩形平面
// 加载树纹理贴图
var texture = new THREE.TextureLoader().load("./model/瓷砖.jpg");
texture.encoding = THREE.sRGBEncoding; //设置纹理贴图编码方式和WebGL渲染器一致 要不然色差
// 设置阵列（贴图类型）
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(12, 12); //注意选择合适的阵列数量
// 设置贴图
var material = new THREE.MeshLambertMaterial({
  color: 0x222222,
  map: texture,
});
// 创建地面网格模型；
var ground = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// 地面旋转
ground.rotateX(-Math.PI / 2);
scene.add(ground);

/**
 * 隧道
 */
var sphereGroup = new THREE.Group();
var R = 550; // 半径
// 创建一个圆柱表示隧道
var geometry = new THREE.CylinderGeometry(
  R * 1.01,
  R * 1.01,
  R * 9,
  32,
  1,
  true
);
// 贴图数据
var material = new THREE.MeshPhongMaterial({
  color: 0x222222,
  side: THREE.BackSide, //背面可见，相机和车都在隧道里面
});
// 设置贴图
var spheremesh = new THREE.Mesh(geometry, material);
sphereGroup.add(spheremesh);
sphereGroup.rotateZ(Math.PI / 2);
scene.add(sphereGroup);
// 隧道内贴图:隧道圆柱面上设置一些装饰圆点
// 创建圆柱
var sphereGeo = new THREE.CylinderGeometry(
  R, //圆柱的顶部半径
  R, //圆柱的底部半径
  R * 8, // 圆柱的高度
  32, //圆柱侧面周围的分段数
  50, //圆柱侧面沿着其高度的分段数
  true //底面是开放的还是封顶的
);
var pos = sphereGeo.attributes.position;
// 创建圆：pos.count（1683） = 圆柱侧面周围的分段数（32） * 圆柱侧面沿着其高度的分段数（50）
var cirGeo = new THREE.CircleGeometry(8, 15, 15);
for (let i = 0; i < pos.count; i++) {
  // 原点材质：材质对象Material
  var cirMaterial = new THREE.MeshLambertMaterial({
    color: 0xaaaa66,
    side: THREE.BackSide,
  });
  cirMaterial.color.r = Math.random() * 0.7 + 0.3;
  cirMaterial.color.g = cirMaterial.color.r;
  cirMaterial.color.b = cirMaterial.color.r;
  // 获取位置
  var x = pos.getX(i);
  var y = pos.getY(i);
  var z = pos.getZ(i);
  // 三维向量
  let V1 = new THREE.Vector3(0, 0, 1); //垂直屏幕的方向  z轴方向
  let V2 = new THREE.Vector3(x, 0, z).normalize(); //圆柱y设置为0

  /**
   * 贴图姿态设置：
   */
  // 四元数（axis,angle）：从由 axis（轴） 和 angle（角度）所给定的旋转来设置该四元数。
  let q = new THREE.Quaternion();
  q.setFromUnitVectors(V1, V2);
  // 四维矩阵
  let M = new THREE.Matrix4();
  // 将这个矩阵的旋转分量设置为 “四元数q”指定的旋转
  M.makeRotationFromQuaternion(q);
  // 设置贴图材质：网格模型对象Mesh
  var planeMesh = new THREE.Mesh(cirGeo, cirMaterial);
  // 定义物体的外观：由Material基类或者一个包含材质的数组派生而来的材质实例
  planeMesh.applyMatrix4(M);
  planeMesh.position.set(x, y, z);
  // 添加到场景
  sphereGroup.add(planeMesh);
}
sphereGroup.position.y = -10;

// 雾化效果
scene.fog = new THREE.Fog(0xcccccc, 1200, 3500);
export { scene };
