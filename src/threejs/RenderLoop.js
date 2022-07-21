import { scene } from "./scene/index.js"; //Three.js三维场景
import { renderer, camera } from "./RendererCamera.js"; //渲染器对象和相机对象
// 渲染循环
function render() {
  //tween更新(渲染时间相关,便于动画计算)
  // eslint-disable-next-line no-undef
  TWEEN.update();

  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();

// 模型旋转动画
var rotateAnimation = null;
function loop() {
  rotateAnimation = requestAnimationFrame(loop);
  scene.rotateY(0.001);
}

function stopLoop() {
  cancelAnimationFrame(rotateAnimation);
}
export { renderer, loop, stopLoop };
