function decorateArmour(target, key, descriptor) {
  const method = descriptor.value;
  let moreDef = 100;
  let ret;
  descriptor.value = (...args)=>{
    args[0] += moreDef; // 改变参数
    ret = method.apply(target, args);
    return ret;
  }
  return descriptor;
}

function decorateLight(target, key, descriptor) {
  const method = descriptor.value;
  let moreAtk = 50;
  let ret;
  descriptor.value = (...args) => {
    args[1] += moreAtk;
    ret = method.apply(target, args); //执行函数，做完拦截操作自然返回
    return ret
  }
  return descriptor
}

function decorateHP (target, key, descriptor) {
  const method = descriptor.value;
  let moreHP = 100;
  let ret;
  descriptor.value = (...args) => {
    args[2] += moreHP;
    ret = method.apply(target, args);
    return ret
  }
  return descriptor
}

function addFly(canFly) {
  return function(target) {
    target.canFly = canFly;
    let iconSwing = canFly ? '(无敌钢铁翅膀，起飞)' : '(英雄暂时还不能飞)';
    let method = target.prototype.toString;
    target.prototype.toString = (...args) => {
      return method.apply(target.prototype, args) + iconSwing   //字符串拼接就好
    }
    return target
  }
}

@addFly(true)
class Man{
  constructor(def = 20,atk = 30,hp = 30){
    this.init(def,atk,hp);
  }
  @decorateLight
  @decorateArmour
  @decorateHP
  init(def,atk,hp){
    this.def = def; // 防御值
    this.atk = atk;  // 攻击力
    this.hp = hp;  // 血量
  }
  toString(){
    return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
  }
}

var tony = new Man();

console.log(`当前状态 ===> ${tony}`);
// 输出：当前状态 ===> 防御力:102,攻击力:3,血量:3